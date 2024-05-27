import mongoose from "mongoose";

const incomeUpToDateSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  total: {
    type: Number,
    default: 0,
    min: 0,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
});


const Incomeuptodate = mongoose.model("IncomeUpToDate", incomeUpToDateSchema);

export default Incomeuptodate;