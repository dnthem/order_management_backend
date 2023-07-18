import mongoose from "mongoose";

const incomeUpToDateSchema = new mongoose.Schema({
  _id: {
    type: Number,
    default: 1,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
  Total: Number,
  UpdatedTime: Number,
});

incomeUpToDateSchema.index({ userID: 1, _id: 1 }, { unique: true });

const Incomeuptodate = mongoose.model("IncomeUpToDate", incomeUpToDateSchema);

export default Incomeuptodate;