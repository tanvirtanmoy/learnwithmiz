import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n";
import { Navbar, Footer } from "@/components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Learn with Miz | 日本人のためのオランダ語レッスン",
  description: "オランダ在住の日本人向けオランダ語レッスン。日本語でわかりやすく、日常生活に役立つオランダ語をやさしく学べます。Dutch lessons for Japanese people in the Netherlands.",
  keywords: ["Dutch lessons", "Japanese", "Netherlands", "オランダ語", "日本人", "レッスン"],
  authors: [{ name: "Mizuki" }],
  openGraph: {
    title: "Learn with Miz | 日本人のためのオランダ語レッスン",
    description: "オランダ在住の日本人向けオランダ語レッスン。日本語でわかりやすく学べます。",
    type: "website",
    locale: "ja_JP",
    alternateLocale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-warmWhite text-warmGray-800">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
