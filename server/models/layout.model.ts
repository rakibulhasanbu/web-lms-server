import { Document, Schema, model } from "mongoose";

interface TFaqItem extends Document {
  question: string;
  answer: string;
}

interface TCategory extends Document {
  title: string;
}

interface TBannerImage extends Document {
  public_id: string;
  url: string;
}

interface TLayout extends Document {
  type: string;
  faq: TFaqItem[];
  categories: TCategory[];
  banner: {
    image: TBannerImage;
    title: string;
    subTitle: string;
  };
}

const faqSchema = new Schema<TFaqItem>({
  question: String,
  answer: String,
});

const categorySchema = new Schema<TCategory>({
  title: String,
});

const bannerImageSchema = new Schema<TBannerImage>({
  public_id: String,
  url: String,
});

const layoutSchema = new Schema<TLayout>({
  type: String,
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: String,
    subTitle: String,
  },
});

const layoutModel = model<TLayout>("layout", layoutSchema);

export default layoutModel;
