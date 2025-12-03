export const SECTIONS = [
  "home",
  "experience",
  "projects",
  "testimonials",
  "contact",
] as const;

export type SectionId = (typeof SECTIONS)[number];

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}
