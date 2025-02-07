import express from "express";
import { getTrendingTv } from "../controller/tv.controller";

const router = express.Router();

router.get("/trending", getTrendingTv);

export default router;
