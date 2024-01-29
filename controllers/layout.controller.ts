import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import layoutModel from "../models/layout.model";
import cloudinary from "cloudinary";

//create layout
export const createLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (!type) {
        return next(
          new ErrorHandler(
            "Please provide type and data for create layout",
            400
          )
        );
      }

      if (type !== "Banner" && type !== "FAQ" && type !== "Categories") {
        return next(
          new ErrorHandler("Your provide type value is not valid", 400)
        );
      }

      const isTypeExist = await layoutModel.findOne({ type });
      if (isTypeExist) {
        return next(new ErrorHandler(`${type} is already exist`, 400));
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.url,
          },
          title,
          subTitle,
        };
        await layoutModel.create(banner);
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        const faqItems = await Promise.all(
          faq.map((item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.create({ type: "FAQ", faq: faqItems });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        const categoriesItems = await Promise.all(
          categories.map((item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await layoutModel.create({
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(201).json({
        success: true,
        message: "Layout created successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//edit layout
export const editLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;

      if (!type) {
        return next(
          new ErrorHandler(
            "Please provide type and data for update layout",
            400
          )
        );
      }

      if (type !== "Banner" && type !== "FAQ" && type !== "Categories") {
        return next(
          new ErrorHandler("Provide right type data for update layouts", 400)
        );
      }

      if (type === "Banner") {
        const { image, title, subTitle } = req.body;
        if (!image && !title && !subTitle) {
          return next(
            new ErrorHandler("Provide Banner data for update layout", 400)
          );
        }
        const bannerData: any = await layoutModel.findOne({ type: "Banner" });
        if (bannerData.image.public_id) {
          await cloudinary.v2.uploader.destroy(bannerData.image.public_id);
        }
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "layout",
        });
        const banner = {
          image: {
            public_id: myCloud.public_id,
            url: myCloud.url,
          },
          title,
          subTitle,
        };
        await layoutModel.findByIdAndUpdate(bannerData._id, { banner });
      }

      if (type === "FAQ") {
        const { faq } = req.body;
        if (!faq) {
          return next(
            new ErrorHandler("Provide faq data for update layout", 400)
          );
        }
        const faqData = await layoutModel.findOne({ type: "FAQ" });
        const faqItems = await Promise.all(
          faq.map((item: any) => {
            return {
              question: item.question,
              answer: item.answer,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(faqData?._id, {
          type: "FAQ",
          faq: faqItems,
        });
      }

      if (type === "Categories") {
        const { categories } = req.body;
        if (!categories) {
          return next(
            new ErrorHandler("Provide categories data for update layout", 400)
          );
        }
        const categoriesData = await layoutModel.findOne({
          type: "Categories",
        });
        const categoriesItems = await Promise.all(
          categories.map((item: any) => {
            return {
              title: item.title,
            };
          })
        );
        await layoutModel.findByIdAndUpdate(categoriesData?._id, {
          type: "Categories",
          categories: categoriesItems,
        });
      }

      res.status(201).json({
        success: true,
        message: "Layout updated successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//get layout individually
export const getSingleLayout = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { type } = req.body;
      if (!type) {
        return next(new ErrorHandler("Provide type for get layout data", 400));
      }
      const layout = await layoutModel.findOne({ type });
      if (!layout) {
        return next(new ErrorHandler(`${type} Layout not found`, 400));
      }

      res.status(200).json({
        success: true,
        layout,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
