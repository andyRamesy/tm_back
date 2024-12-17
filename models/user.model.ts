import mongoose from "mongoose";

interface IUser {
  email: string;
  password: string;
  image: string;
  searchHistory: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: [String],
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);
