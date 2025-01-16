import express, { RequestHandler } from "express";
import { getTrendingMovie } from "../controller/movie.controller";

const router = express.Router();

router.get("/trending", getTrendingMovie as RequestHandler);

export default router;
