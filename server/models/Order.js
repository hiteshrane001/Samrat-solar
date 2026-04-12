import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tech: {
    id: String,
    name: String
  },
  panels: [{
    wp: Number,
    name: String,
    qty: Number,
    pricePerUnit: Number,
    total: Number
  }],
  inverter: {
    kw: Number,
    name: String,
    price: Number
  },
  bosPrice: {
    type: Number,
    default: 18500
  },
  subtotal: Number,
  gst: Number,
  total: Number,
  paymentMethod: {
    type: String,
    enum: ['cod', 'online'],
    default: 'cod'
  },
  address: {
    name: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    pin: String,
    landmark: String
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'confirmed'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentGateway: {
    type: String,
    enum: ['cod', 'razorpay'],
    default: 'cod'
  },
  razorpayOrderId: String,
  razorpayPaymentId: String,
  razorpaySignature: String,
  paidAt: Date,
  paymentFailureReason: String
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
