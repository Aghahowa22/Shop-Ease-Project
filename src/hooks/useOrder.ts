import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import { getOrderById } from "../services/orderService";
import type { Order } from "../types/order";

export function useOrder(id: number): UseQueryResult<Order> {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => getOrderById(id),
    enabled: Number.isInteger(id) && id > 0,
  });
}
