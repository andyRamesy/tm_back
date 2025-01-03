import axios from "axios";
import { ENV_VARS } from "../config/env";

export const fetchFromTMDB = async (url: string) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + ENV_VARS.TMDB_API_KEY,
    },
  };

  const response = await axios.get(url, options);

  if (response.status >= 400) {
    throw new Error(response.data.errors);
  }

  return response.data;
};
