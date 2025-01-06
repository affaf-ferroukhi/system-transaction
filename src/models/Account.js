const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  number: { type: String, required: true },
  titleCode: { type: String, required: true },
  balance: { type: Number, default: 0 },
  indicativeBalance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  userModified: { type: String, required: true },
});

module.exports = mongoose.model('Account', accountSchema);
