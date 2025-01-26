const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderType: { type: String, required: true },
  agencyNumber: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateofbirth: { type: Date, required: true },
  placeofbirth: { type: String, required: true },
  Adress: { type: String, required: true },
  city: { type: String, required: true },
  idCardNumber: { type: String, required: true },
  Nationality: { type: String, required: true },
  companyname: { type: String, required: true },
  agrement: { type: String, required: true },
  segmentsouscripteur: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  dateTime: { type: Date, default: Date.now },
  certificateNumber: { type: String },
  actionValue: { type: Number, required: true },
  actionQuantity: { type: Number, required: true },
  minPrice: { type: Number, required: true },
  maxPrice: { type: Number, required: true },
  validity: { type: Date, required: true },
  consent: { type: Boolean, required: true },
  signature: { type: String, required: true },
  orderId: { type: String, required: true }
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
