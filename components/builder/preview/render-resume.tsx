import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
    Link,
    Svg,
    Path,
    Circle,
    Polyline,
    Line,
    Rect,
    Polygon,
    Ellipse,
} from "@react-pdf/renderer";
import { ResumeData, ResumeSettings } from "@/lib/types";
import { darkenColor } from "@/lib/utils";
import { pdfIconPack } from "@/lib/pdf-icons";

// Register Khand font
Font.register({
    family: "Khand",
    fonts: [
        {
            src: "/fonts/Khand-Regular.ttf",
            fontWeight: 400,
        },
        {
            src: "/fonts/Khand-Medium.ttf",
            fontWeight: 500,
        },
        {
            src: "/fonts/Khand-SemiBold.ttf",
            fontWeight: 600,
        },
        {
            src: "/fonts/Khand-Bold.ttf",
            fontWeight: 700,
        },
    ],
});

Font.register({
    family: "Inter",
    fonts: [
        {
            src: "/fonts/Inter.ttf",
            fontWeight: 400,
        },
        {
            src: "/fonts/Inter.ttf",
            fontWeight: 500,
        },
        {
            src: "/fonts/Inter.ttf",
            fontWeight: 600,
        },
        {
            src: "/fonts/Inter.ttf",
            fontWeight: 700,
        },
    ],
});



const PdfIcon = ({
    name,
    size = 12,
    color = "#3e3e3e",
    style,
    fill = "none",
}: {
    name: string;
    size?: number;
    color?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    style?: any;
    fill?: string;
}) => {
    let iconNodes = pdfIconPack[name];

    if (!iconNodes) {
        // Try case-insensitive match
        const key = Object.keys(pdfIconPack).find(
            (k) => k.toLowerCase() === name.toLowerCase(),
        );
        if (key) {
            iconNodes = pdfIconPack[key];
        }
    }

    // Fallback to Globe if still not found
    if (!iconNodes) iconNodes = pdfIconPack["Globe"];

    if (!iconNodes) return null;

    return (
        <Svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={style}
        >
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {iconNodes.map((node: any, index: number) => {
                const [tag, attrs] = node;

                const Component = {
                    path: Path,
                    circle: Circle,
                    line: Line,
                    polyline: Polyline,
                    rect: Rect,
                    polygon: Polygon,
                    ellipse: Ellipse,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                }[tag as string] as any;

                if (!Component) return null;

                const { key: _ignoredKey, ...safeAttrs } = attrs || {};

                return <Component key={index} {...safeAttrs} fill={fill} />;
            })}
        </Svg>
    );
};

const getBulletIcon = (style: string) => {
    switch (style) {
        case "Circle":
            return <PdfIcon name="Circle" size={4} color="#656565" />;
        case "Square":
            return <PdfIcon name="Square" size={5} color="#656565" fill="#656565" />;
        case "Check":
            return <PdfIcon name="Check" size={12} color="#656565" fill="#656565" />;
        case "ArrowRight":
            return <PdfIcon name="ArrowRight" size={8} color="#656565" />;
        case "ChevronRight":
            return <PdfIcon name="ChevronRight" size={12} color="#656565" />;
        case "Diamond":
            return <PdfIcon name="Diamond" size={6} color="#656565" fill="#656565" />;
        case "Star":
            return <PdfIcon name="Star" size={6} color="#656565" fill="#656565" />;
        case "Minus":
            return <PdfIcon name="Minus" size={12} color="#656565" fill="#656565" />;
        case "default":
        default:
            return <PdfIcon name="Dot" size={8} color="#656565" fill="#656565" />;
    }
};

