import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
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