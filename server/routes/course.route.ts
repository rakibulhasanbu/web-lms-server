import express from "express";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
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

courseRouter.get("/get_course/:id", getSingleCourse);

courseRouter.get("/get_courses", getAllCourses);

courseRouter.get("/get_course_content/:id", isAuthenticated, getCourseByUser);

courseRouter.put("/add_question", isAuthenticated, addQuestion);

courseRouter.put("/add_answer", isAuthenticated, addAnswer);

courseRouter.put("/add_review/:id", isAuthenticated, addReview);

courseRouter.put(
  "/add_reply",
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);

export default courseRouter;
