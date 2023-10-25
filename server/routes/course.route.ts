import express from "express";
import { editCourse, uploadCourse } from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const courseRouter = express.Router();

courseRouter.post(
  "/upload_course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.patch(
  "/edit_course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

export default courseRouter;
