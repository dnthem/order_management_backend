import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: v => v.includes('@'),
    }
  },
  username: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

userSchema.index({ username: 1, email: 1 }, { unique: true });

const Users = mongoose.model("User", userSchema);

export default Users;