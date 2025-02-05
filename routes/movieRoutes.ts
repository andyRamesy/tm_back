import express, { RequestHandler } from "express";
import { getNowPlayingMovie, getTrendingMovie } from "../controller/movie.controller";

const router = express.Router();

router.get("/trending", getTrendingMovie);
router.get("/nowplaying",getNowPlayingMovie);

export default router;
