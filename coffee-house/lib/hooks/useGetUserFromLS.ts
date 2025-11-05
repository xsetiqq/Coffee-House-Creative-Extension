"use client";
import { useState, useEffect, useCallback } from "react";

interface UserProfile {
  id: number;
  login: string;
  city: string;
  street: string;
  houseNumber: number;
  paymentMethod: string;
  createdAt: string;
}

export function useUser() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Инициализация при монтировании
  useEffect(() => {
    // Проверяем, что мы на клиенте
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        const parsedUser: UserProfile = JSON.parse(userData);
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Слушаем изменения в localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "userProfile") {
        try {
          if (e.newValue) {
            const parsedUser: UserProfile = JSON.parse(e.newValue);
            setUser(parsedUser);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error parsing updated user data:", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;

    localStorage.removeItem("authToken");
    localStorage.removeItem("userProfile");
    setUser(null);
  }, []);

  const login = useCallback((userData: UserProfile) => {
    if (typeof window === "undefined") return;

    localStorage.setItem("userProfile", JSON.stringify(userData));
    setUser(userData);
  }, []);

  const updateUser = useCallback(
    (updates: Partial<UserProfile>) => {
      if (typeof window === "undefined") return;

      if (user) {
        const updatedUser = { ...user, ...updates };
        localStorage.setItem("userProfile", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
    },
    [user]
  );

  return {
    user,
    isLoading,
    logout,
    login,
    updateUser,
    isAuthenticated: !!user && !isLoading,
    username: user?.login || null,
    userId: user?.id || null,
    userAddress: user
      ? `${user.city}, ${user.street} ${user.houseNumber}`
      : null,
    userCity: user?.city || null,
    userPaymentMethod: user?.paymentMethod || null,
    userCreatedAt: user?.createdAt || null,
  };
}
