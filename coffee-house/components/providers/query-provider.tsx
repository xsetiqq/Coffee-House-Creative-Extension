"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export function QueryProvider({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1 * (60 * 1000), // 1 mins
          gcTime: 1 * (60 * 1000), // 1 mins
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
