import mongoose from "mongoose";
import { ENV } from "../constants/environment";

const connect = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URL);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};

export const DB = {
  connect,
};
