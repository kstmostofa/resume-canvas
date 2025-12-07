"use client";

import { useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
    Download,
    Printer,
    Phone,
    Mail,
    MapPin,
    Globe,
    ExternalLink,
    User,
    Linkedin,
    Twitter,
    Circle,
    Square,
    Check,
    ArrowRight,
    ChevronRight,
    Diamond,
    Star,
    Minus,
    Moon,
    Sun,
    Dot,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { getIconComponent } from "@/lib/icons";
import Image from "next/image";
import { darkenColor } from "@/lib/utils";
import { Social } from "@/lib/types";
import { RenderResume } from "./render-resume";
import { PDFViewer } from "@react-pdf/renderer";

export function ResumePreview() {
    const { resumeData, settings } = useResumeStore();
    const { theme, setTheme } = useTheme();
    const contentRef = useRef<HTMLDivElement>(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [showPdf, setShowPdf] = useState(false);

    const handlePrint = async () => {
        setIsDownloading(true);
        try {
            const { pdf } = await import("@react-pdf/renderer");
            const blob = await pdf(
                <RenderResume resumeData={resumeData} settings={settings} />,
            ).toBlob();
            const url = URL.createObjectURL(blob);

            const iframe = document.createElement("iframe");
            iframe.style.display = "none";
            iframe.src = url;
            document.body.appendChild(iframe);

            iframe.onload = () => {
                setTimeout(() => {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                }, 100);
            };
        } catch (error) {
            console.error("Print failed:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const handleDownloadPdf = async () => {
        setIsDownloading(true);
        setDownloadProgress(0);

        try {
            setDownloadProgress(10);
            // Dynamically import pdf function to avoid SSR issues
            const { pdf } = await import("@react-pdf/renderer");

            setDownloadProgress(30);
            const blob = await pdf(
                <RenderResume resumeData={resumeData} settings={settings} />,
            ).toBlob();

            setDownloadProgress(80);
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, "_")}_Resume.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setDownloadProgress(100);
            // Wait a bit to show completion
            await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
            console.error("PDF generation failed", error);
        } finally {
            setIsDownloading(false);
            setTimeout(() => setDownloadProgress(0), 200);
        }
    };

    const getPageDimensions = () => {
        if (settings.documentSize === "Letter") {
            return { width: "215.9mm", minHeight: "279.4mm" };
        }
        return { width: "210mm", minHeight: "297mm" }; // A4 default
    };

    const { width, minHeight } = getPageDimensions();

    const fontSizeClass = {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
        xl: "text-xl",
    }[settings.fontSize || "md"];

    const getSocialIcon = (social: Social) => {
        const iconName = social.icon || social.platform;
        const Icon = getIconComponent(iconName);
        return Icon ? <Icon className="w-4 h-4" /> : <Globe className="w-4 h-4" />;
    };

    const getBulletIcon = (style: string) => {
        switch (style) {
            case "Circle":
                return <Circle className="w-1.5 h-1.5" />; // Hollow circle
            case "Square":
                return <Square className="w-1.5 h-1.5 fill-current" />; // Filled square
            case "Check":
                return <Check className="w-3 h-3" />;
            case "ArrowRight":
                return <ArrowRight className="w-3 h-3" />;
            case "ChevronRight":
                return <ChevronRight className="w-3 h-3" />;
            case "Diamond":
                return <Diamond className="w-2 h-2 fill-current" />;
            case "Star":
                return <Star className="w-2.5 h-2.5 fill-current" />;
            case "Minus":
                return <Minus className="w-3 h-3" />;
            case "default":
            default:
                return <Dot className="w-1.5 h-1.5 fill-current" />;
        }
    };

    const renderDescription = (description: string, bulletStyle?: string) => {
        if (!description) return null;

        // If no bullet style or 'none', render as before (whitespace-pre-line)
        if (!bulletStyle || bulletStyle === "none") {
            return (
                <p className="text-[#3e3e3e] text-[12px] whitespace-pre-line leading-relaxed">
                    {description}
                </p>
            );
        }

        // Split by newline
        const items = description
            .split("\n")
            .filter((item) => item.trim().length > 0);

        return (
            <ul className="space-y-0.5 mt-1">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="text-[#3e3e3e] text-[12px] leading-relaxed flex items-start gap-1"
                    >
                        <span className="shrink-0 w-3 h-[1.625em] flex items-center justify-center text-[#3e3e3e] opacity-80">
                            {getBulletIcon(bulletStyle)}
                        </span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div className="h-full flex flex-col bg-muted relative">
            {isDownloading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 min-w-[300px] border border-border">
                        <div className="relative">
                            <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin" />
                            <Download className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <div className="text-center w-full">
                            <h3 className="text-lg font-bold">Generating PDF</h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                This may take a moment...
                            </p>
                            <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-primary h-2.5 rounded-full transition-[width] duration-300 ease-out"
                                    style={{ width: `${downloadProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                                {downloadProgress}%
                            </p>
                        </div>
                    </div>
                </div>
            )}
            <div className="p-4 border-b border-border flex justify-between items-center bg-card sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="bg-accent hidden md:flex"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowPdf(!showPdf)}
                    >
                        {showPdf ? "Hide PDF Preview" : "Show PDF Preview"}
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handlePrint} className="font-bold">
                        <Printer className="h-4 w-4" />
                        Print
                    </Button>
                    <Button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="text-white font-bold"
                    >
                        <Download className=" h-4 w-4" />
                        {isDownloading ? "Generating..." : "Download PDF"}
                    </Button>
                </div>
            </div>
            <div className="border bg-orange-100 border-orange-200 p-4 mt-4 mx-4 rounded-lg block md:hidden">
                <h4 className="text-md text-center font-medium text-orange-800">
                    For Mobile device,
                    <span className="font-bold px-1">Rotate Your Device</span>
                    to view the actual preview!
                </h4>
            </div>

            <div className="flex-1 overflow-auto p-4 sm:p-8 flex justify-center">
                {showPdf ? (
                    <div className="h-full w-full shadow-2xl">
                        <PDFViewer className="w-full h-full" showToolbar={true}>
                            <RenderResume resumeData={resumeData} settings={settings} />
                        </PDFViewer>
                    </div>
                ) : (
                    <div
                        ref={contentRef}
                        className={`bg-[#ffffff] origin-top scale-90 sm:scale-100 transition-transform print-content ${fontSizeClass} print:shadow-none print:scale-100 print:origin-top flex flex-col overflow-hidden`}
                        style={{
                            fontFamily: settings.fontFamily,
                            width,
                            minHeight,
                            color: "#333",
                            boxShadow:
                                "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                    >
                        <div className="flex flex-row flex-1">
                            {/* Left Column - Main Content */}
                            <div className="w-[65%] p-6 pr-5 flex flex-col gap-4">
                                {/* Header */}
                                <header
                                    className=""
                                    style={{ borderColor: settings.themeColor }}
                                >
                                    <h1
                                        className="text-[28px] uppercase tracking-wider"
                                        style={{
                                            color: "#3e3e3e",
                                            fontWeight: "600",
                                        }}
                                    >
                                        {resumeData.personalInfo.fullName}
                                    </h1>
                                    <p
                                        className="mb-2"
                                        // style={{ color: settings.themeColor }}
                                        style={{
                                            color: "#008cff",
                                            fontSize: "16px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        {resumeData.personalInfo.title}
                                    </p>

                                    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-[#3e3e3e]">
                                        {resumeData.personalInfo.phone && (
                                            <div className="flex items-center gap-1">
                                                <Phone className="w-3 h-3" />
                                                <span>{resumeData.personalInfo.phone}</span>
                                            </div>
                                        )}
                                        {resumeData.personalInfo.email && (
                                            <div className="flex items-center gap-1">
                                                <Mail className="w-3 h-3" />
                                                <span>{resumeData.personalInfo.email}</span>
                                            </div>
                                        )}
                                        {resumeData.personalInfo.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                <span>{resumeData.personalInfo.location}</span>
                                            </div>
                                        )}
                                        {resumeData.personalInfo.website && (
                                            <div className="flex items-center gap-1">
                                                <Globe className="w-3 h-3" />
                                                <a
                                                    href={resumeData.personalInfo.website}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {resumeData.personalInfo.website}
                                                </a>
                                            </div>
                                        )}
                                        {resumeData.personalInfo.linkedin && (
                                            <div className="flex items-center gap-1">
                                                <Linkedin className="w-3 h-3" />
                                                <a
                                                    href={resumeData.personalInfo.linkedin}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {resumeData.personalInfo.linkedin}
                                                </a>
                                            </div>
                                        )}
                                        {resumeData.personalInfo.twitter && (
                                            <div className="flex items-center gap-1">
                                                <Twitter className="w-3 h-3" />
                                                <a
                                                    href={resumeData.personalInfo.twitter}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="hover:underline"
                                                >
                                                    {resumeData.personalInfo.twitter}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </header>

                                {/* Summary */}
                                {resumeData.personalInfo.summary && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-2 text-[#3e3e3e] border-b border-[#e5e7eb]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Summary
                                        </h2>
                                        <p className="text-[#3e3e3e] leading-relaxed text-[12px] text-justify">
                                            {resumeData.personalInfo.summary}
                                        </p>
                                    </section>
                                )}

                                {/* Experience */}
                                {resumeData.experience.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-2 text-[#3e3e3e] border-b border-[#e5e7eb]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Work Experience
                                        </h2>
                                        <div className="space-y-4">
                                            {resumeData.experience.map((exp) => (
                                                <div
                                                    key={exp.id}
                                                    className="relative border-l-2 border-[#e5e7eb] pl-3 ml-1"
                                                >
                                                    <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-[#d1d5db]" />
                                                    <div className="flex justify-between items-baseline mb-0.5">
                                                        <h3
                                                            className="text-[#3e3e3e] text-sm"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {exp.title}
                                                        </h3>
                                                        <span className="text-[10px] font-medium text-[#3e3e3e] whitespace-nowrap ml-2">
                                                            {exp.startDate} /{" "}
                                                            {exp.current ? "Present" : exp.endDate}
                                                        </span>
                                                    </div>
                                                    <div className="text-[12px] font-medium mb-1 text-[#008cff]">
                                                        {exp.company} • {exp.location}
                                                    </div>
                                                    {renderDescription(exp.description, exp.bulletStyle)}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Education */}
                                {resumeData.education.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-2 text-[#3e3e3e] border-b border-[#e5e7eb]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Education
                                        </h2>
                                        <div className="space-y-3">
                                            {resumeData.education.map((edu) => (
                                                <div
                                                    key={edu.id}
                                                    className="border-b border-[#f3f4f6] pb-2 last:border-0 last:pb-0"
                                                >
                                                    <div className="flex justify-between items-baseline mb-0.5">
                                                        <h3
                                                            className="text-[#3e3e3e] text-[14px]"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {edu.degree}
                                                        </h3>
                                                        <span className="text-[10px] font-medium text-[#3e3e3e] whitespace-nowrap ml-2">
                                                            {edu.startDate} /{" "}
                                                            {edu.current ? "Present" : edu.endDate}
                                                        </span>
                                                    </div>
                                                    <div className="text-[12px] font-medium text-[#008cff]">
                                                        {edu.school}, {edu.location}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Projects */}
                                {resumeData.projects.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-2 text-[#3e3e3e] border-b border-[#e5e7eb]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Projects
                                        </h2>
                                        <div className="space-y-3">
                                            {resumeData.projects.map((project) => (
                                                <div key={project.id}>
                                                    <div className="flex justify-between items-baseline mb-0.5">
                                                        <h3
                                                            className="text-[#3e3e3e] text-sm flex items-center gap-2"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {project.name}
                                                            {project.link && (
                                                                <a
                                                                    href={project.link}
                                                                    target="_blank"
                                                                    rel="noreferrer"
                                                                    className="text-[#e5e7eb] hover:text-[#4b5563]"
                                                                >
                                                                    <ExternalLink className="w-3 h-3" />
                                                                </a>
                                                            )}
                                                        </h3>
                                                        <span className="text-[10px] font-medium text-[#3e3e3e] whitespace-nowrap ml-2">
                                                            {project.date}
                                                        </span>
                                                    </div>
                                                    {project.link && (
                                                        <a
                                                            href={project.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-[12px] block mb-1 hover:underline text-[#008cff] line-clamp-1"
                                                        >
                                                            {project.link}
                                                        </a>
                                                    )}
                                                    <p className="text-[#3e3e3e] text-[12px] whitespace-pre-line leading-relaxed">
                                                        {project.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>

                            {/* Right Column - Sidebar */}
                            <div
                                className="w-[35%] text-[#ffffff] p-6 flex flex-col gap-3 relative min-h-full h-full"
                                style={{ backgroundColor: settings.themeColor }}
                            >
                                {/* Profile Photo */}
                                <div
                                    className="absolute top-0 left-0 h-4 w-full"
                                    style={{
                                        background: darkenColor(settings.themeColor, 0.7),
                                    }}
                                />
                                <div className="flex justify-center">
                                    <div
                                        className="w-24 h-24 rounded-full mt-2 bg-[#e5e7eb] border-3 border-[#ffffff] overflow-hidden flex items-center justify-center"
                                        style={{
                                            boxShadow:
                                                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                        }}
                                    >
                                        {resumeData.personalInfo.photoUrl ? (
                                            <Image
                                                src={resumeData.personalInfo.photoUrl}
                                                alt={resumeData.personalInfo.fullName}
                                                className="w-full h-full object-cover"
                                                width={112}
                                                height={112}
                                            />
                                        ) : (
                                            <User className="w-24 h-24 text-[#9ca3af]" />
                                        )}
                                    </div>
                                </div>

                                {/* Strengths */}
                                {resumeData.strengths.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-3 border-b border-[rgba(255,255,255,0.2)] pb-1 text-[rgba(255,255,255,0.9)]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Strengths
                                        </h2>
                                        <div className="space-y-3">
                                            {resumeData.strengths.map((strength) => (
                                                <div key={strength.id} className="flex gap-2">
                                                    {(() => {
                                                        const Icon = strength.icon
                                                            ? getIconComponent(strength.icon)
                                                            : null;
                                                        return Icon ? (
                                                            <Icon className="size-7 text-[#ffffff] shrink-0 mt-0.5 bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md" />
                                                        ) : null;
                                                    })()}
                                                    <div>
                                                        <h3
                                                            className="text-[12px] mb-0.5 text-[#ffffff]"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {strength.title}
                                                        </h3>
                                                        <p className="text-[rgba(255,255,255,0.8)] text-[11px] leading-relaxed">
                                                            {strength.description}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Skills */}
                                {resumeData.skills.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-3 border-b border-[rgba(255,255,255,0.2)] pb-1 text-[rgba(255,255,255,0.9)]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Skills
                                        </h2>
                                        <div className="flex flex-wrap gap-2">
                                            {resumeData.skills.map((skill) => (
                                                <span
                                                    key={skill.id}
                                                    className="bg-[rgba(255,255,255,0.2)] px-2 py-1 rounded-md text-[12px] text-[#ffffff] font-semibold"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Find Me Online */}
                                {resumeData.socials.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-3 border-b border-[rgba(255,255,255,0.2)] pb-1 text-[rgba(255,255,255,0.9)]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Find Me Online
                                        </h2>
                                        <div className="space-y-2">
                                            {resumeData.socials.map((social) => (
                                                <a
                                                    key={social.id}
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="flex items-center gap-2 text-xs text-[rgba(255,255,255,0.9)] hover:text-[#ffffff] transition-colors group"
                                                >
                                                    <div className="bg-[rgba(255,255,255,0.2)] p-1.5 rounded-md group-hover:bg-[rgba(255,255,255,0.3)] transition-colors">
                                                        {getSocialIcon(social)}
                                                    </div>
                                                    <div>
                                                        <div
                                                            className="text-[#ffffff] text-[11px]"
                                                            style={{ fontWeight: "500" }}
                                                        >
                                                            {social.platform}
                                                        </div>
                                                        <div className="text-[10px] truncate max-w-[120px] opacity-80">
                                                            {social.username || "Link"}
                                                        </div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Languages */}
                                {resumeData.languages.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-3 border-b border-[rgba(255,255,255,0.2)] pb-1 text-[rgba(255,255,255,0.9)]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Languages
                                        </h2>
                                        <div className="space-y-2">
                                            {resumeData.languages.map((lang) => (
                                                <div
                                                    key={lang.id}
                                                    className="flex items-center justify-between text-xs"
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-[#ffffff]">
                                                            {lang.name}
                                                        </span>
                                                        <span className="text-[10px] text-[rgba(255,255,255,0.7)]">
                                                            {lang.proficiency}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-1">
                                                        {[1, 2, 3, 4, 5].map((i) => {
                                                            const level = lang.proficiency.includes("Native")
                                                                ? 5
                                                                : lang.proficiency.includes("Fluent")
                                                                    ? 4
                                                                    : lang.proficiency.includes("Proficient")
                                                                        ? 3
                                                                        : lang.proficiency.includes("Intermediate")
                                                                            ? 2
                                                                            : 1;
                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className={`w-1.25 h-4 rounded-sm ${i <= level ? "bg-[#ffffff]" : "bg-[rgba(255,255,255,0.2)]"}`}
                                                                />
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}

                                {/* Certifications */}
                                {resumeData.certifications.length > 0 && (
                                    <section>
                                        <h2
                                            className="text-[16px] uppercase tracking-wider mb-3 border-b border-[rgba(255,255,255,0.2)] pb-1 text-[rgba(255,255,255,0.9)]"
                                            style={{ fontWeight: "500" }}
                                        >
                                            Certification
                                        </h2>
                                        <div className="space-y-3">
                                            {resumeData.certifications.map((cert) => (
                                                <div key={cert.id}>
                                                    <h3
                                                        className="text-xs mb-0.5 text-[#ffffff]"
                                                        style={{ fontWeight: "500" }}
                                                    >
                                                        {cert.name}
                                                    </h3>
                                                    <p className="text-[rgba(255,255,255,0.8)] text-[12px]">
                                                        {cert.issuer}{" "}
                                                        <a
                                                            href={cert.link}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="underline hover:text-[#ffffff]"
                                                        >
                                                            <ExternalLink className="w-3 h-3 inline-block ml-1" />
                                                        </a>
                                                    </p>
                                                    {cert.description && (
                                                        <p className="text-[rgba(255,255,255,0.7)] text-[10px] mt-1 leading-relaxed">
                                                            {cert.description}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
