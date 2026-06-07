import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import BottomNavCheck from "@/components/bottom-nav-check";
import Providers from "@/components/providers";
import { routing } from "@/i18n/routing";

const kanit = Kanit({
  variable: "--font-kanit",
  weight: ["400", "500", "600", "700"],
  style: "normal",
  subsets: ["latin", "latin-ext", "thai"],
});

export const metadata: Metadata = {
  title: "School Transport +",
  description: "แอปพลิเคชันที่จะยกระดับการเดินทาง ครบ-จบ-ในที่เดียว",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className={`${kanit.variable} antialiased`}>
        <NextIntlClientProvider>
          <Providers>
            {children}
            <BottomNavCheck />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
