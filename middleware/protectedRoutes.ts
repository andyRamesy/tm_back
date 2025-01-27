import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { ENV_VARS } from "../config/env";
import {
  NextFunction,
  Response,
  Request,
  RequestHandler,
  RequestParamHandler,
} from "express";
import { log } from "console";

interface ITokenPayload {
  userId: string;
}

export const protectRoute = async (req, res,next) => {
  try {
    let token =
      req.body.token || req.query.token || req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "unauthorized : expired token" });
    }

    const decoded = jwt.verify(
      token.split(" ")[1],
      ENV_VARS.JWT_SECRET
    ) as ITokenPayload;
    if (!decoded) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectRoute middleware: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
