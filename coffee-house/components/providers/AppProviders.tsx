"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";
import { QueryProvider } from "./query-provider";
import { Toaster } from "../ui/sonner";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors position="bottom-center" />
        </ThemeProvider>
      </QueryProvider>
    </>
  );
}
