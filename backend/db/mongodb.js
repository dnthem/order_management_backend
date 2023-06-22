import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "./models/menu.js";
import Orders from "./models/order.js";
import Customers from "./models/customer.js";
import Income from "./models/income.js";
import Incomeuptodate from "./models/incomeUpToDate.js";
import Users from "./models/user.js";

dotenv.config();

const uri = process.env.MONGODB_URI;

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}

export {
  connect,
  Menu,
  Orders,
  Customers,
  Income,
  Incomeuptodate,
  Users,
};