"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

interface NavItem {
  href: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Reviews" },
  { href: "/builder", label: "Builder" },
];

export const DesktopNavigation = () => {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const pathname = usePathname();

  if (!mounted) return null;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname === "/") {
      if (href === "/") {
        e.preventDefault();
        scrollToSection("home");
      } else if (href.startsWith("/#")) {
        e.preventDefault();
        const id = href.replace("/#", "");
        scrollToSection(id);
      }
    }
  };

  return (
    <nav className="fixed top-6 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-border bg-background/80 px-3 py-2.5 shadow-lg backdrop-blur-md md:flex">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={`cursor-pointer rounded-full px-6 py-1 text-base font-medium transition-all duration-300 ${
            pathname === item.href
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          {item.label}
        </Link>
      ))}
      <div className="mx-2 h-6 w-px bg-border" />
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <SunIcon className="h-5 w-5" />
        ) : (
          <MoonIcon className="h-5 w-5" />
        )}
      </button>
    </nav>
  );
};
