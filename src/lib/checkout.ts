import { getCartTotal } from "./cartReducer";
import type { CartItem } from "../types/cart";
import type { NewOrder, ShippingDetails } from "../types/order";

export type ShippingErrors = Partial<Record<keyof ShippingDetails, string>>;

export function validateShipping(shipping: ShippingDetails): ShippingErrors {
  const errors: ShippingErrors = {};

  if (shipping.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }
  if (shipping.address.trim().length < 5) {
    errors.address = "Enter your street address.";
  }
  if (shipping.city.trim().length < 2) {
    errors.city = "Enter your city.";
  }

  const digits = shipping.phone.replace(/[\s-]/g, "").replace(/^\+/, "");
  if (!/^\d{7,15}$/.test(digits)) {
    errors.phone = "Enter a phone number with 7 to 15 digits.";
  }

  return errors;
}

// The browser's total is only a record. A real server recalculates it from its own prices.
export function buildNewOrder(
  userId: number,
  items: CartItem[],
  shipping: ShippingDetails,
): NewOrder {
  return {
    userId,
    lines: items.map((item) => ({
      productId: item.product.id,
      name: item.product.name,
      unitPrice: item.product.price,
      quantity: item.quantity,
    })),
    total: getCartTotal({ items }),
    shipping: {
      fullName: shipping.fullName.trim(),
      address: shipping.address.trim(),
      city: shipping.city.trim(),
      phone: shipping.phone.trim(),
    },
    status: "placed",
    createdAt: new Date().toISOString(),
  };
}
