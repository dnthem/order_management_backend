import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
    min: 0,
    required: true,
  },
  description: String,
  hidden: {
    type: Boolean,
    default: false
  },
  imageUrl: String,
});

menuSchema.index({ userID: 1, _id: 1 }, { unique: true });



const Menu = mongoose.model("Menu", menuSchema);

export default Menu;