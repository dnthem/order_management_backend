import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  Total: {
    type: Number,
    default: 0,
    min: 0,
  }
});

const Income = mongoose.model("Income", incomeSchema);

export default Income;