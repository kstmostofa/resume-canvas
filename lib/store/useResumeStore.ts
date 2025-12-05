import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ResumeData, ResumeSettings, PersonalInfo, Experience, Education, Project, Skill, Language, Certification, Strength, Social } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ResumeState {
    resumeData: ResumeData;
    settings: ResumeSettings;
    _hasHydrated: boolean;

    // Actions
    setHasHydrated: (state: boolean) => void;
    setPersonalInfo: (info: Partial<PersonalInfo>) => void;

    addExperience: (experience: Omit<Experience, 'id'>) => void;
    updateExperience: (id: string, experience: Partial<Experience>) => void;
    removeExperience: (id: string) => void;
    reorderExperience: (startIndex: number, endIndex: number) => void;

    addEducation: (education: Omit<Education, 'id'>) => void;
    updateEducation: (id: string, education: Partial<Education>) => void;
    removeEducation: (id: string) => void;
    reorderEducation: (startIndex: number, endIndex: number) => void;

    addProject: (project: Omit<Project, 'id'>) => void;
    updateProject: (id: string, project: Partial<Project>) => void;
    removeProject: (id: string) => void;

    addSkill: (skill: Omit<Skill, 'id'>) => void;
    updateSkill: (id: string, skill: Partial<Skill>) => void;
    removeSkill: (id: string) => void;

    addLanguage: (language: Omit<Language, 'id'>) => void;
    updateLanguage: (id: string, language: Partial<Language>) => void;
    removeLanguage: (id: string) => void;

    addCertification: (certification: Omit<Certification, 'id'>) => void;
    updateCertification: (id: string, certification: Partial<Certification>) => void;
    removeCertification: (id: string) => void;

    addStrength: (strength: Omit<Strength, 'id'>) => void;
    updateStrength: (id: string, strength: Partial<Strength>) => void;
    removeStrength: (id: string) => void;

    addSocial: (social: Omit<Social, 'id'>) => void;
    updateSocial: (id: string, social: Partial<Social>) => void;
    removeSocial: (id: string) => void;

    updateSettings: (settings: Partial<ResumeSettings>) => void;
    resetResume: () => void;
}

