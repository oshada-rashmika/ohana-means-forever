import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ohana Means Forever",
  description: "Our little digital paradise—a beautiful story of love, laughter, and endless 'Ohana. Crafted for my Angel, Senuri Rukshani.",
  icons: {
    icon: "/stitch.png",
    apple: "/stitch.png",
  },
  openGraph: {
    title: "Ohana Means Forever",
    description: "Our little digital paradise—a beautiful story of love, laughter, and endless 'Ohana.",
    images: ["/stitch.png"],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
