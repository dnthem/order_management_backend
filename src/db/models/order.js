import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  promotion: {
    type: Number,
    default: 0,
  },
  orderDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  deliverDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  // cart is a list of menu and quanity
  cart: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu",
        isNew: true,
      },
      quantity: {
        type: Number,
        default: 1,
        isNew: true,
      }
    }
  ],
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  total: {
    type: Number,
    default: 0,
  },
  notes: String,
  comletedTime: {
    type: Date,
  }, 
  paymentType: {
    type: String,
    enum: ["Cash", "Zelle", "Vemmo"],
    default: "Cash",
  },
  
});


const Orders = mongoose.model("Order", orderSchema);

export default Orders;