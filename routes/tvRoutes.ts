import express from "express";
import { getPopularTv } from "../controller/tv.controller";

const router = express.Router();

router.get("/popular", getPopularTv);

export default router;
