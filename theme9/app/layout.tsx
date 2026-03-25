import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider as OrbitProvider } from "@/contexts/store-context";
import { Providers } from "@/components/Providers";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "SoleCraft | Premium Footwear Store",
  description: "Luxury shoes that blend timeless elegance with modern performance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans selection:bg-primary/30`}>
        <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
        <CustomCursor />
        <OrbitProvider>
          <Providers>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Providers>
        </OrbitProvider>
      </body>
    </html>
  );
}
