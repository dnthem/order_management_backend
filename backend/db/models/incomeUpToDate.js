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

const Incomeuptodate = mongoose.model("IncomeUpToDate", incomeUpToDateSchema);

export default Incomeuptodate;