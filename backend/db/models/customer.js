import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  _id: Number,
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customerName: String,
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
    type: String,
    default: new Date(),
  },
  lastPurchase: String,
});

customerSchema.index({ userID: 1, _id: 1 }, { unique: true });

function phoneFormat(value) {
  return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
}

customerSchema.pre("save", function (next) {
  console.log("Pre save");
  if (this.customerName === "" && this.phone === "") {
    throw new Error("Name or phone is required");
  }

  console.log(this.phone);

  this.phone = phoneFormat(this.phone);

  next();
});

const Customers = mongoose.model("Customer", customerSchema);

export default Customers;