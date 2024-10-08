import "./globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { LTR } from "./fonts.js";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata = {
  title: {
    default: "TCart - Travel the world",
    template: "%s | TCart",
  },
  description: "Travel the world with TCart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={LTR.className}>
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  );
}
