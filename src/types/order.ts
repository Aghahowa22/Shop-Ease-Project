export interface ShippingDetails {
  fullName: string;
  address: string;
  city: string;
  phone: string;
}

// A copy of what was bought, taken at purchase time.
export interface OrderLine {
  productId: number;
  name: string;
  unitPrice: number;
  quantity: number;
}

export interface NewOrder {
  userId: number;
  lines: OrderLine[];
  total: number;
  shipping: ShippingDetails;
  status: "placed";
  createdAt: string;
}

export interface Order extends NewOrder {
  id: number;
}
