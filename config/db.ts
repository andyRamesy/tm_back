import mongoose from "mongoose";
import { ENV_VARS } from "./env";

export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(ENV_VARS.MONGO_URI);
    console.log("mongodb connected:", connect.connection.host);
  } catch (error) {
    console.error("Error connecting to mongo: ", error);
  }
};
