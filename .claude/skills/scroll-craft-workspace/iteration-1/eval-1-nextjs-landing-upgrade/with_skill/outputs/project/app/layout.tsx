import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import "./scrollcraft.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tilt · A pour-over scale that remembers the cup you liked.",
  description:
    "Tilt weighs, times and logs every brew, then plays it back so the next one tastes the same.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} antialiased`} suppressHydrationWarning>
      <head>
        {/* scrollcraft.css hides cued copy only under html.sc-js. Add the class
            synchronously so the hidden state exists from the first paint; a
            visitor without JavaScript never gets it and sees everything. */}
        <script
          dangerouslySetInnerHTML={{ __html: `document.documentElement.classList.add("sc-js")` }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
