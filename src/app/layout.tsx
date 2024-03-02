import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local"
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const jetBrains = localFont({
  src: "../../public/JetBrainsMono-Variable.ttf"
})

export const metadata: Metadata = {
  title: "Drew Moulton Portfolio",
  description: "Drew's work",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrains.className}`}>{children}</body>
    </html>
  );
}
