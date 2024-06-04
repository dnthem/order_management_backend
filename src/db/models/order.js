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
    type: String,
    default: () => new Date().toISOString().split('T')[0],
    required: true,
  },
  deliverDate: {
    type: String
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
    required: true,
  },
  total: {
    type: Number,
    default: 0,
  },
  note: String,
  completedDate: {
    type: String,
  }, 
  paymentType: {
    type: String,
    enum: ["Cash", "Zelle", "Vemmo"],
    default: "Cash",
  },
  
});


const Orders = mongoose.model("Order", orderSchema);

export default Orders;