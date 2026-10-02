import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";
import "./scrollcraft.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.fullName} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "Aurum Coffee Roasters. Roasted in Trieste since 1962. Espresso blends, single origins, capsules, cold brew and barista equipment, sourced directly from 38 farms in 14 countries.",
  keywords: ["coffee", "roastery", "espresso", "single origin", "Trieste"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${cormorant.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("sc-js")`,
          }}
        />
      </head>
      <body className="grain min-h-full flex flex-col bg-ink text-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
