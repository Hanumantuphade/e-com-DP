// types.ts
export interface Image {
  id: string;
  productId: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  storeId: string;
  billboardId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Color {
  id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface Size {
  id: string;
  storeId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface Discount {
  id: string;
  storeId: string;
  name: string;
  description: string;
  percentage: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products?: Product[];
}

export interface Product {
  id: string;
  storeId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  sizeId: string;
  colorId: string;
  discountId: string | null;
  createdAt: string;
  updatedAt: string;
  images: Image[];
  category?: Category;
  color?: Color;
  size?: Size;
  discount?: Discount | null;
}

export interface Billboard {
  id: string;
  storeId: string;
  label: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryWithImage {
  id: string;
  name: string;
  image?: string;
}

export interface PromotionCard {
  id: number;
  bgColor: string;
  textColor: string;
  title: string;
  subtitle: string;
  buttonColor: string;
  discount?: string;
  imageSrc: string;
}