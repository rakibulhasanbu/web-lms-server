import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  coursesAnalytics,
  ordersAnalytics,
  usersAnalytics,
} from "../controllers/analytics.controller";
import { updateAccessToken } from "../controllers/user.controller";

const analyticsRoute = express.Router();

analyticsRoute.get(
  "/users_analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  usersAnalytics
);

analyticsRoute.get(
  "/courses_analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  coursesAnalytics
);

analyticsRoute.get(
  "/orders_analytics",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  ordersAnalytics
);

export default analyticsRoute;
