import { api } from "./client";


export const getFavorites = async (): Promise<FavoritesResponse> => {
  const res = await api.get("products/favorites");
  return res.data;
};


export const getProducts = async (): Promise<ProductsResponse> => {
    const res = await api.get("products");
    return res.data;
}

export const getProductById = async (id: number): Promise<ProductByIdResponse> => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};


export const confirmOrder = async (
  body: ConfirmOrderRequest
): Promise<ConfirmOrderResponse> => {
  const res = await api.post("orders/confirm", body);
  return res.data;
};

export type Category = "coffee" | "tea" | "dessert";


export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; 
  discountPrice: string | null; 
  category: Category;
}


export interface ListResponse<T> {
  data: T[];
  message?: string;
  error?: string;
}


export type FavoritesResponse = ListResponse<Product>;
export type ProductsResponse = ListResponse<Product>;


export interface ProductByIdResponse {
  data: ProductDetails;
}

export interface ProductDetails {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string | null;
  category: Category;
  sizes: ProductSizesMap;
  additives: ProductAdditiveEntry[];
}

export type ProductSizesMap = Record<string, ProductSizeEntry>; 

export interface ProductSizeEntry {
  size: SizeKey;
  price: string;
  discountPrice?: string | null;
}

export interface ProductAdditiveEntry {
  name: string; 
  price: string; 
  discountPrice?: string | null;
}

export interface ConfirmOrderRequest {
  items: OrderItem[];
  totalPrice: number; 
}
export type SizeKey = "s" | "m" | "l" | "xl" | "xxl";

export interface OrderItem {
  productId: number;
  size: SizeKey;
  additives: string[];
  quantity: number;
}
export interface ConfirmOrderResponse {
  data?: {
    orderId?: number;
    message?: string;
  };
  message?: string;
}

export interface CartItem {
  productId: number;
  name: string;
  category: string;
  additives: string[];
  count: number;
  img: string;
  sizeKey: string;
  sizeLabel: string;
  unitBasePrice: number;
  unitFinalPrice: number;
}