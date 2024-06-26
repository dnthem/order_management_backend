import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    unique: true,
  },
  total: {
    type: Number,
    default: 0,
    min: 0,
  }
});

const Incomes = mongoose.model("Income", incomeSchema);



export default Incomes;