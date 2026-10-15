import { Roboto } from "next/font/google";
import { Lexend_Giga } from "next/font/google";
import "./globals.css";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { SITE_URL } from "@/lib/constants";
import type { Metadata } from "next";

const lexendGiga = Lexend_Giga({
  weight: ["400", "600", "700", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

const roboto = Roboto({
  weight: ["200", "400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: {
    default: "CCH Investments",
    template: "%s | CCH Investment",
  },
  description: "Your next step to private investments",
  icons: {
    icon: [{ url: "/icons/cch-favicon.svg", type: "image/svg+xml" }],
    shortcut: "/icons/cch-favicon.svg",
    apple: "/icons/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(SITE_URL),
  openGraph: {
    title: "CCH Investments",
    description: "Your next step to private investments",
    url: `${SITE_URL}/`,
    siteName: "CCH Investments",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${lexendGiga.variable} font-sans relative antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
