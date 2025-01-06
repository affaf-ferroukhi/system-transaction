const mongoose = require('mongoose');

const nonNominalOrderBookSchema = new mongoose.Schema({
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now },
  userModified: { type: String, required: true },
});

module.exports = mongoose.model('NonNominalOrderBook', nonNominalOrderBookSchema);
