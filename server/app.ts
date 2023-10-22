require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";

export const app = express();

// use body parser
app.use(express.json({ limit: "50mb" }));

// use cookie parser
app.use(cookieParser());

// use cors
app.use(cors({ origin: process.env.ORIGIN }));

// write test api
app.get("/test", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Api is working perfectly",
  });
});

// unknown route handling
app.get("*", (req, _res, next) => {
  const err = new Error(`Route ${req.originalUrl} cannot found`) as any;
  err.statusCode = 404;
  next(err);
});

// global error handler
app.use(ErrorMiddleware);
