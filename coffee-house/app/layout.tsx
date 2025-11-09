import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/providers/AppProviders";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { ScrollToTopButton } from "@/components/ui/scrollToTopButton";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Coffee House",
  description: "Sip, Savor, Smile. It’s coffee time!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AppProviders>
          <Header />
          <main className="flex bg-background mx-auto max-w-[1440px] items-center justify-center px-4 md:px-10 pb-5">
            {children}
            <ScrollToTopButton />
          </main>
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
