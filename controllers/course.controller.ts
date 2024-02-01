import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import courseModel from "../models/course.model";
import { redis } from "../utils/redis";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import notificationModel from "../models/notification.model";

//upload course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { data } = req.body;
      if (Object.keys(data).length === 0) {
        return next(new ErrorHandler("Please provide course data", 400));
      }

      const thumbnail = data.thumbnail;
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
      createCourse(data, res, next);
      console.log(data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//edit course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      if (Object.keys(data).length === 0) {
        return next(new ErrorHandler("Please provide update course data", 400));
      }

      const thumbnail = data.thumbnail;
      if (thumbnail) {
        if (thumbnail.public_id) {
          await cloudinary.v2.uploader.destroy(thumbnail.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });
        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;
      const course = await courseModel.findByIdAndUpdate(
        courseId,
        { $set: data },
        { new: true }
      );
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get single course (without purchasing)
export const getSingleCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;
      const isCourseCashed = await redis.get(courseId);

      if (isCourseCashed) {
        const course = JSON.parse(isCourseCashed);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await courseModel
          .findById(courseId)
          .select(
            "-courseData.videoUrl -courseData.links -courseData.suggestion -courseData.questions"
          );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800);

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get all course (without purchasing)
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCoursesCashed = await redis.get("allCourses");

      if (isCoursesCashed) {
        const courses = JSON.parse(isCoursesCashed);
        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await courseModel
          .find()
          .select(
            "-courseData.videoUrl -courseData.links -courseData.suggestion -courseData.questions"
          );

        await redis.set("allCourses", JSON.stringify(courses));

        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//get course content -(only for valid user)
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCoursesList = req.user?.courses;
      const courseId = req.params.id;

      const isCourseExist = userCoursesList?.find(
        (course: any) => course._id.toString() === courseId
      );

      if (!isCourseExist) {
        return next(
          new ErrorHandler("You are not eligible to access these course", 404)
        );
      }
      const course = await courseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add question in course
interface TAddQuestionData {
  question: string;
  courseId: string;
  contentId: string;
}

export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, question, contentId }: TAddQuestionData = req.body;
      const course = await courseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      //create a new question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      //add these question to our course content
      courseContent.questions.push(newQuestion);

      await notificationModel.create({
        userId: req.user?._id,
        title: "New question added",
        message: `You have a new question in ${courseContent.title}`,
      });

      //save the updated course
      await course?.save();

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add answer in course question
interface TAddAnswerData {
  answer: string;
  courseId: string;
  contentId: string;
  questionId: string;
}

export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, answer, questionId, contentId }: TAddAnswerData =
        req.body;

      const course = await courseModel.findById(courseId);

      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const courseContent = course?.courseData.find((item: any) =>
        item._id.equals(contentId)
      );

      if (!courseContent) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      const question = courseContent?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Invalid question id", 400));
      }
      //create a new answer object
      const newAnswer: any = {
        user: req.user,
        answer,
      };

      //add these answer to our course content
      question.questionReplies?.push(newAnswer);

      await course?.save();

      if (req.user?._id === question.user?._id) {
        await notificationModel.create({
          userId: req.user?._id,
          title: "New question answer added",
          message: `You have a new question answer in ${courseContent.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: courseContent.title,
        };

        await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question reply",
            template: "question-reply.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//add review course
interface TAddReviewData {
  review: string;
  rating: number;
}

export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCoursesList = req.user?.courses;
      const courseId = req.params.id;

      //check the course id is already exist in userCourseList id
      const courseExist = userCoursesList?.some(
        (course: any) => course.courseId.toString() === courseId
      );

      if (!courseExist) {
        return next(
          new ErrorHandler("Your are not eligible to access these course", 500)
        );
      }

      const course = await courseModel.findById(courseId);

      const { review, rating } = req.body as TAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(reviewData);

      let avr = 0;
      course?.reviews.forEach((rev: any) => {
        avr += rev.rating;
      });

      if (course) {
        course.ratings = avr / course.reviews.length;
      }

      await course?.save();

      //create notification
      await notificationModel.create({
        userId: req.user?._id,
        title: "New review added",
        message: `${req.user?.name} has given a review in ${course?.name}`,
      });

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// add reply in review
interface TAddReplyToReview {
  comment: string;
  courseId: string;
  reviewId: string;
}
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId }: TAddReplyToReview = req.body;

      const course = await courseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course?.reviews.find(
        (rev: any) => rev._id.toString() === reviewId
      );
      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }
      review?.commentReplies?.push(replyData);

      await course?.save();

      res.status(201).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all courses - (only admin)
export const getAllCoursesByAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//delete course bt admin only
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await courseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      await courseModel.deleteOne({ _id: id });

      await redis.del(id);

      res.status(200).json({
        success: true,
        message: `${course.name} course deleted successfully`,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
