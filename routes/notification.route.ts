import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  getNotifications,
  updateNotification,
} from "../controllers/notification.controller";
import { updateAccessToken } from "../controllers/user.controller";

const notificationRoute = express.Router();

notificationRoute.get(
  "/get_notifications",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);

notificationRoute.get(
  "/update_notification/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default notificationRoute;