export const RenderResume = ({
    resumeData,
    settings,
}: {
    resumeData: ResumeData;
    settings: ResumeSettings;
}) => {
    const isLetter = settings.documentSize === "Letter";
    const styles = StyleSheet.create({
        page: {
            flexDirection: "row",
            backgroundColor: "#ffffff",
            fontFamily: settings.fontFamily || "Inter",
        },
        leftColumn: {
            width: "65%",
            paddingLeft: 20,
            paddingTop: 12,
            paddingRight: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
        },
        rightColumn: {
            width: "35%",
            paddingLeft: 12,
            paddingTop: 16,
            paddingRight: 12,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            color: "#ffffff",
            minHeight: "100%",
        },
        header: {
            marginBottom: 0,
        },
        name: {
            fontSize: 24,
            textTransform: "uppercase",
            color: "#3e3e3e",
            fontWeight: 500,
            letterSpacing: 0,
            padding: 0,
            lineHeight: 1.2,
        },
        title: {
            fontSize: 12,
            color: "#008cff",
            fontWeight: 500,
            marginBottom: 2,
            marginTop: 0,
        },
        contactInfo: {
            flexDirection: "row",
            flexWrap: "wrap",
            columnGap: 8,
            fontSize: 10,
            color: "#3e3e3e",
        },
        contactItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
        },
        section: {
            marginBottom: 0,
        },
        sectionTitle: {
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 4,
            color: "#3e3e3e",
            borderBottomWidth: 1,
            borderBottomColor: "#e5e7eb",
            paddingBottom: 4,
            fontWeight: 500,
        },
        sectionTitleRight: {
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: 1,
            marginBottom: 6,
            color: "rgba(255,255,255,0.9)",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E5E5",
            paddingBottom: 0,
            fontWeight: 500,
        },
        text: {
            fontSize: 10,
            color: "#3e3e3e",
            lineHeight: 1.5,
            textAlign: "justify",
        },
        textRight: {
            fontSize: 8,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.5,
        },
        experienceItem: {
            paddingLeft: 12,
            marginTop: 4,
            borderLeftWidth: 2,
            borderLeftColor: "#e5e7eb",
            marginLeft: 4,
            position: "relative",
            marginBottom: 12,
        },
        experienceDot: {
            position: "absolute",
            left: -5,
            top: 6,
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: "#d1d5db",
        },
        jobHeader: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 0,
        },
        jobTitle: {
            fontSize: 12,
            color: "#3e3e3e",
            fontWeight: 500,
        },
        date: {
            fontSize: 10,
            color: "#3e3e3e",
            fontWeight: 500,
        },
        company: {
            fontSize: 10,
            color: "#008cff",
            fontWeight: 500,
            marginBottom: 0,
        },
        educationItem: {
            borderBottomWidth: 1,
            borderBottomColor: "#f3f4f6",
            paddingBottom: 4,
            marginBottom: 4,
        },
        photoContainer: {
            alignItems: "center",
            marginBottom: 8,
        },
        photo: {
            width: 75,
            height: 75,
            borderRadius: 48,
            borderWidth: 3,
            border: "3px solid #ffffff",
            borderColor: "#ffffff",
            objectFit: "cover",
        },
        skillBadge: {
            backgroundColor: "rgba(255,255,255,0.2)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 6,
            fontSize: 9,
            color: "#ffffff",
            fontWeight: 500,
        },
        skillsContainer: {
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 4,
        },
        socialItem: {
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
        },
        socialIconBox: {
            backgroundColor: "rgba(255,255,255,0.2)",
            padding: 6,
            borderRadius: 6,
            height: 24,
            width: 24,
        },
        languageItem: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 2,
            fontSize: 10,
        },
        progressBar: {
            flexDirection: "row",
            gap: 4,
        },
        progressDot: {
            width: 4,
            height: 12,
            borderRadius: 2,
        },
        link: {
            textDecoration: "none",
            color: "#3e3e3e",
            fontSize: 10,
        },
    });
    return (
        <Document author="Resume Canvas" producer="Resume Canvas">
            <Page
                size={isLetter ? "LETTER" : "A4"}
                style={styles.page}
                orientation="portrait"
            >
                {/* Left Column */}
                <View style={styles.leftColumn}>
                    {/* Header */}
                    <View
                        style={[
                            styles.header,
                            { borderLeftWidth: 0, borderLeftColor: settings.themeColor },
                        ]}
                    >
                        <Text style={styles.name}>{resumeData.personalInfo.fullName}</Text>
                        <Text style={styles.title}>{resumeData.personalInfo.title}</Text>

                        <View style={styles.contactInfo}>
                            {resumeData.personalInfo.phone && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="Phone" size={10} color="#3e3e3e" />
                                    <Text>{resumeData.personalInfo.phone}</Text>
                                </View>
                            )}
                            {resumeData.personalInfo.email && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="Mail" size={10} color="#3e3e3e" />
                                    <Text>{resumeData.personalInfo.email}</Text>
                                </View>
                            )}
                            {resumeData.personalInfo.location && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="MapPin" size={10} color="#3e3e3e" />
                                    <Text>{resumeData.personalInfo.location}</Text>
                                </View>
                            )}

                            {resumeData.personalInfo.website && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="Globe" size={10} color="#3e3e3e" />
                                    <Link
                                        src={resumeData.personalInfo.website}
                                        style={styles.link}
                                    >
                                        <Text>{resumeData.personalInfo.website}</Text>
                                    </Link>
                                </View>
                            )}
                            {resumeData.personalInfo.linkedin && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="Linkedin" size={10} color="#3e3e3e" />
                                    <Link
                                        src={resumeData.personalInfo.linkedin}
                                        style={styles.link}
                                    >
                                        <Text>{resumeData.personalInfo.linkedin}</Text>
                                    </Link>
                                </View>
                            )}
                            {resumeData.personalInfo.twitter && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="Twitter" size={10} color="#3e3e3e" />
                                    <Link
                                        src={resumeData.personalInfo.twitter}
                                        style={styles.link}
                                    >
                                        <Text>{resumeData.personalInfo.twitter}</Text>
                                    </Link>
                                </View>
                            )}
                            {resumeData.personalInfo.github && (
                                <View style={styles.contactItem}>
                                    <PdfIcon name="Github" size={10} color="#3e3e3e" />
                                    <Link
                                        src={resumeData.personalInfo.github}
                                        style={styles.link}
                                    >
                                        <Text>{resumeData.personalInfo.github}</Text>
                                    </Link>
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Summary */}
                    {resumeData.personalInfo.summary && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Summary</Text>
                            <Text style={styles.text}>{resumeData.personalInfo.summary}</Text>
                        </View>
                    )}

                    {/* Experience */}
                    {resumeData.experience.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Work Experience</Text>
                            {resumeData.experience.map((exp) => (
                                <View key={exp.id} style={styles.experienceItem}>
                                    {/* Dot */}
                                    <View style={styles.experienceDot} />
                                    <View style={styles.jobHeader}>
                                        <Text style={styles.jobTitle}>{exp.title}</Text>
                                        <Text style={styles.date}>
                                            {exp.startDate} / {exp.current ? "Present" : exp.endDate}
                                        </Text>
                                    </View>
                                    <Text style={styles.company}>
                                        {exp.company} • {exp.location}
                                    </Text>
                                    {exp.description && exp.bulletStyle && exp.bulletStyle !== "none" ? (
                                        exp.description
                                            .split("\n")
                                            .filter((i) => i.trim().length > 0)
                                            .map((item, index) => (
                                                <View
                                                    key={index}
                                                    style={{
                                                        flexDirection: "row",
                                                        marginBottom: 0,
                                                        paddingLeft: 0,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <View style={{ marginRight: 6 }}>
                                                        {getBulletIcon(exp.bulletStyle || "Dot")}
                                                    </View>

                                                    <Text style={{ flex: 1, fontSize: 10, color: "#3e3e3e" }}>
                                                        {item}
                                                    </Text>
                                                </View>
                                            ))
                                    ) : null}

                                </View>
                            ))}
                        </View>
                    )}

                    {/* Education */}
                    {resumeData.education.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Education</Text>
                            {resumeData.education.map((edu) => (
                                <View key={edu.id} style={{
                                    borderBottomWidth: resumeData.education.indexOf(edu) !== resumeData.education.length - 1 ? 1 : 0,
                                    borderBottomColor: "#f3f4f6",
                                    paddingBottom: 4,
                                    marginBottom: 4,
                                }}>
                                    <View style={styles.jobHeader}>
                                        <Text style={styles.jobTitle}>{edu.degree}</Text>
                                        <Text style={styles.date}>
                                            {edu.startDate} / {edu.current ? "Present" : edu.endDate}
                                        </Text>
                                    </View>
                                    <Text style={styles.company}>
                                        {edu.school}, {edu.location}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Projects */}
                    {resumeData.projects.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Projects</Text>
                            {resumeData.projects.map((project) => (
                                <View key={project.id} style={{
                                    marginBottom: 4,
                                    borderBottomWidth: resumeData.projects.indexOf(project) !== resumeData.projects.length - 1 ? 1 : 0,
                                    borderBottomColor: "#f3f4f6",
                                    paddingBottom: 4,
                                }}>
                                    <View style={styles.jobHeader}>
                                        <Text style={styles.jobTitle}>{project.name}</Text>
                                        <Text style={styles.date}>{project.date}</Text>
                                    </View>
                                    {project.link && (
                                        <Link src={project.link} style={{ textDecoration: "none" }}>
                                            <Text
                                                style={{
                                                    fontSize: 10,
                                                    color: "#008cff",
                                                    marginBottom: 2,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {project.link}
                                            </Text>
                                        </Link>
                                    )}
                                    <Text style={styles.text}>{project.description}</Text>
                                </View>
                            ))}
                        </View>
                    )}
                </View>

                {/* Right Column */}
                <View
                    style={[
                        styles.rightColumn,
                        { backgroundColor: settings.themeColor },
                    ]}
                >
                    {/* Top Bar */}
                    <View
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: 10,
                            backgroundColor: darkenColor(settings.themeColor, 0.7),
                        }}
                    />

                    {/* Photo */}
                    <View style={styles.photoContainer}>
                        {resumeData.personalInfo.photoUrl && (
                            // eslint-disable-next-line jsx-a11y/alt-text
                            <Image
                                src={resumeData.personalInfo.photoUrl}
                                style={styles.photo}
                            />
                        )}
                    </View>

                    {/* Strengths */}
                    {resumeData.strengths.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleRight}>Strengths</Text>
                            {resumeData.strengths.map((strength) => (
                                <View
                                    key={strength.id}
                                    style={{ flexDirection: "row", gap: 6, marginBottom: 4 }}
                                >
                                    {strength.icon && (
                                        <View style={styles.socialIconBox}>
                                            <PdfIcon
                                                name={strength.icon}
                                                size={12}
                                                color="#ffffff"
                                            />
                                        </View>
                                    )}
                                    <View style={{ flex: 1 }}>
                                        <Text
                                            style={{
                                                fontSize: 10,
                                                color: "#ffffff",
                                                fontWeight: 600,
                                                marginBottom: 2,
                                            }}
                                        >
                                            {strength.title}
                                        </Text>
                                        <Text style={{
                                            fontSize: 9,
                                            color: "rgba(255,255,255,0.8)",
                                            lineHeight: 1.2,
                                        }}>
                                            {strength.description}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Skills */}
                    {resumeData.skills.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleRight}>Skills</Text>
                            <View style={styles.skillsContainer}>
                                {resumeData.skills.map((skill) => (
                                    <Text key={skill.id} style={styles.skillBadge}>
                                        {skill.name}
                                    </Text>
                                ))}
                            </View>
                        </View>
                    )}

                    {/* Find Me Online */}
                    {resumeData.socials.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleRight}>Find Me Online</Text>
                            {resumeData.socials.map((social) => (
                                <Link
                                    key={social.id}
                                    src={social.url}
                                    style={{ textDecoration: "none" }}
                                >
                                    <View style={styles.socialItem}>
                                        <View style={styles.socialIconBox}>
                                            <PdfIcon
                                                name={social.icon || social.platform}
                                                size={12}
                                                color="#ffffff"
                                            />
                                        </View>
                                        <View>
                                            <Text
                                                style={{
                                                    fontSize: 9,
                                                    color: "#ffffff",
                                                    fontWeight: 500,
                                                    lineHeight: 1.2,
                                                }}
                                            >
                                                {social.platform}
                                            </Text>
                                            <Text
                                                style={{
                                                    fontSize: 8,
                                                    color: "rgba(255,255,255,0.8)",
                                                }}
                                            >
                                                {social.username || "Link"}
                                            </Text>
                                        </View>
                                    </View>
                                </Link>
                            ))}
                        </View>
                    )}

                    {/* Languages */}
                    {resumeData.languages.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleRight}>Languages</Text>
                            {resumeData.languages.map((lang) => (
                                <View key={lang.id} style={styles.languageItem}>
                                    <View>
                                        <Text
                                            style={{
                                                fontSize: 9,
                                                color: "#ffffff",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {lang.name}
                                        </Text>
                                        <Text
                                            style={{
                                                fontSize: 8,
                                                color: "rgba(255,255,255,0.7)",
                                            }}
                                        >
                                            {lang.proficiency}
                                        </Text>
                                    </View>
                                    <View style={styles.progressBar}>
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
                                                <View
                                                    key={i}
                                                    style={[
                                                        styles.progressDot,
                                                        {
                                                            backgroundColor:
                                                                i <= level
                                                                    ? "#ffffff"
                                                                    : "rgba(255,255,255,0.2)",
                                                        },
                                                    ]}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Certifications */}
                    {resumeData.certifications.length > 0 && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitleRight}>Certification</Text>
                            {resumeData.certifications.map((cert) => (
                                <View key={cert.id} style={{ marginBottom: 12 }}>
                                    <Text
                                        style={{
                                            fontSize: 9,
                                            color: "#ffffff",
                                            fontWeight: 500,
                                            marginBottom: 2,
                                        }}
                                    >
                                        {cert.name}
                                    </Text>

                                    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                                        <Text
                                            style={{
                                                fontSize: 9,
                                                color: "rgba(255,255,255,0.8)",
                                            }}
                                        >
                                            {cert.issuer}
                                        </Text>

                                        <Link src={cert.link} style={styles.link}>
                                            <PdfIcon name="ExternalLink" size={8} color="#f7f7f7" />
                                        </Link>
                                    </View>

                                    {cert.description && (
                                        <Text
                                            style={{
                                                fontSize: 9,
                                                color: "rgba(255,255,255,0.7)",
                                                marginTop: 4,
                                                lineHeight: 1.4,
                                            }}
                                        >
                                            {cert.description}
                                        </Text>
                                    )}
                                </View>
                            ))}
                        </View>
                    )}
                </View>
            </Page>
        </Document >
    );
};
