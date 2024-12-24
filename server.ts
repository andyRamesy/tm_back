import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { ENV_VARS } from './config/env';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import axios from 'axios';

const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRoutes);

app.listen(PORT, () => {
  console.log('Server running on port :', PORT);
  connectDB();
});
