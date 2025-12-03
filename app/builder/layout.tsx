import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";

export const metadata: Metadata = {
    title: "Resume Canvas | Open Source Resume Builder",
    description:
        "Create and customize your resume with ease using Resume Canvas, the open-source resume builder.",
};

export default function BuilderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <Fragment>{children}</Fragment>;
}
