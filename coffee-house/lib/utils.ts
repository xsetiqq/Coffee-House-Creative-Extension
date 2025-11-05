import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function isLogged(): boolean {
  return !!localStorage.getItem("authToken");
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