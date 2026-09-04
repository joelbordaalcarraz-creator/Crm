import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/lib/app-context";
import { DataProvider } from "@/lib/data-context";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRM El Recreo",
  description: "Sistema de gestión de clientes de El Recreo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <DataProvider>
          <AppProvider>{children}</AppProvider>
        </DataProvider>
      </body>
    </html>
  );
}
