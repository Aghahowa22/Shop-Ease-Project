import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildNewOrder, validateShipping } from "./checkout";
import type { CartItem } from "../types/cart";
import type { Product } from "../types/product";
import type { ShippingDetails } from "../types/order";

function makeProduct(overrides: Partial<Product> = {}): Product {
  return { id: 1, name: "Mug", price: 19.99, ...overrides } as Product;
}

const validShipping: ShippingDetails = {
  fullName: "Ada Obi",
  address: "12 Marina Road",
  city: "Lagos",
  phone: "+234 801-234-5678",
};

describe("validateShipping", () => {
  it("accepts valid details", () => {
    expect(validateShipping(validShipping)).toEqual({});
  });

  it("reports a too-short name, address and city", () => {
    const errors = validateShipping({
      ...validShipping,
      fullName: " A ",
      address: "123",
      city: "L",
    });
    expect(Object.keys(errors).sort()).toEqual(["address", "city", "fullName"]);
  });

  it.each([
    "+234 801-234-5678",
    "08012345678",
    "555 1234",
    "+1 (555) 123".replace(/[()]/g, ""),
  ])("accepts the phone number %s", (phone) => {
    expect(validateShipping({ ...validShipping, phone }).phone).toBeUndefined();
  });

  it.each([
    "",
    "abc",
    "12345",
    "1234567890123456",
    "080-1234-abc",
    "12+345678",
  ])("rejects the phone number %j", (phone) => {
    expect(validateShipping({ ...validShipping, phone }).phone).toBeDefined();
  });
});

describe("buildNewOrder", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-10-18T10:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const items: CartItem[] = [
    { product: makeProduct(), quantity: 3 },
    { product: makeProduct({ id: 2, name: "Lamp", price: 45 }), quantity: 1 },
  ];

  it("copies names and prices into order lines", () => {
    const order = buildNewOrder(7, items, validShipping);
    expect(order.lines).toEqual([
      { productId: 1, name: "Mug", unitPrice: 19.99, quantity: 3 },
      { productId: 2, name: "Lamp", unitPrice: 45, quantity: 1 },
    ]);
  });

  it("totals the order in whole cents", () => {
    expect(buildNewOrder(7, items, validShipping).total).toBe(104.97);
  });

  it("trims the shipping fields", () => {
    const order = buildNewOrder(7, items, {
      fullName: "  Ada Obi ",
      address: " 12 Marina Road  ",
      city: " Lagos ",
      phone: " 08012345678 ",
    });
    expect(order.shipping).toEqual({
      fullName: "Ada Obi",
      address: "12 Marina Road",
      city: "Lagos",
      phone: "08012345678",
    });
  });

  it("sets the user, status and creation time", () => {
    const order = buildNewOrder(7, items, validShipping);
    expect(order.userId).toBe(7);
    expect(order.status).toBe("placed");
    expect(order.createdAt).toBe("2026-10-18T10:00:00.000Z");
  });
});
