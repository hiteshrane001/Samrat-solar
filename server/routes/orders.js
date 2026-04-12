import express from 'express';
import auth from '../middleware/auth.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { createRazorpayOrder, verifyPaymentSignature } from '../services/PaymentService.js';

const router = express.Router();

// Helper: Recalculate order amount from database products to prevent client tampering
async function calculateOrderTotal(tech, panels, inverter) {
  let subtotal = 0;

  // Get panel prices from DB
  for (const panelItem of panels) {
    const dbPanel = await Product.findOne({ type: 'panel', wp: panelItem.wp });
    if (!dbPanel) {
      throw new Error(`Panel ${panelItem.wp}W not found in database`);
    }
    subtotal += dbPanel.price * panelItem.qty;
  }

  // Get inverter price from DB
  const dbInverter = await Product.findOne({ type: 'inverter', kw: inverter });
  if (!dbInverter) {
    throw new Error(`Inverter ${inverter}kW not found in database`);
  }
  subtotal += dbInverter.price;

  // Add BOS
  const bos = await Product.findOne({ type: 'bos' });
  const bosPrice = bos?.bosPrice || 18500;
  subtotal += bosPrice;

  // Calculate GST
  const gst = Math.round(subtotal * 0.18);
  const total = subtotal + gst;

  return { subtotal, gst, total, bosPrice };
}

// POST /api/orders — Create a new order (for COD only initially)
router.post('/', auth, async (req, res) => {
  try {
    const { tech, panels, inverter, paymentMethod, address } = req.body;

    // Validate required fields
    if (!panels || panels.length === 0) {
      return res.status(400).json({ message: 'At least one panel is required.' });
    }
    if (!inverter) {
      return res.status(400).json({ message: 'Inverter selection is required.' });
    }
    if (!address || !address.name || !address.phone || !address.address || !address.city || !address.state || !address.pin) {
      return res.status(400).json({ message: 'Complete address is required.' });
    }

    // Validate phone and pincode format
    if (!/^\d{10}$/.test(address.phone)) {
      return res.status(400).json({ message: 'Phone must be 10 digits.' });
    }
    if (!/^\d{6}$/.test(address.pin)) {
      return res.status(400).json({ message: 'Pincode must be 6 digits.' });
    }

    // Recalculate totals on server to prevent tampering
    const { subtotal, gst, total, bosPrice } = await calculateOrderTotal(tech, panels, inverter);

    const orderId = 'SS' + Date.now().toString(36).toUpperCase().slice(-8);

    const orderData = {
      orderId,
      user: req.user._id,
      tech,
      panels,
      inverter: { kw: inverter, name: '', price: 0 },
      bosPrice,
      subtotal,
      gst,
      total,
      paymentMethod: paymentMethod || 'cod',
      paymentGateway: paymentMethod === 'online' ? 'razorpay' : 'cod',
      paymentStatus: paymentMethod === 'online' ? 'pending' : 'paid',
      status: paymentMethod === 'online' ? 'pending' : 'confirmed',
      address
    };

    const order = await Order.create(orderData);

    // If online payment, return order with flag for frontend to initiate payment
    if (paymentMethod === 'online') {
      return res.status(201).json({
        order: order.toObject(),
        message: 'Order created. Proceed to payment.',
        amountInPaise: total * 100,
        requiresPayment: true
      });
    }

    res.status(201).json({ order: order.toObject(), message: 'Order placed successfully!' });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(400).json({ message: err.message || 'Failed to create order.' });
  }
});

// POST /api/orders/create-payment — Initiate Razorpay payment
router.post('/create-payment', auth, async (req, res) => {
  try {
    const { orderId, amount } = req.body;

    if (!orderId || !amount) {
      return res.status(400).json({ message: 'Order ID and amount are required.' });
    }

    // Verify order exists and belongs to user
    const order = await Order.findOne({ orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Create Razorpay order
    const razorpayOrder = await createRazorpayOrder(
      Math.round(amount * 100), // Convert to paise
      orderId,
      req.user.email,
      req.user.phone
    );

    // Store Razorpay order ID in our order
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    res.json({
      razorpayOrderId: razorpayOrder.id,
      razorpayKeyId: process.env.RAZORPAY_KEY_ID,
      amount: Math.round(amount * 100),
      currency: 'INR',
      userName: req.user.name,
      userEmail: req.user.email,
      userPhone: req.user.phone,
      orderId: orderId
    });
  } catch (err) {
    console.error('Payment creation error:', err);
    res.status(400).json({ message: err.message || 'Failed to create payment order.' });
  }
});

// POST /api/orders/verify-payment — Verify Razorpay payment
router.post('/verify-payment', auth, async (req, res) => {
  try {
    const { orderId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return res.status(400).json({ message: 'Missing payment details.' });
    }

    // Verify signature
    const isValid = verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature);
    if (!isValid) {
      return res.status(400).json({ message: 'Payment signature verification failed. Payment not confirmed.' });
    }

    // Update order with payment details
    const order = await Order.findOne({ orderId, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    order.paymentStatus = 'paid';
    order.razorpayPaymentId = razorpayPaymentId;
    order.razorpaySignature = razorpaySignature;
    order.paidAt = new Date();
    order.status = 'confirmed';
    await order.save();

    res.json({
      message: 'Payment verified successfully!',
      order: order.toObject(),
      paymentStatus: 'paid'
    });
  } catch (err) {
    console.error('Payment verification error:', err);
    res.status(400).json({ message: err.message || 'Payment verification failed.' });
  }
});

// GET /api/orders — List user's orders
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});

// GET /api/orders/:id — Get single order
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id, user: req.user._id });
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order.' });
  }
});

export default router;
