import mongoose, { Model, Schema } from "mongoose";

interface TComment extends Document {
  user: object;
  comment: string;
  commentReplies?: TComment[];
}

interface TReview extends Document {
  user: object;
  rating: number;
  comment: string;
  commentReplies: TComment[];
}

interface TLink extends Document {
  title: string;
  url: string;
}

interface TCourseData extends Document {
  title: string;
  description: string;
  videoUrl: string;
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  link: TLink[];
  suggestion: string;
  questions: TComment[];
}

interface TCourse extends Document {
  name: string;
  description: string;
  price: number;
  estimatedPrice?: number;
  thumbnail: object;
  tags: string;
  level: string;
  demoUrl: string;
  benefits: { title: string }[];
  prerequisites: { title: string }[];
  reviews: TReview[];
  courseData: TCourseData[];
  ratings?: number;
  purchased?: number;
}

const commentSchema = new Schema<TComment>({
  user: Object,
  comment: String,
  commentReplies: [Object],
});

const reviewSchema = new Schema<TReview>({
  user: Object,
  rating: {
    type: Number,
    default: 0,
  },
  comment: String,
});

const linkSchema = new Schema<TLink>({
  title: String,
  url: String,
});

const courseDataSchema = new Schema<TCourseData>({
  title: String,
  description: String,
  videoUrl: String,
  videoSection: String,
  videoLength: Number,
  videoPlayer: String,
  link: [linkSchema],
  suggestion: String,
  questions: [commentSchema],
});

const courseSchema = new Schema<TCourse>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedPrice: Number,
    thumbnail: {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [{ title: String }],
    prerequisites: [{ title: String }],
    reviews: [reviewSchema],
    courseData: [courseDataSchema],
    ratings: {
      type: Number,
      default: 0,
    },
    purchased: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const courseModel: Model<TCourse> = mongoose.model("course", courseSchema);

export default courseModel;
