import type { Metadata } from "next";
import { Fragment } from "react/jsx-runtime";

export const metadata: Metadata = {
    metadataBase: new URL("https://resumecanvas.site/builder"),
    title: "Resume Canvas | Open Source Resume Builder | Build Your Resume Fast | Free Open Source Resume Builder",
    description:
        "Resume Canvas is a modern, open-source resume builder designed to be simple, fast, and privacy-focused. Build your professional resume in minutes with a real-time preview and export it as a high-quality PDF. Unlike other resume builders, Resume Canvas runs entirely in your browser. Your data never leaves your device unless you choose to share it. No sign-ups, no paywalls, no tracking.",
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
        "modern resume design",
        "resume generator",
        "resume export",
        "modern resume builder",
    ],
    authors: [{name: "Resume Canvas", url: "https://resumecanvas.site"}],
    openGraph: {
        title: "Resume Canvas | Open Source Resume Builder | Build Your Resume Fast | Free Open Source Resume Builder",
        description:
            "Resume Canvas is a modern, open-source resume builder designed to be simple, fast, and privacy-focused. Build your professional resume in minutes with a real-time preview and export it as a high-quality PDF. Unlike other resume builders, Resume Canvas runs entirely in your browser. Your data never leaves your device unless you choose to share it. No sign-ups, no paywalls, no tracking.",
        url: "https://resumecanvas.site/builder",
        siteName: "Resume Canvas - Free Open Source Resume Builder",
        images: [
            {
                url: "https://resumecanvas.site/og-image.png",
                width: 1200,
                height: 630,
                alt: "Resume Canvas - Free Open Source Resume Builder",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Resume Canvas - Free Open Source Resume Builder",
        description:
            "Resume Canvas is a modern, open-source resume builder designed to be simple, fast, and privacy-focused. Build your professional resume in minutes with a real-time preview and export it as a high-quality PDF. Unlike other resume builders, Resume Canvas runs entirely in your browser. Your data never leaves your device unless you choose to share it. No sign-ups, no paywalls, no tracking.",
        images: ["https://resumecanvas.site/og-image.png"],
    },
    creator: "Md Mostafijur Rahman",
    publisher: "Resume Canvas",
    alternates: {
        canonical: "https://resumecanvas.site/builder",
    },
};

export default function BuilderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Fragment>{children}</Fragment>;
}
