import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Title: String,
  Count: {
    type: Number,
    default: 0,
  },
  Price: {
    type: Number,
    default: 0,
    min: 0,
  },
  Description: String,
  Hidden: {
    type: Boolean,
    default: false
  },
  Image: String
});

menuSchema.index({ userID: 1, _id: 1 }, { unique: true });

menuSchema.statics.customUpdate = async function (body, id, userID) {
  try {
    const { Title, Count, Price, Description, Hidden, Image } = body;
    const result = await this.updateOne(
      { userID: userID, _id: id },
      { Title: Title, Count: Count, Price: Price, Description: Description, Hidden: Hidden, Image: Image }
    );
    return result;
  } catch (error) {
    throw error;
  }
};

menuSchema.statics.addEntry = async function (body, userID) {
  try {
    const {Title, Count, Price, Description, Hidden, Image } = body;
    const result = await new this({
      userID: userID,
      Title: Title,
      Count: Count,
      Price: Price,
      Description: Description,
      Hidden: Hidden,
      Image: Image
    });
    return result;
  } catch (error) {
    throw error;
  }
};


const Menu = mongoose.model("Menu", menuSchema);

export default Menu;