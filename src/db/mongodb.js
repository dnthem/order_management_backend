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

const uri = process.env.NODE_ENV === "test" 
    ? 'mongodb://127.0.0.1:21557/'
    : process.env.MONGO_URL;
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