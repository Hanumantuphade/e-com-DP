// // utils/whatsapp.ts

// import { Product } from "@/types";
// import { formatPrice } from "@/utils/format";
// import { calculateDiscountedPrice } from "@/services/discount-service";

// const WHATSAPP_BUSINESS_NUMBER = "917206234875";

// /**
//  * Creates a WhatsApp URL with pre-filled message for product inquiry
//  * @param product - The product object
//  * @returns WhatsApp URL with encoded message
//  */
// export const createWhatsAppUrl = (product: Product): string => {
//   // Calculate the final price (discounted if applicable)
//   const originalPrice = parseFloat(product.price);
//   const discountPercentage = product.discount?.percentage || 0;
//   const finalPrice = discountPercentage > 0 
//     ? calculateDiscountedPrice(product.price, discountPercentage)
//     : originalPrice;

//   // Create the message text
//   let message = `Hi! I'm interested in this product:\n\n`;
//   message += `🛍️ *${product.name}*\n`;
  
//   if (product.category?.name) {
//     message += `📂 Category: ${product.category.name}\n`;
//   }
  
//   if (product.size?.value) {
//     message += `📏 Size: ${product.size.value}\n`;
//   }
  

//   // Show pricing information
//   if (discountPercentage > 0) {
//     message += `💰 Price: ${formatPrice(finalPrice)} `;
//     message += `(${discountPercentage}% OFF from ${formatPrice(originalPrice)})\n`;
//   } else {
//     message += `💰 Price: ${formatPrice(finalPrice)}\n`;
//   }

//   message += `\nCould you please provide more details about availability and delivery?`;

//   // Encode the message for URL
//   const encodedMessage = encodeURIComponent(message);
  
//   // Create WhatsApp URL
//   return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
// };

// /**
//  * Opens WhatsApp with pre-filled product message
//  * @param product - The product object
//  */
// export const openWhatsAppChat = (product: Product): void => {
//   const whatsappUrl = createWhatsAppUrl(product);
//   window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
// };

// /**
//  * Creates a simple WhatsApp URL with basic product info
//  * @param productName - Name of the product
//  * @param price - Price of the product (as string or number)
//  * @param categoryName - Optional category name
//  * @returns WhatsApp URL with encoded message
//  */
// export const createSimpleWhatsAppUrl = (
//   productName: string, 
//   price: string | number, 
//   categoryName?: string
// ): string => {
//   let message = `Hi! I'm interested in:\n\n`;
//   message += `🛍️ *${productName}*\n`;
  
//   if (categoryName) {
//     message += `📂 Category: ${categoryName}\n`;
//   }
  
//   message += `💰 Price: ${typeof price === 'string' ? formatPrice(parseFloat(price)) : formatPrice(price)}\n`;
//   message += `\nCould you please provide more details?`;

//   const encodedMessage = encodeURIComponent(message);
//   return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
// };



// utils/whatsapp.ts

import { Product } from "@/types";
import { formatPrice } from "@/utils/format";
import { calculateDiscountedPrice } from "@/services/discount-service";

const WHATSAPP_BUSINESS_NUMBER = "9621622513";

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

  // Get the main product image
  const productImage = product.images?.[0]?.url;

  // Create the message text
  let message = `Hi! I'm interested in this product:\n\n`;
  
  // Include product image URL if available
  if (productImage && productImage !== "/placeholder.png") {
    message += `🖼️ Product Image: ${productImage}\n\n`;
  }
  
  message += `🛍️ *${product.name}*\n`;
  message += `🆔 Product ID: ${product.id}\n`;
  
  if (product.category?.name) {
    message += `📂 Category: ${product.category.name}\n`;
  }
  
  if (product.size?.value) {
    message += `📏 Size: ${product.size.value}\n`;
  }
  
  if (product.color?.name) {
    message += `🎨 Color: ${product.color.name}\n`;
  }

  // Show pricing information
  if (discountPercentage > 0) {
    message += `💰 Price: ${formatPrice(finalPrice)} `;
    message += `(${discountPercentage}% OFF from ${formatPrice(originalPrice)})\n`;
    message += `💸 You Save: ${formatPrice(originalPrice - finalPrice)}\n`;
  } else {
    message += `💰 Price: ${formatPrice(finalPrice)}\n`;
  }

  message += `\nCould you please provide more details about availability and delivery?`;
  
  // Add a note about the image
  if (productImage && productImage !== "/placeholder.png") {
    message += `\n\n📌 *Note: Product image link is included above for your reference.*`;
  }

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
 * @param imageUrl - Optional product image URL
 * @returns WhatsApp URL with encoded message
 */
export const createSimpleWhatsAppUrl = (
  productName: string, 
  price: string | number, 
  categoryName?: string,
  imageUrl?: string
): string => {
  let message = `Hi! I'm interested in:\n\n`;
  
  // Include image URL if available
  if (imageUrl && imageUrl !== "/placeholder.png") {
    message += `🖼️ Product Image: ${imageUrl}\n\n`;
  }
  
  message += `🛍️ *${productName}*\n`;
  
  if (categoryName) {
    message += `📂 Category: ${categoryName}\n`;
  }
  
  message += `💰 Price: ${typeof price === 'string' ? formatPrice(parseFloat(price)) : formatPrice(price)}\n`;
  message += `\nCould you please provide more details?`;
  
  // Add a note about the image
  if (imageUrl && imageUrl !== "/placeholder.png") {
    message += `\n\n📌 *Note: Product image link is included above for your reference.*`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
};