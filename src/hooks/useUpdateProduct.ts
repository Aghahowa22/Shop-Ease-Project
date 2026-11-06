import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UseMutationResult } from "@tanstack/react-query";
import { updateProduct } from "../services/productService";
import type { Product } from "../types/product";

const queryKeys = {
  products: {
    detail: (id: number) => ["products", "detail", id] as const,
    lists: ["products", "list"] as const,
  },
};

export type UpdateProductVariables = {
  id: number;
  input: Parameters<typeof updateProduct>[1];
};

// Saves changes, puts the fresh product straight into the cache, and refreshes the lists.
export function useUpdateProduct(): UseMutationResult<
  Product,
  Error,
  UpdateProductVariables
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: UpdateProductVariables) =>
      updateProduct(id, input),
    onSuccess: (updated) => {
      queryClient.setQueryData(queryKeys.products.detail(updated.id), updated);
      return queryClient.invalidateQueries({
        queryKey: queryKeys.products.lists,
      });
    },
  });
}
