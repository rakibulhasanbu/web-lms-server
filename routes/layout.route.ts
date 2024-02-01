import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createLayout,
  editLayout,
  getSingleLayout,
} from "../controllers/layout.controller";
import { updateAccessToken } from "../controllers/user.controller";

const layoutRoute = express.Router();

layoutRoute.post(
  "/create_layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);

layoutRoute.patch(
  "/edit_layout",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);

layoutRoute.get("/get_layout", getSingleLayout);

export default layoutRoute;
