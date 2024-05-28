import mongoose from "mongoose";
import { phoneFormat } from "../../utils/index.js";
const customerSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phone: String,
  orderCount: {
    type: Number,
    default: 0,
  },
  totalSpent: {
    type: Number,
    default: 0,
  },
  registerationDate: {
    type: Date,
    default: Date.now,
  },
  lastPurchase: {
    type: Date,
  },
});

customerSchema.index({ userID: 1, _id: 1 }, { unique: true });


const Customers = mongoose.model("Customer", customerSchema);

export default Customers;