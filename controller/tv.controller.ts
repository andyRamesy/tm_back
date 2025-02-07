import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb_services";

export async function getTrendingTv(request: Request, res: Response) {
  try {
    const data = await fetchFromTMDB(
      'https://api.themoviedb.org/3/trending/tv/day?language=en-US',
    );
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];

    res.json({ success: true, data: randomMovie });

  } catch (error) {
    res.json({ success: false, message: error });
  }
}