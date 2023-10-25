import mongoose, { Schema, Document, Model } from "mongoose";

export interface TOrder extends Document {
  courseId: string;
  userId: string;
  paymentInfo: string;
}

const orderSchema = new Schema<TOrder>(
  {
    courseId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    paymentInfo: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const orderModel: Model<TOrder> = mongoose.model("order", orderSchema);

export default orderModel;
