import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  promotion: {
    type: Number,
    default: 0,
  },
  orderDate: String,
  deliverDate: String,
  status: {
    type: Boolean,
    default: false,
  },
  // cart is a list of menu and quanity
  cart: [
    {
      item: {
        type: Number,
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
  customer: {
    type: Number,
    ref: "Customer",
  },
  total: {
    type: Number,
    default: 0,
  },
  notes: String,
  nthOrderOfDay: {
    type: Number,
    default: 0,
  },
  comletedTime: Date, 
  paymentType: {
    type: String,
    enum: ["Cash", "Zelle", "Vemmo"],
    default: "Cash",
  },
  
});

const autoPopulate = async function (next) {
  this.populate("cart.item", {_id: 1, Title: 1, Price: 1}).populate("customer", {_id: 1, customerName: 1, phone: 1});
  next();
};

// calculate total price
orderSchema.pre("save", async function (next) {
  try {
    let total = 0;
    for (let i = 0; i < this.cart.length; i++) {
      const menu = await this.model("Menu").findById(this.cart[i].item);
      total += menu.Price * this.cart[i].quantity;
    }
    this.total = total - this.promotion;
    next();
  } catch (err) {
    next(err);
  }
});

orderSchema.pre("findOne", autoPopulate);
orderSchema.pre("find", autoPopulate);



const Orders = mongoose.model("Order", orderSchema);

export default Orders;