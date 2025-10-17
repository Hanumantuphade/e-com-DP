import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  // Optional Mongoose ref for future population
  category?: mongoose.Types.ObjectId;
  // String category id used by frontend filters (must match dropdown ids)
  categoryId: string;
  price: number;
  description?: string;
  image?: string;
  isFeatured?: boolean;
  featuredAt?: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: false },
    categoryId: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    description: { type: String, trim: true },
    image: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false },
    featuredAt: { type: Date }
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model<IProduct>("Product", ProductSchema);
