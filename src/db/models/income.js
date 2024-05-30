import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0],
  },
  total: {
    type: Number,
    default: 0,
    min: 0,
  }
});

// set index for userID and date
incomeSchema.index({ userID: 1, date: 1 }, { unique: true });

const Incomes = mongoose.model("Income", incomeSchema);



export default Incomes;