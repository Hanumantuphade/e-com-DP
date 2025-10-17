import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
  name: string;
  subcategories?: string[];
  slug?: string;
  imageUrl: string;
}

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, trim: true },
    subcategories: [{ type: String, trim: true }],
    // Optional slug derived from name. We'll generate it in API routes.
    slug: { type: String, trim: true },
    imageUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Enforce case-insensitive uniqueness on name using collation (MongoDB >= 3.4)
CategorySchema.index({ name: 1 }, { unique: true, collation: { locale: "en", strength: 2 } });

export default mongoose.models.Category ||
  mongoose.model<ICategory>("Category", CategorySchema);
