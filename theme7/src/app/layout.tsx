import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/index.css";
import { Providers } from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/contexts/store-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goth Sole Designs",
  description: "Premium Goth-inspired footwear and accessories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <StoreProvider>
          <Providers>
            <Header />
            <main>{children}</main>
            <Footer />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
