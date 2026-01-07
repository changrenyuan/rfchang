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
  metadataBase: new URL("https://rf-research.com"),
  title: {
    default: "常人元 - 射频工程专家 | RF Engineering Lab",
    template: "%s | 常人元射频研究"
  },
  description: "常人元 - 射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践。提供射频 PA 线性化技术、毫米波链路预算、阻抗匹配等专业解决方案。",
  keywords: ["常人元", "射频工程", "RF Engineering", "5G", "6G", "毫米波", "射频PA线性化", "阻抗匹配", "链路预算", "高频电路"],
  authors: [{ name: "常人元", url: "https://rf-research.com" }],
  creator: "常人元",
  publisher: "RF Engineering Lab",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://rf-research.com",
    languages: {
      "zh-CN": "https://rf-research.com",
    },
  },
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
    title: "常人元 - 射频工程专家 | RF Engineering Lab",
    description: "常人元 - 射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
    siteName: "RF Research",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "常人元 - 射频工程专家",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "常人元 - 射频工程专家 | RF Engineering Lab",
    description: "常人元 - 射频工程专家，专注射频电路设计、5G/6G 通信、高频电路工程研究与实践",
    images: ["/og"],
    creator: "@changry",
  },
  verification: {
    google: "google-site-verification-token",
    yandex: "yandex-verification-token",
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
