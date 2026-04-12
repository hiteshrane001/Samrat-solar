import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// GET /api/products/tech
router.get('/tech', async (req, res) => {
  try {
    const techs = await Product.find({ type: 'tech' }).sort({ price: 1 });
    res.json({ products: techs });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch technologies.' });
  }
});

// GET /api/products/panels
router.get('/panels', async (req, res) => {
  try {
    const panels = await Product.find({ type: 'panel' }).sort({ wp: 1 });
    res.json({ products: panels });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch panels.' });
  }
});

// GET /api/products/inverters
router.get('/inverters', async (req, res) => {
  try {
    const inverters = await Product.find({ type: 'inverter' }).sort({ kw: 1 });
    res.json({ products: inverters });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch inverters.' });
  }
});

// GET /api/products/bos
router.get('/bos', async (req, res) => {
  try {
    const bos = await Product.find({ type: 'bos' });
    res.json({ products: bos });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch BOS kit.' });
  }
});

export default router;
