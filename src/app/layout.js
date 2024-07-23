import "./globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LTR } from "./fonts.js";

export const metadata = {
  title: "TCart",
  description: "Travel the world with TCart",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={LTR.className}>{children}</body>
    </html>
  );
}
