import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Date: {
    type: Date,
    default: new Date().toLocaleDateString("en-US"),
    unique: true,
  },
  Total: {
    type: Number,
    default: 0,
    min: 0,
  }
});

incomeSchema.index({ userID: 1, _id: 1 }, { unique: true });

const Income = mongoose.model("Income", incomeSchema);

export default Income;