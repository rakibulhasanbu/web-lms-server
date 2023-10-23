require("dotenv").config();
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import userModel, { TUser } from "../models/user.model";
import jwt, { Secret } from "jsonwebtoken";
import ejs from "ejs";
import path from "path";
import sendMail from "../utils/sendMail";

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
      const activationCode = activationToken.activationCode;
      const data = { user: { name: user.name }, activationCode };

      await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data
      );

      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });
        res.status(201).json({
          success: true,
          message: `Please check your ${user.email} to activate your account`,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
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

//activate user
interface TActivationRequest {
  activation_token: string;
  activation_code: string;
}

export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { activation_token, activation_code } =
        req.body as TActivationRequest;

      const newUser: { user: TUser; activationCode: string } = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET as string
      ) as { user: TUser; activationCode: string };

      if (newUser.activationCode !== activation_code) {
        return next(new ErrorHandler("Your activation code was invalid", 400));
      }

      const { name, email, password } = newUser.user;

      const existUser = await userModel.findOne({ email });

      if (existUser) {
        return next(
          new ErrorHandler(`This ${email} account already exist`, 400)
        );
      }

      const user = await userModel.create({
        name,
        email,
        password,
      });

      res.status(201).json({
        success: true,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
