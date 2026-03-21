import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/contexts/store-context";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "SOLESTYLE. | Premium Footwear Destination",
  description: "Explore the latest in performance and lifestyle footwear. 5000+ styles, 100+ brands.",
  openGraph: {
    title: "Sole Style Hub",
    description: "Your ultimate footwear destination",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="antialiased min-h-screen flex flex-col">
        <StoreProvider>
          <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </Providers>
        </StoreProvider>
      </body>
    </html>
  );
}
