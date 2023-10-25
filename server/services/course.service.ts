import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import courseModel from "../models/course.model";

// create course
export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await courseModel.create(data);
    res.status(201).json({
      success: true,
      course,
    });
  }
);
