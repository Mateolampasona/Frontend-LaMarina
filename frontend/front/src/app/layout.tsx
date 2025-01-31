import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/Components/Header";
import { Footer } from "@/Components/Footer";
import "./globals.css";
import WhatsAppBubble from "@/Components/WhatsappBubble";
import { AuthProvider } from "@/Context/AuthContext";
import { UserProvider } from "@/Context/userContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "df-messenger": any;
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
/* eslint-enable @typescript-eslint/no-explicit-any */

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
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#edede9]`}
      >
        <AuthProvider>
          <UserProvider>
            <Header />
            <main>{children}</main>
            <Footer />
            <WhatsAppBubble />

            <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></Script>
            <df-messenger
              chat-title="La Marina Asistente Virtual"
              agent-id="52c2b950-01db-4660-946a-308e78fea438"
              language-code="es"
              className="fixed bottom-20 right-4 z-50"
            ></df-messenger>
          </UserProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
