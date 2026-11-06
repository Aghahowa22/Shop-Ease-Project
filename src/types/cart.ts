import type { Product } from "./product";

export interface CartItem {
  product: Product; // a snapshot of the product at the time it was added
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}

// Every way the cart can change. TypeScript narrows the fields by `type`.
export type CartAction =
  | { type: "add"; product: Product; quantity?: number }
  | { type: "remove"; productId: number }
  | { type: "setQuantity"; productId: number; quantity: number }
  | { type: "clear" }
  | { type: "hydrate"; state: CartState }; // replace the whole cart (used for tab sync)