const initialResumeData: ResumeData = {
    personalInfo: {
        fullName: "MD MOSTAFIJUR RAHMAN",
        title: "Full Stack Software Engineer | Laravel • React • NextJs • AWS • Scalable Systems",
        email: "mostofa122@gmail.com",
        phone: "+8801755682652",
        location: "Dhaka",
        website: "",
        linkedin: "https://www.linkedin.com/in/mostofa-me/",
        github: "https://github.com/kstmostofa",
        twitter: "https://x.com/Mostofa_Me",
        summary: "Full-Stack Engineer with 5+ years of experience designing and delivering scalable, secure, and high-performing applications across Telecom, E-commerce, and SaaS industries. Specialized in Laravel, React, NextJs, Python, FastApi, and AWS with a proven track record of reducing system downtime by 30% and improving API response times by 40%. Passionate about problem-solving, DevOps, and building user-centric software.",
        photoUrl: "https://avatars.githubusercontent.com/u/15743182?v=4", // Placeholder
    },
    experience: [
        {
            id: "1",
            title: "Full Stack Software Engineer",
            company: "CleverStack Innovations Private Limited",
            location: "Bangalore, India",
            startDate: "2025-01",
            endDate: "",
            current: true,
            description: "• Improved Cleverstack Cloud Telephony Concureent call capacity by 40%.\n• Led a 4-member development team, mentoring and ensuring adherence to scalable architecture and security best practices.\n• Optimized and scaled call log report module database query below 500ms",
        },
        {
            id: "2",
            title: "Senior Software Engineer",
            company: "Technodreams Advanced System Private Limited",
            location: "Bangalore, India",
            startDate: "2022-01",
            endDate: "2024-12",
            current: false,
            description: "• Integrated WhatsApp API with CRM, boosting customer engagement by 35%.\n• Develop Dialer widget with CRM, user can make call directly from browser to their user.\n• Optimized Laravel backend, reducing response times by 40%.",
        }
    ],
    education: [
        {
            id: "1",
            degree: "BSC in CSE",
            school: "Bangladesh University",
            location: "Dhaka, Bangladesh",
            startDate: "2017-06",
            endDate: "2021-12",
            current: false,
        },
        {
            id: "2",
            degree: "Diploma In Computer Technology",
            school: "Kushtia Polytechnic Institute",
            location: "Kushtia, Bangladesh",
            startDate: "2010-02",
            endDate: "2014-12",
            current: false,
        }
    ],
    projects: [
        {
            id: "1",
            name: "Techverse Daily Blog Website",
            link: "https://techversedaily.com",
            date: "2025",
            description: "Laravel and Inertia React as Backend And NextJs App Router and Tailwind css as frontend",
        },
        {
            id: "2",
            name: "Laravel SMPP Library",
            link: "https://github.com/kstmostofa/laravel-smpp",
            date: "2025",
            description: "A Laravel package for sending SMS using the SMPP protocol, built on top of the PHP-SMPP library. This package provides a simple and efficient way to integrate SMS functionality into your Laravel applications.",
        }
    ],
    skills: [
        { id: "1", name: "Laravel" },
        { id: "2", name: "PHP" },
        { id: "3", name: "ReactJS" },
        { id: "4", name: "NextJS" },
        { id: "5", name: "VueJS" },
        { id: "6", name: "Python" },
        { id: "7", name: "AWS" },
        { id: "8", name: "PostgreSQL" },
        { id: "9", name: "MySQL" },
        { id: "10", name: "TailwindCSS" },
        { id: "11", name: "HTML" },
        { id: "12", name: "AI" },
        { id: "13", name: "DevOps" },
    ],
    languages: [
        { id: "1", name: "English", proficiency: "Proficient" },
        { id: "2", name: "Bengali", proficiency: "Native" },
        { id: "3", name: "Hindi", proficiency: "Proficient" },
    ],
    certifications: [
        {
            id: "1",
            name: "Google Analytics Individual Qualification",
            issuer: "Google",
            date: "",
            link: "",
        }
    ],
    strengths: [
        {
            id: "1",
            title: "Team Collaboration",
            description: "Experienced in collaborating with cross-functional teams to deliver scalable and secure software solutions. Strong advocate of agile practices, promoting open communication and coordination to meet project goals efficiently.",
        },
        {
            id: "2",
            title: "Quality Assurance",
            description: "Proficient in implementing and maintaining rigorous quality assurance processes to ensure the delivery of high-quality, bug-free software.",
        }
    ],
    socials: [
        { id: "1", platform: "Github", url: "https://github.com/kstmostofa", username: "kstmostofa" },
        { id: "2", platform: "Linkedin", url: "https://www.linkedin.com/in/mostofa-me", username: "mostofa-me" },
        { id: "3", platform: "Stack Overflow", url: "https://stackoverflow.com/users/15743182/md-mostafijur-rahman", username: "md-mostafijur-rahman" },
        { id: "4", platform: "Skype", url: "", username: "kstmostofa" },
        { id: "5", platform: "Twitter", url: "https://x.com/Mostofa_Me", username: "Mostofa_Me" },
    ]
};

const initialSettings: ResumeSettings = {
    themeColor: "#23405c", // Deep Blue
    fontFamily: "Inter",
    fontSize: "md",
    documentSize: "A4",
};

