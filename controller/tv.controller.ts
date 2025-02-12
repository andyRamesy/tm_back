import { Request, Response } from "express";
import { fetchFromTMDB } from "../services/tmdb_services";

export async function getPopularTv(request: Request, res: Response) {
  try {
    const data = await fetchFromTMDB(
      'https://api.themoviedb.org/3/tv/popular?language=en-US&page=1',
    );

    res.json({ success: true, data });

  } catch (error) {
    res.json({ success: false, message: error });
  }
}