import express, { RequestHandler } from "express";
import { login, signup, logout } from "../controller/auth.controller";

const router = express.Router();

router.post("/signup", signup as RequestHandler);
router.post("/signin", login as RequestHandler);
router.post("/logout", logout as RequestHandler);

export default router;
