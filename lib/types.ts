export interface PersonalInfo {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    linkedin: string;
    github: string;
    twitter: string;
    summary: string;
    photoUrl?: string;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string; // HTML or Markdown or plain text with newlines
    bulletStyle?: string;
}

export interface Education {
    id: string;
    degree: string;
    school: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
}

export interface Project {
    id: string;
    name: string;
    link: string;
    date: string;
    description: string;
}

export interface Skill {
    id: string;
    name: string;
    level?: number; // 1-5 or similar
}

export interface Language {
    id: string;
    name: string;
    proficiency: "Native" | "Fluent" | "Proficient" | "Intermediate" | "Basic";
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
    date: string;
    link?: string;
    description?: string;
}

export interface Strength {
    id: string;
    title: string;
    description: string;
    icon?: string;
}

export interface Social {
    id: string;
    platform: string;
    url: string;
    username: string;
    icon?: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    experience: Experience[];
    education: Education[];
    projects: Project[];
    skills: Skill[];
    languages: Language[];
    certifications: Certification[];
    strengths: Strength[];
    socials: Social[];
}

export interface ResumeSettings {
    themeColor: string;
    fontFamily: string;
    fontSize: "sm" | "md" | "lg" | "xl";
    documentSize: "A4" | "Letter";
}
