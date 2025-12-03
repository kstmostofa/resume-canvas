import { useState, useEffect } from "react";

export const useScrollSpy = (
  sectionIds: string[],
  mounted: boolean,
): string => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [mounted, sectionIds]);

  return activeSection;
};
