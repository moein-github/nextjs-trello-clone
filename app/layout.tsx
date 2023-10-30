import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trello 2.0 Clone",
  description:
    "A modern Trello clone for efficient project management and collaboration.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F5F6F8]">{children}</body>
    </html>
  );
}
