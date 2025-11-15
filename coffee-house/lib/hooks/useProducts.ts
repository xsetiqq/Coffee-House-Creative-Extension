import { useMutation, useQuery } from "@tanstack/react-query";
import * as products from "../api/products";
import { AxiosError } from "axios";

export const useGetProducts = () => {
  return useQuery<products.ProductsResponse, Error>({
    queryKey: ["products"],
    queryFn: async () => await products.getProducts(),
  });
};

export const useGetFavorites = () => {
  return useQuery<products.ProductsResponse, Error>({
    queryKey: ["favorites"],
    queryFn: async () => await products.getFavorites(),
  });
};
export const useGetProductById = (id: number) => {
  return useQuery<products.ProductByIdResponse, Error>({
    queryKey: ["product", id],
    queryFn: async () => await products.getProductById(id),
  });
};
export const useConfirmOrder = (body?: products.ConfirmOrderRequest) => {
  return useMutation<
    products.ConfirmOrderResponse,
    AxiosError<{ error?: string }>,
    products.ConfirmOrderRequest
  >({
    mutationKey: ["ConfirmOrder"],
    mutationFn: async (body) => await products.confirmOrder(body),
  });
};