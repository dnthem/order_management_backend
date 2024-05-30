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
    type: String,
    default: () => new Date().toISOString().split('T')[0],
    required: true,
  },
});


const Incomeuptodate = mongoose.model("IncomeUpToDate", incomeUpToDateSchema);

export default Incomeuptodate;