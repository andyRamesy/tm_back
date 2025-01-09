import mongoose from "mongoose";

export default interface IUser {
  email: string;
  password: string;
  image: string;
  searchHistory: string[];
  token: string;
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
  token: {
    type: String,
    default: "",
  },
});

export const User = mongoose.model("User", userSchema);
