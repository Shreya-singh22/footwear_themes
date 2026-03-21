import type { Metadata } from "next";
import { Oswald, Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  title: "Hype Kicks Drops",
  description: "Your ultimate destination for exclusive sneaker drops",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-foreground bg-background">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
