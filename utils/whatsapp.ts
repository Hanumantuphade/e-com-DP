// utils/whatsapp.ts

import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { calculateDiscountedPrice } from "@/services/discount-service";

const WHATSAPP_BUSINESS_NUMBER = "917206234875";

/**
 * Creates a WhatsApp URL with pre-filled message for product inquiry
 * @param product - The product object
 * @returns WhatsApp URL with encoded message
 */
export const createWhatsAppUrl = (product: Product): string => {
  // Calculate the final price (discounted if applicable)
  const originalPrice = parseFloat(product.price);
  const discountPercentage = product.discount?.percentage || 0;
  const finalPrice = discountPercentage > 0 
    ? calculateDiscountedPrice(product.price, discountPercentage)
    : originalPrice;

  // Create the message text
  let message = `Hi! I'm interested in this product:\n\n`;
  message += `🛍️ *${product.name}*\n`;
  
  if (product.category?.name) {
    message += `📂 Category: ${product.category.name}\n`;
  }
  
  if (product.size?.value) {
    message += `📏 Size: ${product.size.value}\n`;
  }
  

  // Show pricing information
  if (discountPercentage > 0) {
    message += `💰 Price: ${formatPrice(finalPrice)} `;
    message += `(${discountPercentage}% OFF from ${formatPrice(originalPrice)})\n`;
  } else {
    message += `💰 Price: ${formatPrice(finalPrice)}\n`;
  }

  message += `\nCould you please provide more details about availability and delivery?`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
};

/**
 * Opens WhatsApp with pre-filled product message
 * @param product - The product object
 */
export const openWhatsAppChat = (product: Product): void => {
  const whatsappUrl = createWhatsAppUrl(product);
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
};

/**
 * Creates a simple WhatsApp URL with basic product info
 * @param productName - Name of the product
 * @param price - Price of the product (as string or number)
 * @param categoryName - Optional category name
 * @returns WhatsApp URL with encoded message
 */
export const createSimpleWhatsAppUrl = (
  productName: string, 
  price: string | number, 
  categoryName?: string
): string => {
  let message = `Hi! I'm interested in:\n\n`;
  message += `🛍️ *${productName}*\n`;
  
  if (categoryName) {
    message += `📂 Category: ${categoryName}\n`;
  }
  
  message += `💰 Price: ${typeof price === 'string' ? formatPrice(parseFloat(price)) : formatPrice(price)}\n`;
  message += `\nCould you please provide more details?`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
};