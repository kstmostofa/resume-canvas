import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Source Resume Builder",
  description:
    "Create and customize your resume with ease using our open-source resume builder.",
};

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
