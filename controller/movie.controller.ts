import { fetchFromTMDB } from "../services/tmdb_services";
import { Response, Request } from "express";

export const getTrendingMovie: Function = async (
  request: Request,
  res: Response
) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const limited = data.results.slice(0, 5);
    return res.status(200).json({ success: true, data: limited });
  } catch (error) {
    res.json({ success: false, message: error });
  }
};
