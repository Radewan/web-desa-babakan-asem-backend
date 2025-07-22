import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../router/public-router";
import { adminRouter } from "../router/admin-router";
import path from "node:path";

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

web.use(
  "/api/organizations/images",
  express.static(path.join(__dirname, "..", "..", "images"))
);

web.use("/api/organizations", publicRouter);
web.use("/api/organizations/admin", adminRouter);

web.use(errorMiddleware);
