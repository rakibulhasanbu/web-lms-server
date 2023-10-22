require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import userModel from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";

//register user
interface TRegisterBody {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;

      const isEmailExist = await userModel.findOne({ email });

      if (isEmailExist) {
        return next(new ErrorHandler("User already exist by this email", 400));
      }

      const user: TRegisterBody = { name, email, password };

      const activationToken = CreateActivationToken(user);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// create a function for activation token
interface TActivationToken {
  token: string;
  activationCode: string;
}

export const CreateActivationToken = (user: any): TActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};
