import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../router/public-router";
import { privateRouter } from "../router/private-router";

export const web = express();

const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];

web.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

web.use(express.json());

web.use("/api/comments", publicRouter);
web.use("/api/comments", privateRouter);

web.use(errorMiddleware);
