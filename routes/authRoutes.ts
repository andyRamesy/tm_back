import express from "express";
import { authCheck, signup } from "../controller/auth.controller";
import { protectRoute } from "../middleware/protectedRoutes";

const router = express.Router();

router.post('/signup', signup);


export default router;