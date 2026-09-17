import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kero",
  description: "Send and receive across borders.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
