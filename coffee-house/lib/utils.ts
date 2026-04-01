import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Product, ProductsResponse } from "./api/products";
import { useUser } from "./hooks/useGetUserFromLS";



export function useIsLogged(): boolean {
  const { user } = useUser();
  return !!user;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCartCount(): number {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return 0;
    const list = JSON.parse(raw) as Array<{ count?: number }>;
    return list.reduce((acc, it) => acc + (it.count ?? 0), 0);
  } catch {
    return 0;
  }
}

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatPaymentMethod = (method: string) => {
  return method === "card"
    ? "Credit Card"
    : method.charAt(0).toUpperCase() + method.slice(1);
};

export function sortByCategory(products: ProductsResponse) {
  const categories: {
    coffee: Product[];
    tea: Product[];
    dessert: Product[];
  } = {
    coffee: [],
    tea: [],
    dessert: [],
  };

  products.data.forEach((item: Product) => {
    const category = item.category?.toLowerCase();

    if (category === "coffee") {
      categories.coffee.push(item);
    } else if (category === "tea") {
      categories.tea.push(item);
    } else if (category === "dessert") {
      categories.dessert.push(item);
    } else {
      categories.dessert.push(item);
    }
  });

  return categories;
}
