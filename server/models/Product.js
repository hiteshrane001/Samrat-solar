import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['tech', 'panel', 'inverter', 'bos'],
    required: true,
    index: true
  },
  // Common fields
  name: { type: String, required: true },
  img: String,
  price: Number,
  mrp: Number,

  // Tech-specific
  techId: String,
  short: String,
  badge: String,
  badgeType: String,
  eff: String,
  cells: String,
  power: String,
  warranty: String,
  temp: String,
  desc: String,
  feats: [String],

  // Panel-specific
  wp: Number,
  model: String,
  voc: String,
  isc: String,

  // Inverter-specific
  kw: Number,
  brand: String,
  specs: [[String]],

  // BOS-specific
  icon: String,
  sub: String,

  // Pricing
  bosPrice: Number,

  // Inventory
  stock: { type: Number, default: 100, min: 0 },
  stockStatus: {
    type: String,
    enum: ['in_stock', 'low_stock', 'out_of_stock', 'coming_soon'],
    default: 'in_stock'
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);
