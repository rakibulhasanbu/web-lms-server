import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import { userAnalytics } from "../controllers/analytics.controller";

const analyticsRoute = express.Router();

analyticsRoute.get(
  "/user_analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  userAnalytics
);

export default analyticsRoute;
