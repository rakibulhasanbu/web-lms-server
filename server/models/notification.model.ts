import mongoose, { Schema, Document, Model } from "mongoose";

export interface TNotification extends Document {
  title: string;
  message: string;
  status: string;
  userId: string;
}

const notificationSchema = new Schema<TNotification>(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "unread",
    },
  },
  { timestamps: true }
);

const notificationModel: Model<TNotification> = mongoose.model(
  "notification",
  notificationSchema
);

export default notificationModel;
