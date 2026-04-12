import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import Product from '../models/Product.js';
import User from '../models/User.js';
import Order from '../models/Order.js';

const router = express.Router();

// ===== DASHBOARD STATS =====
router.get('/dashboard/stats', adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalOrders = await Order.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$total' } } }
    ]);

    const recentOrders = await Order.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      stats: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue[0]?.total || 0,
        paidOrders: await Order.countDocuments({ paymentStatus: 'paid' })
      },
      recentOrders
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch stats.' });
  }
});

// ===== PRODUCT MANAGEMENT =====
router.get('/products', adminAuth, async (req, res) => {
  try {
    const products = await Product.find().sort({ type: 1, price: 1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch products.' });
  }
});

router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ product, message: 'Product created successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to create product.' });
  }
});

router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ product, message: 'Product updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to update product.' });
  }
});

router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json({ message: 'Product deleted successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete product.' });
  }
});

// ===== USER MANAGEMENT =====
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });

    const usersWithOrders = await Promise.all(
      users.map(async (user) => {
        const orderCount = await Order.countDocuments({ user: user._id });
        const totalSpent = await Order.aggregate([
          { $match: { user: user._id, paymentStatus: 'paid' } },
          { $group: { _id: null, total: { $sum: '$total' } } }
        ]);
        return {
          ...user.toObject(),
          orderCount,
          totalSpent: totalSpent[0]?.total || 0
        };
      })
    );

    res.json({ users: usersWithOrders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch users.' });
  }
});

router.get('/users/:id', adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const orders = await Order.find({ user: req.params.id }).sort({ createdAt: -1 });
    const totalSpent = orders.reduce((sum, order) => sum + (order.paymentStatus === 'paid' ? order.total : 0), 0);

    res.json({
      user,
      orders,
      totalSpent,
      orderCount: orders.length
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user details.' });
  }
});

router.put('/users/:id', adminAuth, async (req, res) => {
  try {
    const allowedFields = ['name', 'phone', 'role'];
    const updateData = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user, message: 'User updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update user.' });
  }
});

router.delete('/users/:id', adminAuth, async (req, res) => {
  try {
    // Don't delete, just mark inactive or check if has orders
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const orderCount = await Order.countDocuments({ user: req.params.id });
    if (orderCount > 0) {
      return res.status(400).json({ message: 'Cannot delete user with existing orders.' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete user.' });
  }
});

// ===== ORDER MANAGEMENT =====
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders.' });
  }
});

router.get('/orders/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email phone address');
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.json({ order });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch order.' });
  }
});

router.put('/orders/:id', adminAuth, async (req, res) => {
  try {
    const { status, paymentStatus } = req.body;
    const updateData = {};
    
    if (status) updateData.status = status;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('user', 'name email phone');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    
    res.json({ order, message: 'Order updated successfully!' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to update order.' });
  }
});

// ===== ANALYTICS =====
router.get('/analytics/revenue', adminAuth, async (req, res) => {
  try {
    const monthlyRevenue = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const revenueByPaymentMethod = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      {
        $group: {
          _id: '$paymentMethod',
          total: { $sum: '$total' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({ monthlyRevenue, revenueByPaymentMethod });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics.' });
  }
});

export default router;
