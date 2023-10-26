require("dotenv").config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRoute from "./routes/notification.route";
import analyticsRoute from "./routes/analytics.route";

export const app = express();

// use body parser
app.use(express.json({ limit: "50mb" }));

// use cookie parser
app.use(cookieParser());

// use cors
app.use(cors({ origin: process.env.ORIGIN }));

// routes here
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRoute,
  analyticsRoute
);

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
