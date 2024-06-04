import mongoose from "mongoose";
import dotenv from "dotenv";
import { 
  Menu,
  Orders,
  Customers,
  Incomes,
  Incomeuptodate,
  Users,  
} from "./models/index.js";

dotenv.config();

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/order-management";

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
  Incomes,
  Incomeuptodate,
  Users,
};