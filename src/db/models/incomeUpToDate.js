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

incomeUpToDateSchema.statics.customUpdate = async function (body, id) {
  try {
    // 'this' refers to the model (IncomeUpToDate) itself
    const { userID, Date, Total, UpdatedTime } = body;
    const result = await this.updateOne(
      { userID: userID, _id: id },
      { Date: Date, Total: Total, UpdatedTime: UpdatedTime }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

incomeUpToDateSchema.statics.addEntry = async function (body, userID) {
  try {
    // 'this' refers to the model (IncomeUpToDate) itself
    const { Date, Total, UpdatedTime } = body;
    const result = await new this({
      userID: userID,
      Date: Date,
      Total: Total,
      UpdatedTime: UpdatedTime
    });
    return result;
  } catch (error) {
    throw error;
  }
};


const Incomeuptodate = mongoose.model("IncomeUpToDate", incomeUpToDateSchema);

export default Incomeuptodate;