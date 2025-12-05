// "use client";

import { PersonalInfoForm } from "./forms/personal-info-form";
import { ExperienceForm } from "./forms/experience-form";
import { EducationForm } from "./forms/education-form";
import { SkillsForm } from "./forms/skills-form";
import { ProjectsForm } from "./forms/projects-form";
import { LanguagesForm } from "./forms/languages-form";
import { CertificationsForm } from "./forms/certifications-form";
import { SocialsForm } from "./forms/socials-form";
import { StrengthsForm } from "./forms/strengths-form";
import { SettingsForm } from "./forms/settings-form";
import Link from "next/link";

export function ResumeEditor() {
  // const { resumeData } = useResumeStore();

  return (
    <div className="h-full overflow-y-auto p-6 bg-muted border-r border-border scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
      <Link href={"/"} className="text-3xl font-bold mb-6 flex">
        <div>
          <span className="text-primary">Resume</span> Canvas
        </div>
      </Link>
      <div className="space-y-8 pb-20">
        <section>
          <SettingsForm />
        </section>

        <section>
          <PersonalInfoForm />
        </section>

        <section>
          <ExperienceForm />
        </section>

        <section>
          <EducationForm />
        </section>

        <section>
          <SkillsForm />
        </section>

        <section>
          <ProjectsForm />
        </section>

        <section>
          <LanguagesForm />
        </section>

        <section>
          <CertificationsForm />
        </section>

        <section>
          <StrengthsForm />
        </section>

        <section>
          <SocialsForm />
        </section>
      </div>
    </div>
  );
}
