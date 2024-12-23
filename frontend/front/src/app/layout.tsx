import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import "./globals.css";
import Link from "next/link";
import WhatsAppBubble from "@/Components/WhatsappBubble";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "La Marina | Mayorista",
  description: "Mayorista de productos de limpieza y bazares",
  icons: {
    icon: ["/favicon.ico?=v8"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#edede9]`}
      >
        <Header />
        {children}
        <Footer />
        <WhatsAppBubble/>
      </body>
    </html>
  );
}
