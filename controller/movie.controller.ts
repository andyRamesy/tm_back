import { log } from 'console';
import { fetchFromTMDB } from '../services/tmdb_services';
import { Response, Request } from 'express';

export async function getTrendingMovie(request: Request, res: Response) {
  try {
    log('getTrendingMovie start');
    const data = await fetchFromTMDB(
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US',
    );
    const limited = data.results.slice(0, 5);
    res.status(200).json({ success: true, data: limited });
  } catch (error) {
    log('error fetch trending movies', error);
    res.json({ success: false, message: error });
  }
}

export async function getNowPlayingMovie(request: Request, res: Response) {
  try {
    const data = await fetchFromTMDB(
      'https://api.themoviedb.org/3/movie/now_playing',
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.json({ success: false, message: error });
  }
}
