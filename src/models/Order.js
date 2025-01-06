const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderType: { type: String, required: true },
  agencyNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  idCardNumber: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  certificateNumber: { type: String },
  stockQuantity: { type: Number },
  stockValue: { type: Number },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  validity: { type: Date, required: true },
  orderId: { type: String, required: true }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
