import mongoose from "mongoose";

const incomeUpToDateSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Total: {
    type: Number,
    default: 0,
    min: 0,
  },
  UpdatedTime: {
    type: Date,
    default: Date.now,
  },
});

const IncomeUpToDate = mongoose.model("IncomeUpToDate", incomeUpToDateSchema);

export default IncomeUpToDate;