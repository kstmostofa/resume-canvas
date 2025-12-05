import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ResumeData,
  ResumeSettings,
  PersonalInfo,
  Experience,
  Education,
  Project,
  Skill,
  Language,
  Certification,
  Strength,
  Social,
} from "../types";
import { v4 as uuidv4 } from "uuid";

interface ResumeState {
  resumeData: ResumeData;
  settings: ResumeSettings;
  _hasHydrated: boolean;

  // Actions
  setHasHydrated: (state: boolean) => void;
  setPersonalInfo: (info: Partial<PersonalInfo>) => void;

  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;

  addEducation: (education: Omit<Education, "id">) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;

  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;

  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addLanguage: (language: Omit<Language, "id">) => void;
  updateLanguage: (id: string, language: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  addCertification: (certification: Omit<Certification, "id">) => void;
  updateCertification: (
    id: string,
    certification: Partial<Certification>,
  ) => void;
  removeCertification: (id: string) => void;

  addStrength: (strength: Omit<Strength, "id">) => void;
  updateStrength: (id: string, strength: Partial<Strength>) => void;
  removeStrength: (id: string) => void;

  addSocial: (social: Omit<Social, "id">) => void;
  updateSocial: (id: string, social: Partial<Social>) => void;
  removeSocial: (id: string) => void;

  updateSettings: (settings: Partial<ResumeSettings>) => void;
  resetResume: () => void;
}

const initialResumeData: ResumeData = {
  personalInfo: {
    fullName: "John Doe",
    title: "Senior Software Engineer",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "https://johndoe.dev",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    summary:
      "Experienced Software Engineer with a passion for building scalable web applications. Proficient in modern JavaScript frameworks, cloud infrastructure, and system design. Dedicated to writing clean, maintainable code and mentoring junior developers.",
    photoUrl: "",
  },
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: "",
      current: true,
      description:
        "• Led the migration of legacy monolith to microservices architecture.\n• Improved application performance by 40% through code optimization.\n• Mentored junior developers and conducted code reviews.",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "StartUp Innovations",
      location: "New York, NY",
      startDate: "2019-03",
      endDate: "2021-12",
      current: false,
      description:
        "• Developed and maintained key features for the flagship product.\n• Collaborated with product managers to define requirements.\n• Implemented automated testing pipeline reducing bugs by 25%.",
    },
  ],
  education: [
    {
      id: "1",
      degree: "Master of Science in Computer Science",
      school: "Stanford University",
      location: "Stanford, CA",
      startDate: "2017-09",
      endDate: "2019-06",
      current: false,
    },
    {
      id: "2",
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      location: "Berkeley, CA",
      startDate: "2013-09",
      endDate: "2017-05",
      current: false,
    },
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      link: "https://github.com/johndoe/ecommerce",
      date: "2023",
      description:
        "A full-featured e-commerce platform built with Next.js, Stripe, and PostgreSQL.",
    },
    {
      id: "2",
      name: "Task Management App",
      link: "https://github.com/johndoe/taskmanager",
      date: "2022",
      description:
        "Real-time task management application using React, Firebase, and Tailwind CSS.",
    },
  ],
  skills: [
    { id: "1", name: "JavaScript" },
    { id: "2", name: "TypeScript" },
    { id: "3", name: "React" },
    { id: "4", name: "Next.js" },
    { id: "5", name: "Node.js" },
    { id: "6", name: "Python" },
    { id: "7", name: "AWS" },
    { id: "8", name: "Docker" },
    { id: "9", name: "PostgreSQL" },
    { id: "10", name: "GraphQL" },
  ],
  languages: [
    { id: "1", name: "English", proficiency: "Native" },
    { id: "2", name: "Spanish", proficiency: "Intermediate" },
  ],
  certifications: [
    {
      id: "1",
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      link: "https://aws.amazon.com/certification/",
    },
  ],
  strengths: [
    {
      id: "1",
      title: "Problem Solving",
      description:
        "Strong analytical skills with a proven ability to solve complex technical challenges.",
    },
    {
      id: "2",
      title: "Leadership",
      description:
        "Experience leading teams and driving technical initiatives to completion.",
    },
  ],
  socials: [
    {
      id: "1",
      platform: "Github",
      url: "https://github.com/johndoe",
      username: "johndoe",
    },
    {
      id: "2",
      platform: "Linkedin",
      url: "https://linkedin.com/in/johndoe",
      username: "johndoe",
    },
    {
      id: "3",
      platform: "Twitter",
      url: "https://twitter.com/johndoe",
      username: "johndoe",
    },
  ],
};

const initialSettings: ResumeSettings = {
  themeColor: "#23405c", // Deep Blue
  fontFamily: "'Khand', sans-serif",
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
              exp.id === id ? { ...exp, ...experience } : exp,
            ),
          },
        })),
      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter(
              (exp) => exp.id !== id,
            ),
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
              edu.id === id ? { ...edu, ...education } : edu,
            ),
          },
        })),
      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter(
              (edu) => edu.id !== id,
            ),
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
              proj.id === id ? { ...proj, ...project } : proj,
            ),
          },
        })),
      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter(
              (proj) => proj.id !== id,
            ),
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
              s.id === id ? { ...s, ...skill } : s,
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
              l.id === id ? { ...l, ...language } : l,
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
              c.id === id ? { ...c, ...certification } : c,
            ),
          },
        })),
      removeCertification: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certifications: state.resumeData.certifications.filter(
              (c) => c.id !== id,
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
              s.id === id ? { ...s, ...strength } : s,
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
              s.id === id ? { ...s, ...social } : s,
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
      name: "resume-storage",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
