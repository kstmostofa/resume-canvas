"use client";

import { useTheme } from "next-themes";
import {
  HomeIcon,
  MoonIcon,
  SunIcon,
  SparklesIcon,
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToSection } from "@/lib/scroll";

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", icon: HomeIcon, label: "Home" },
  { href: "/#features", icon: SparklesIcon, label: "Features" },
  { href: "/#testimonials", icon: ChatBubbleLeftRightIcon, label: "Reviews" },
  { href: "/builder", icon: DocumentTextIcon, label: "Builder" },
];

export const MobileNavigation = () => {
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
    <nav className="pb-safe fixed bottom-0 left-0 z-50 w-full border-t border-border bg-background/90 backdrop-blur-lg md:hidden">
      <div className="flex items-center justify-around p-3">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg p-2 transition-colors ${pathname === item.href ? "text-primary" : "text-muted-foreground"
              }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="flex flex-col items-center gap-1 p-2 text-muted-foreground"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <SunIcon className="h-5 w-5" />
          ) : (
            <MoonIcon className="h-5 w-5" />
          )}
          <span className="text-[10px] font-medium">Theme</span>
        </button>
      </div>
    </nav>
  );
};
