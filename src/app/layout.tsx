import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "@fontsource/jetbrains-mono/index.css";
import "katex/dist/katex.min.css";
import "./globals.css";

// 学术级字体系统
const playfairDisplay = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RF Research | 射频工程技术笔记",
  description: "专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "RF Research",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://rf-research.com",
    title: "RF Research | 射频工程技术笔记",
    description: "专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
    siteName: "RF Research",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "RF Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RF Research | 射频工程技术笔记",
    description: "专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
    images: ["/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${playfairDisplay.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
