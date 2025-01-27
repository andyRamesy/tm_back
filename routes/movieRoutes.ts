import express, { RequestHandler } from "express";
import { getTrendingMovie } from "../controller/movie.controller";
import { protectRoute } from "../middleware/protectedRoutes";

const router = express.Router();

router.get("/trending", getTrendingMovie);

export default router;
