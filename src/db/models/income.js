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

incomeSchema.statics.customUpdate = async function (body, date, userID) {
  try {
    // 'this' refers to the model (Income) itself
    const { _id, Total } = body;
    const result = await this.updateOne(
      { userID: userID, Date: new Date(date), _id: _id },
      { Total: Total }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

incomeSchema.statics.addEntry = async function (body, userID) {
  try {
    // 'this' refers to the model (Income) itself
    const { Date, Total } = body;
    const result = await new this({
      userID: userID,
      Date: Date,
      Total: Total
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const Income = mongoose.model("Income", incomeSchema);



export default Income;