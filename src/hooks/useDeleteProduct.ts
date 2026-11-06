import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { deleteProduct } from "../services/productService";

const queryKeys = {
  products: {
    detail: (id: number) => ["products", "detail", id] as const,
    lists: ["products", "lists"] as const,
  },
};

// Deletes a product, throws away its cached detail page, and refreshes the lists.
export function useDeleteProduct(): UseMutationResult<void, Error, number> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: queryKeys.products.detail(id),
        exact: true,
      });
      return queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists,
      });
    },
  });
}
