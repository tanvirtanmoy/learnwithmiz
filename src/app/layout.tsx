import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/i18n";
import { Navbar, Footer } from "@/components";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hana Language School | 日本人のためのオランダ語レッスン",
  description: "3ヶ月でオランダ語の基礎を身につける。日本語でわかりやすく、効率よく学べるオンラインレッスン。Dutch lessons for Japanese learners.",
  keywords: ["Dutch lessons", "Japanese", "Netherlands", "オランダ語", "日本人", "レッスン", "Hana Language School"],
  authors: [{ name: "Mizuki" }],
  openGraph: {
    title: "Hana Language School | 日本人のためのオランダ語レッスン",
    description: "3ヶ月でオランダ語の基礎を身につける。日本語でわかりやすく学べます。",
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
      className={`${poppins.variable} h-full`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-bg-warm text-brown-primary">
        <LanguageProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
