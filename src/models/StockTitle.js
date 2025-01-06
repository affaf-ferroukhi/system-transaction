const mongoose = require('mongoose');

const stockTitleSchema = new mongoose.Schema({
  titleCode: { type: String, required: true, unique: true },
  titleLabel: { type: String, required: true },
  circulationDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  userModified: { type: String, required: true },
  lastModifiedDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StockTitle', stockTitleSchema);
