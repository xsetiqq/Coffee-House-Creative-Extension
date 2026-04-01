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

  useEffect(() => {
    if (typeof window === "undefined") {
      setIsLoading(false);
      return;
    }

    try {
      const userData = localStorage.getItem("userProfile");
      if (userData) {
        const parsedUser: UserProfile = JSON.parse(userData);
        setUser(parsedUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // listen to storage events 
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
          setUser(null);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);


  useEffect(() => {
    if (typeof window === "undefined") return;

    const onAuthChange = (e: Event) => {
      const ce = e as CustomEvent<{ user: UserProfile | null }>;
      if (ce?.detail && "user" in ce.detail) {
        setUser(ce.detail.user ?? null);
        return;
      }

      
      try {
        const raw = localStorage.getItem("userProfile");
        setUser(raw ? JSON.parse(raw) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("auth:change", onAuthChange as EventListener);
    return () =>
      window.removeEventListener("auth:change", onAuthChange as EventListener);
  }, []);

  const logout = useCallback(() => {
    if (typeof window === "undefined") return;

    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userProfile");
      setUser(null);
      window.dispatchEvent(
        new CustomEvent("auth:change", { detail: { user: null } })
      );
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, []);

  const login = useCallback((userData: UserProfile) => {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem("userProfile", JSON.stringify(userData));
      setUser(userData);
      window.dispatchEvent(
        new CustomEvent("auth:change", { detail: { user: userData } })
      );
    } catch (error) {
      console.error("Login error:", error);
    }
  }, []);

  const updateUser = useCallback(
    (updates: Partial<UserProfile>) => {
      if (typeof window === "undefined") return;

      if (user) {
        try {
          const updatedUser = { ...user, ...updates };
          localStorage.setItem("userProfile", JSON.stringify(updatedUser));
          setUser(updatedUser);
          window.dispatchEvent(
            new CustomEvent("auth:change", { detail: { user: updatedUser } })
          );
        } catch (error) {
          console.error("Update user error:", error);
        }
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
