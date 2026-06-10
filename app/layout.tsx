import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://breakevenfx.com"),
  title: "BreakevenFX | Day Trading Mentorship",
  description:
    "BreakevenFX is a private day trading mentorship program founded by Abhiveer Sarpabhushan. 200+ students across 10+ countries. Apply now.",
  openGraph: {
    title: "BreakevenFX | Day Trading Mentorship",
    description:
      "A private day trading mentorship program founded by Abhiveer Sarpabhushan. 200+ students across 10+ countries.",
    type: "website",
  },
  // Replace REPLACE_WITH_GSC_CODE with the content value from Google Search Console
  // → Search Console → Add Property → HTML tag → copy only the content="..." value
  verification: {
    google: "REPLACE_WITH_GSC_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-brand-navy font-sans text-brand-white antialiased">
        {children}
      </body>
    </html>
  );
}
