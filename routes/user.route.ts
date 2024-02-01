import express from "express";
import {
  activateUser,
  deleteUser,
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
  updateUserRole,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/activate-user", activateUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", updateAccessToken, isAuthenticated, logoutUser);

userRouter.get("/refresh", updateAccessToken);

userRouter.get("/me", updateAccessToken, isAuthenticated, getUserInfo);

userRouter.post("/social-auth", socialAuth);

userRouter.patch(
  "/update-user-info",
  updateAccessToken,
  isAuthenticated,
  updateUserInfo
);

userRouter.patch(
  "/update-password",
  updateAccessToken,
  isAuthenticated,
  updatePassword
);

userRouter.patch(
  "/update-avatar",
  updateAccessToken,
  isAuthenticated,
  updateProfile
);

userRouter.get(
  "/get-users",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);

userRouter.patch(
  "/update-role",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);

userRouter.delete(
  "/delete-user/:id",
  updateAccessToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default userRouter;
