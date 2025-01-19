import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/bottom-nav";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={'/logo.png'} />
      </head>
      <body className={`${kanit.variable} antialiased`}>
        {children}
        <BottomNav />
      </body>
    </html>
  );
}
