import ThemeProvider from "@/providers/theme-provider";
import type { Metadata } from "next";
import { Khand } from "next/font/google";
import "./globals.css";

const khand = Khand({
  variable: "--font-khand",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Resume Canvas | Open Source Resume Builder",
  description:
    "Create and customize your resume with ease using Resume Canvas, the open-source resume builder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${khand.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
