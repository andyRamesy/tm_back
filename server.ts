import express, { RequestHandler } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { ENV_VARS } from "./config/env";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import { protectRoute } from "./middleware/protectedRoutes";
import movieRoutes from "./routes/movieRoutes";
const app = express();

const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);

app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
  connectDB();
});
