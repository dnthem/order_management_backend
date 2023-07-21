import mongoose from "mongoose";
import dotenv from "dotenv";
import { 
  Menu,
  Orders,
  Customers,
  Income,
  Incomeuptodate,
  Users,  
} from "./models/index.js";

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