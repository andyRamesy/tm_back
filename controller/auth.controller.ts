import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateTokens";
import { Response, Request, NextFunction, RequestHandler } from "express";

export const signup: Function = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return res.status(400).json({ message: "Email and password required" });
    }
    console.log("manao anty ve izy");
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email" });
    }

    if (password.length < 6) {
        return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const emailExist = await User.exists({ email });
    if (emailExist) {
        return res.status(400).json({ success: false, message: "Email already used" });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({ email, password: hashedPassword });

    generateTokenAndSetCookies(newUser._id.toString(), res);

    return res.status(201).json({ message: "User created!!!", user: newUser });
  } catch (error: any) {
    // console.error("Error in signup:", error);
    next(error);
    return res.status(500).json({ message: error });
  }
};

export const login: Function = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
     return res.status(400).json({ message: "Email and password required" });
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
     return res.status(404).json({ success: false, messge: "Invalid creds" });
    }

    const isPasswordCorrect = await bcryptjs.compare(password, user!.password);

    if (!isPasswordCorrect) {
     return res.status(400).json({ success: false, message: "Invalid creds" });
    }

    const token = generateTokenAndSetCookies(user!._id.toString(), res);

   return res.status(200).json({
      success: true,
      user: {
        ...user!.toObject(),
        token,
      },
    });
  } catch (error) {}
};

export const logout: Function = (req: Request, res: Response) => {
  try {
    res.clearCookie("jwt-netflix");
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export async function authCheck(req: Request, res: Response) {
  try {
    // console.log('req.user:', req.user);
    // res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    // console.log('Error in authCheck controller', error);
    // res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
