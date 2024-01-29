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
import layoutRoute from "./routes/layout.route";
import { Resend } from "resend";

export const app = express();

// use body parser
app.use(express.json({ limit: "50mb" }));

// use cookie parser
app.use(cookieParser());

// use cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// routes here
app.use(
  "/api/v1",
  userRouter,
  courseRouter,
  orderRouter,
  notificationRoute,
  analyticsRoute,
  layoutRoute
);

// write test api
const resend = new Resend("re_BRHNYNLV_8ngQaHfoYZAPzjyCP275gr1j");
app.get("/email", async (req, res, next) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "rakibulhasansakib33@gmail.com",
    subject: "Hello World",
    html: "<strong>it works!</strong>",
  });

  if (error) {
    return res.status(400).json(error);
  }
  res.status(200).json({
    success: true,
    message: "Email send success",
    data,
  });
});
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
