import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "HYDREON — StreamGuard AI | Citizen Science Freshwater Assessment",
  description:
    "Transforming citizen stream observations into structured, explainable environmental intelligence for urban freshwater ecosystems. Built for IEEE OneAquaHealth Hackathon 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="flex flex-col min-h-screen bg-paper-50 text-textMain antialiased selection:bg-env-200 selection:text-env-900">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
