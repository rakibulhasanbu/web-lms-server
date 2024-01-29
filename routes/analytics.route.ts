import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  coursesAnalytics,
  ordersAnalytics,
  usersAnalytics,
} from "../controllers/analytics.controller";

const analyticsRoute = express.Router();

analyticsRoute.get(
  "/users_analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  usersAnalytics
);

analyticsRoute.get(
  "/courses_analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  coursesAnalytics
);

analyticsRoute.get(
  "/orders_analytics",
  isAuthenticated,
  authorizeRoles("admin"),
  ordersAnalytics
);

export default analyticsRoute;
