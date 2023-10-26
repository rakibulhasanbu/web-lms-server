import express from "express";
import {
  activateUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateAccessToken,
  updatePassword,
  updateProfile,
  updateUserInfo,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/activate_user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", isAuthenticated, getUserInfo);

userRouter.post("/social_auth", socialAuth);

userRouter.patch("/update_user_info", isAuthenticated, updateUserInfo);

userRouter.patch("/update_password", isAuthenticated, updatePassword);

userRouter.patch("/update_avatar", isAuthenticated, updateProfile);

userRouter.patch(
  "/get_users",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

export default userRouter;
