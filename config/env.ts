import dotenv from 'dotenv';

dotenv.config();

export const ENV_VARS = {
  MONGO_URI: '',
  PORT: process.env.PORT || 5000,
};
