"use client";
import { useState, useEffect, useCallback } from "react";

interface CartItem {
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

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart: CartItem[] = JSON.parse(cartData);
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error loading cart data:", error);
      setCart([]);
    } finally {
      setIsLoading(false);
    }
  }, []);


  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "cart") {
        try {
          if (e.newValue) {
            const parsedCart: CartItem[] = JSON.parse(e.newValue);
            setCart(parsedCart);
          } else {
            setCart([]);
          }
        } catch (error) {
          console.error("Error parsing updated cart data:", error);
          setCart([]);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const onCartChange = (e: Event) => {
      const ce = e as CustomEvent<{ cart: CartItem[] }>;
      if (ce?.detail && "cart" in ce.detail) {
        setCart(ce.detail.cart ?? []);
        return;
      }

      try {
        const raw = localStorage.getItem("cart");
        setCart(raw ? JSON.parse(raw) : []);
      } catch {
        setCart([]);
      }
    };

    window.addEventListener("cart:change", onCartChange as EventListener);
    return () =>
      window.removeEventListener("cart:change", onCartChange as EventListener);
  }, []);


  const updateCart = useCallback((newCart: CartItem[]) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      window.dispatchEvent(
        new CustomEvent("cart:change", { detail: { cart: newCart } })
      );
    } catch (error) {
      console.error("Update cart error:", error);
    }
  }, []);

 
  const addToCart = useCallback((item: CartItem) => {
    if (typeof window === "undefined") return;

    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      
      const existingItemIndex = currentCart.findIndex(
        (cartItem: CartItem) =>
          cartItem.productId === item.productId &&
          cartItem.sizeKey === item.sizeKey &&
          JSON.stringify(cartItem.additives) === JSON.stringify(item.additives)
      );

      let newCart;
      if (existingItemIndex !== -1) {
        newCart = [...currentCart];
        newCart[existingItemIndex].count += item.count;
      } else {
        newCart = [...currentCart, item];
      }

      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      window.dispatchEvent(
        new CustomEvent("cart:change", { detail: { cart: newCart } })
      );
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  }, []);


  const removeFromCart = useCallback((productId: number, sizeKey: string, additives: string[]) => {
    if (typeof window === "undefined") return;

    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCart = currentCart.filter(
        (item: CartItem) =>
          !(item.productId === productId &&
            item.sizeKey === sizeKey &&
            JSON.stringify(item.additives) === JSON.stringify(additives))
      );

      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      window.dispatchEvent(
        new CustomEvent("cart:change", { detail: { cart: newCart } })
      );
    } catch (error) {
      console.error("Remove from cart error:", error);
    }
  }, []);

  const updateItemQuantity = useCallback((productId: number, sizeKey: string, additives: string[], newCount: number) => {
    if (typeof window === "undefined") return;

    try {
      const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const newCart = currentCart.map((item: CartItem) =>
        item.productId === productId &&
        item.sizeKey === sizeKey &&
        JSON.stringify(item.additives) === JSON.stringify(additives)
          ? { ...item, count: newCount }
          : item
      ).filter((item: CartItem) => item.count > 0); 

      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
      window.dispatchEvent(
        new CustomEvent("cart:change", { detail: { cart: newCart } })
      );
    } catch (error) {
      console.error("Update quantity error:", error);
    }
  }, []);


  const clearCart = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem("cart");
      setCart([]);
      window.dispatchEvent(
        new CustomEvent("cart:change", { detail: { cart: [] } })
      );
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  }, []);

  const totalItems = cart.reduce((sum, item) => sum + item.count, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.unitFinalPrice * item.count), 0);
  const totalBasePrice = cart.reduce((sum, item) => sum + (item.unitBasePrice * item.count), 0);

  return {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    updateCart,
    totalItems,
    totalPrice,
    totalBasePrice,
    hasItems: cart.length > 0,
    itemCount: cart.length, 
  };
}