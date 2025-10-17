import mongoose, { Schema, Document } from "mongoose";

export interface IPromotionCarouselItem extends Document {
  name: string;
  description: string;
  offer: string;
  imageUrl: string;
  active: boolean;
  productId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PromotionCarouselItemSchema = new Schema<IPromotionCarouselItem>(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    description: { type: String, required: true, trim: true, minlength: 1, maxlength: 500 },
    offer: { type: String, required: true, trim: true, minlength: 1, maxlength: 50 },
    imageUrl: { type: String, required: true, trim: true },
    active: { type: Boolean, default: true },
    productId: { type: String, required: false, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.PromotionCarouselItem ||
  mongoose.model<IPromotionCarouselItem>("PromotionCarouselItem", PromotionCarouselItemSchema);
