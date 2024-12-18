import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokens";
import { Response, Request, NextFunction } from "express";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: { email?: string, password?: string } = req.body;

    
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
    next(error);
  }
};

export async function authCheck(req: Request, res: Response) {
  try {
    console.log("req.user:", req.user);
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in authCheck controller", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}
