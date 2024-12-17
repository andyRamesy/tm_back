import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env";
import { Response } from "express";

export const generateTokenAndSetCookies = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, { expiresIn: "14d" });

  res.cookie("authToken", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    sameSite: "strict", // CSRF attacks cross-site request forgery attacks
    secure: ENV_VARS.NODE_ENV !== "dev",
  });
};
