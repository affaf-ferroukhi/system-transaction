const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  date: { type: String, required: true },
  openingPrice: { type: Number, required: true },
  closingPrice: { type: Number },
  status: { type: String, enum: ['open', 'closed'], required: true },
});

module.exports = mongoose.model('Session', sessionSchema);