export const useResumeStore = create<ResumeState>()(
    persist(
        (set) => ({
            resumeData: initialResumeData,
            settings: initialSettings,
            _hasHydrated: false,

            setPersonalInfo: (info) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        personalInfo: { ...state.resumeData.personalInfo, ...info },
                    },
                })),

            addExperience: (experience) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: [
                            ...state.resumeData.experience,
                            { ...experience, id: uuidv4() },
                        ],
                    },
                })),
            updateExperience: (id, experience) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.map((exp) =>
                            exp.id === id ? { ...exp, ...experience } : exp
                        ),
                    },
                })),
            removeExperience: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        experience: state.resumeData.experience.filter((exp) => exp.id !== id),
                    },
                })),
            reorderExperience: (startIndex, endIndex) =>
                set((state) => {
                    const result = Array.from(state.resumeData.experience);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    return {
                        resumeData: {
                            ...state.resumeData,
                            experience: result,
                        },
                    };
                }),

            addEducation: (education) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: [
                            ...state.resumeData.education,
                            { ...education, id: uuidv4() },
                        ],
                    },
                })),
            updateEducation: (id, education) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.map((edu) =>
                            edu.id === id ? { ...edu, ...education } : edu
                        ),
                    },
                })),
            removeEducation: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        education: state.resumeData.education.filter((edu) => edu.id !== id),
                    },
                })),
            reorderEducation: (startIndex, endIndex) =>
                set((state) => {
                    const result = Array.from(state.resumeData.education);
                    const [removed] = result.splice(startIndex, 1);
                    result.splice(endIndex, 0, removed);
                    return {
                        resumeData: {
                            ...state.resumeData,
                            education: result,
                        },
                    };
                }),

            addProject: (project) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: [
                            ...state.resumeData.projects,
                            { ...project, id: uuidv4() },
                        ],
                    },
                })),
            updateProject: (id, project) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: state.resumeData.projects.map((proj) =>
                            proj.id === id ? { ...proj, ...project } : proj
                        ),
                    },
                })),
            removeProject: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        projects: state.resumeData.projects.filter((proj) => proj.id !== id),
                    },
                })),

            addSkill: (skill) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: [...state.resumeData.skills, { ...skill, id: uuidv4() }],
                    },
                })),
            updateSkill: (id, skill) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: state.resumeData.skills.map((s) =>
                            s.id === id ? { ...s, ...skill } : s
                        ),
                    },
                })),
            removeSkill: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        skills: state.resumeData.skills.filter((s) => s.id !== id),
                    },
                })),

            addLanguage: (language) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        languages: [
                            ...state.resumeData.languages,
                            { ...language, id: uuidv4() },
                        ],
                    },
                })),
            updateLanguage: (id, language) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        languages: state.resumeData.languages.map((l) =>
                            l.id === id ? { ...l, ...language } : l
                        ),
                    },
                })),
            removeLanguage: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        languages: state.resumeData.languages.filter((l) => l.id !== id),
                    },
                })),

            addCertification: (certification) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        certifications: [
                            ...state.resumeData.certifications,
                            { ...certification, id: uuidv4() },
                        ],
                    },
                })),
            updateCertification: (id, certification) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        certifications: state.resumeData.certifications.map((c) =>
                            c.id === id ? { ...c, ...certification } : c
                        ),
                    },
                })),
            removeCertification: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        certifications: state.resumeData.certifications.filter(
                            (c) => c.id !== id
                        ),
                    },
                })),

            addStrength: (strength) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        strengths: [
                            ...state.resumeData.strengths,
                            { ...strength, id: uuidv4() },
                        ],
                    },
                })),
            updateStrength: (id, strength) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        strengths: state.resumeData.strengths.map((s) =>
                            s.id === id ? { ...s, ...strength } : s
                        ),
                    },
                })),
            removeStrength: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        strengths: state.resumeData.strengths.filter((s) => s.id !== id),
                    },
                })),

            addSocial: (social) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        socials: [...state.resumeData.socials, { ...social, id: uuidv4() }],
                    },
                })),
            updateSocial: (id, social) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        socials: state.resumeData.socials.map((s) =>
                            s.id === id ? { ...s, ...social } : s
                        ),
                    },
                })),
            removeSocial: (id) =>
                set((state) => ({
                    resumeData: {
                        ...state.resumeData,
                        socials: state.resumeData.socials.filter((s) => s.id !== id),
                    },
                })),

            updateSettings: (settings) =>
                set((state) => ({
                    settings: { ...state.settings, ...settings },
                })),
            resetResume: () =>
                set({
                    resumeData: initialResumeData,
                    settings: initialSettings,
                }),
            setHasHydrated: (state) => set({ _hasHydrated: state }),
        }),
        {
            name: 'resume-storage',
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);
