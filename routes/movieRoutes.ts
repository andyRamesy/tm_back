import express, { RequestHandler } from "express";
import { getTrendingMovie } from "../controller/movie.controller";
import { protectRoute } from "../middleware/protectedRoutes";

const router = express.Router();

router.get("/trending", protectRoute as any,getTrendingMovie as RequestHandler);

export default router;
