import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  Title: {
    required: true,
    type: String,
  },
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
  Image: String,
});


const Menu = mongoose.model("Menu", menuSchema);

export default Menu;