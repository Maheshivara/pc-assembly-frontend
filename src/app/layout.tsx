import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBar } from "@/components/TopBar";
import { QueryProvider } from "@/components/QueryProvider";
import { getServerSession } from "next-auth";
import { SessionProvider } from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PC Assembly",
  description: "Plataforma de montagem de computadores",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <TopBar />
          <QueryProvider>{children}</QueryProvider>
          <ToastContainer />
        </SessionProvider>
      </body>
    </html>
  );
}
