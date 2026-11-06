import { api } from "./api";
import type { CreateProductInput, Product } from "../types/product";

interface GetProductsOptions {
  limit?: number;
}

export async function getProducts(
  options: GetProductsOptions = {},
): Promise<Product[]> {
  const response = await api.get<Product[]>("/products", {
    params: { _limit: options.limit },
  });

  return response.data;
}

export async function getProductById(id: number): Promise<Product> {
  const response = await api.get<Product>(`/products/${id}`);
  return response.data;
}

export async function createProduct(
  input: CreateProductInput,
): Promise<Product> {
  const response = await api.post<Product>("/products", input);
  return response.data;
}

export async function updateProduct(
  id: number,
  input: CreateProductInput,
): Promise<Product> {
  const response = await api.put<Product>(`/products/${id}`, input);
  return response.data;
}

export async function deleteProduct(id: number): Promise<void> {
  await api.delete(`/products/${id}`);
}
