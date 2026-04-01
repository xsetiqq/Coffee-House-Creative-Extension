"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "./useGetUserFromLS";


export function useAuthRedirect(redirectPath: string = "/") {
  const { isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push(redirectPath);
      } else {
    
        const timer = setTimeout(() => {
          setShowLoader(false);
        }, 0);
        return () => clearTimeout(timer);
      }
    }
  }, [isAuthenticated, isLoading, router, redirectPath]);

  return { showLoader: showLoader && isLoading };
}
