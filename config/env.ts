import dotenv from "dotenv";

dotenv.config();

interface IEnv_vars {
  MONGO_URI: string;
  PORT: number;
  JWT_SECRET: string;
  NODE_ENV: string;
  TMDB_API_KEY: string;
}

export const ENV_VARS: IEnv_vars = {
  MONGO_URI: process.env.MONGO_URI || "",
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  JWT_SECRET: process.env.JWT_SECRET || "",
  NODE_ENV: process.env.NODE_ENV || "",
  TMDB_API_KEY: process.env.TMDB_API_KEY || "",
};
