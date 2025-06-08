import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import songsRouter from "./rotues/songs";

const app = express();

app.use(express.json());

// Routes
app.use("/api/v1", songsRouter);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;
