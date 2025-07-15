import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicRouter } from "../router/public-router";
import path from "node:path";
import { adminRouter } from "../router/admin-router";
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

web.use(
  "/api/products/images",
  express.static(path.join(__dirname, "..", "..", "images"))
);

web.use("/api/products", publicRouter);
web.use("/api/products", privateRouter);
web.use("/api/products/admin", adminRouter);

web.use(errorMiddleware);
