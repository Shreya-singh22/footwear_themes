import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/contexts/store-context";
import { CartProvider } from "@/contexts/cart-context";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "SneakArts | Premium Luxury Footwear",
  description: "Experience the futuristic aesthetic of SneakArts luxury sneakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-white selection:text-black`}>
        <StoreProvider>
          <CartProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            {children}
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
