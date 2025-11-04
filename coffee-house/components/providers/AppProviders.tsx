"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "./theme-provider";

type Props = {
  children: ReactNode;
};

export default function AppProviders({ children }: Props) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      
    </>
  );
}
