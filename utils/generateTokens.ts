import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env";
import { Response } from "express";

export const generateTokenAndSetCookies = (userId: string, res: Response) => {
  const token = jwt.sign({ userId: userId.toString() }, ENV_VARS.JWT_SECRET, {
    expiresIn: "14d",
  });
  
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: true,
  });
  return token;
};
