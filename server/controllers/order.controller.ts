import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { TOrder } from "../models/order.model";
import userModel from "../models/user.model";
import courseModel from "../models/course.model";
import { newOrder } from "../services/order.service";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";

//create order
export const creteOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, paymentInfo } = req.body as TOrder;

      const user = await userModel.findById(req.user?._id);
      const courseAlreadyExist = user?.courses.some(
        (course: any) => course.courseId === courseId
      );
      if (courseAlreadyExist) {
        return next(
          new ErrorHandler("You have already purchase this course", 400)
        );
      }

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course?._id,
        userId: user?._id,
        paymentInfo,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };
      await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );
      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push({ courseId: course?._id });

      user?.save();
      await notificationModel.create({
        userId: user?._id,
        title: "New order",
        message: `You have a new order from ${course.name}`,
      });

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
