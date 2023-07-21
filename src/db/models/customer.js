import mongoose from "mongoose";
import { phoneFormat } from "../../utils/index.js";
const customerSchema = new mongoose.Schema({
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
    default: new Date().toLocaleDateString("en-US"),
  },
  lastPurchase: String,
});

customerSchema.index({ userID: 1, _id: 1 }, { unique: true });

customerSchema.pre("save", function (next) {
  console.log("Pre save");
  if (this.customerName === "" && this.phone === "") {
    throw new Error("Name or phone is required");
  }

  console.log(this.phone);

  this.phone = phoneFormat(this.phone);

  next();
});

customerSchema.statics.customUpdate = async function (body, id, userID) {
  try {
    const { customerName, phone } = body;
    const result = await this.updateOne(
      { userID: userID, _id: id },
      { customerName: customerName, phone: phone }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

customerSchema.statics.addEntry = async function (body, userID) {
  try {
    const { customerName, phone } = body;
    const result = await new this({
      userID: userID,
      customerName: customerName,
      phone: phone,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const Customers = mongoose.model("Customer", customerSchema);

export default Customers;