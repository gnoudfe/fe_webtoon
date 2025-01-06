import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/app/Header";
import Footer from "@/components/app/Footer";
import Sidebar from "@/components/app/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Hentai Manhwa",
  description:
    "Read free hentai manga, hentai manhwa, and porn comics at Hentai18. Watch uncensored hentai anime porn videos online and dive into a world of thrilling...",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <Sidebar />
        <main className=""> {children}</main>
        <Footer />
      </body>
    </html>
  );
}
