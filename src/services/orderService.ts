import { api } from "./api";
import type { NewOrder, Order } from "../types/order";

export async function createOrder(order: NewOrder): Promise<Order> {
  const { data } = await api.post<Order>("/orders", order);
  return data;
}

export async function getOrderById(id: number): Promise<Order> {
  const { data } = await api.get<Order>(`/orders/${id}`);
  return data;
}
