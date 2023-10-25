import { NextFunction } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import orderModel from "../models/order.model";

//new order
export const newOrder = CatchAsyncError(
  async (data: any, next: NextFunction) => {
    const order = await orderModel.create(data);
    next(order);
  }
);
