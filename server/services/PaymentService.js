import RazorpayPackage from 'razorpay';
const Razorpay = RazorpayPackage.default || RazorpayPackage;
import crypto from 'crypto';

// Initialize Razorpay lazily to ensure env vars are loaded
let razorpay = null;

function getRazorpayInstance() {
  if (!razorpay) {
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.warn('⚠️ Razorpay keys not configured. Online payments will not work.');
      console.warn('Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to .env');
      return null;
    }
    try {
      razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
      });
      
      if (!razorpay.orders) {
        console.error('❌ Razorpay instance initialized but "orders" property is missing. Import might be wrong.');
        return null;
      }
    } catch (err) {
      console.error('❌ Failed to initialize Razorpay SDK:', err);
      return null;
    }
  }
  return razorpay;
}

export async function createRazorpayOrder(amountInPaise, orderId, customerEmail, customerPhone) {
  try {
    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      throw new Error('Razorpay is not configured. Please add keys to .env');
    }

    const options = {
      amount: Math.round(amountInPaise), // Amount in paise
      currency: 'INR',
      receipt: String(orderId),
      notes: {
        orderId: String(orderId),
        email: String(customerEmail || ''),
        phone: String(customerPhone || '')
      }
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (err) {
    console.error('Razorpay order creation error:', err);
    // Log the error object details if available
    if (err.error) console.error('Razorpay Error Details:', err.error);
    
    const errorMessage = err.message || (err.error && err.error.description) || 'Unknown Razorpay error';
    throw new Error('Failed to create payment order: ' + errorMessage);
  }
}

export function verifyPaymentSignature(razorpayOrderId, razorpayPaymentId, razorpaySignature) {
  try {
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    const generatedSignature = hmac
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex');

    const isSignatureValid = generatedSignature === razorpaySignature;
    return isSignatureValid;
  } catch (err) {
    console.error('Signature verification error:', err);
    return false;
  }
}

export async function getPaymentDetails(paymentId) {
  try {
    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      throw new Error('Razorpay is not configured');
    }
    const payment = await razorpay.payments.fetch(paymentId);
    return payment;
  } catch (err) {
    console.error('Payment fetch error:', err);
    throw new Error('Failed to fetch payment details');
  }
}

export async function refundPayment(paymentId, amount = null) {
  try {
    const razorpay = getRazorpayInstance();
    if (!razorpay) {
      throw new Error('Razorpay is not configured');
    }
    const refundOptions = { payment_id: paymentId };
    if (amount) refundOptions.amount = Math.round(amount); // Amount in paise

    const refund = await razorpay.payments.refund(paymentId, refundOptions);
    return refund;
  } catch (err) {
    console.error('Refund error:', err);
    throw new Error('Failed to process refund');
  }
}
