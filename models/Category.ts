import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  subcategories?: string[];
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    subcategories: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
