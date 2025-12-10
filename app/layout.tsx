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
  metadataBase: new URL("https://resumecanvas.site"),
  title: "Resume Canvas | Open Source Resume Builder",
  description:
    "Resume Canvas is a modern, open-source resume builder designed to be simple, fast, and privacy-focused. Build your professional resume in minutes with a real-time preview and export it as a high-quality PDF.",
  keywords: [
    "resume builder",
    "cv maker",
    "open source resume",
    "free resume template",
    "professional resume",
    "customizable resume",
    "resume editor",
    "career tools",
    "job application",
    "resume canvas",
    "pdf resume",
    "nextjs resume builder",
    "react resume builder",
    "tailwindcss resume",
    "developer resume",
    "designer resume",
    "modern resume",
    "easy resume builder",
    "online resume creator",
    "resume templates",
    "resume formatting",
    "resume writing",
    "resume tips",
  ],
  authors: [{ name: "Resume Canvas", url: "https://resumecanvas.site" }],
  openGraph: {
    title: "Resume Canvas | Open Source Resume Builder",
    description:
      "Create and customize your resume with ease using Resume Canvas, the open-source resume builder.",
    url: "https://resumecanvas.site",
    siteName: "Resume Canvas",
    images: [
      {
        url: "https://resumecanvas.site/og-image.png",
        width: 1200,
        height: 630,
        alt: "Resume Canvas Open Source Resume Builder",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Canvas | Open Source Resume Builder",
    description:
      "Create and customize your resume with ease using Resume Canvas, the open-source resume builder.",
    images: ["https://resumecanvas.site/og-image.png"],
  },
  creator: "Md Mostafijur Rahman",
  publisher: "Resume Canvas",
  alternates: {
    canonical: "https://resumecanvas.site",
  },
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
