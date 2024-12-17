import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokens";
import { Response, Request } from "express";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    generateTokenAndSetCookies(newUser._id.toString(), res);

    res.status(201).json({ message: "User created!!!", user: newUser });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ message: "Server error" });
  }
};
