import express from "express";
import { errorHandler } from "./middlewares/errorHandler";
import radioRouter from "./routes/radio.routes";

const app = express();

app.use(express.json());

app.use("/api/v1", radioRouter);

app.use(errorHandler);

export default app;
