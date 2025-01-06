const mongoose = require('mongoose');

const nominalOrderBookSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  createdAt: { type: Date, default: Date.now },
  userModified: { type: String, required: true },
});

module.exports = mongoose.model('NominalOrderBook', nominalOrderBookSchema);
