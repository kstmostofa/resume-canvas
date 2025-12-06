"use client";

import { useState } from "react";
import { ResumeEditor } from "@/components/builder/editor/resume-editor";
import { ResumePreview } from "@/components/builder/preview/resume-preview";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { FileText, PenLine, Eye, Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function BuilderPage() {
  const { _hasHydrated } = useResumeStore();
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const { theme, setTheme } = useTheme();

  if (!_hasHydrated) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/30">
        <div className="bg-card text-card-foreground p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 min-w-[300px] border border-border">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-muted border-t-primary rounded-full animate-spin" />
            <FileText className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="text-center w-full">
            <h3 className="text-lg font-bold">Loading Resume</h3>
            <p className="text-sm text-muted-foreground">
              Please wait while we prepare your workspace...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen w-full overflow-hidden flex-col lg:flex-row">
      {/* Mobile Tab Toggles - Visible only on small screens */}
      <div className="lg:hidden flex border-b border-border bg-card shrink-0">
        <button
          onClick={() => setActiveTab("editor")}
          className={cn(
            "flex-1 p-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors",
            activeTab === "editor"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <PenLine className="w-4 h-4" />
          Editor
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={cn(
            "flex-1 p-3 text-sm font-medium flex items-center justify-center gap-2 border-b-2 transition-colors",
            activeTab === "preview"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          )}
        >
          <Eye className="w-4 h-4" />
          Preview
        </button>
        <div className="flex items-center px-3 border-l border-border">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-8 w-8"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>

      {/* Left Panel - Editor */}
      <div
        className={cn(
          "w-full lg:w-1/2 h-full lg:block lg:min-w-[400px]",
          activeTab === "editor" ? "block" : "hidden"
        )}
      >
        <ResumeEditor />
      </div>

      {/* Right Panel - Preview */}
      <div
        className={cn(
          "w-full lg:w-1/2 h-full bg-muted border-l border-border lg:block",
          activeTab === "preview" ? "block" : "hidden"
        )}
      >
        <ResumePreview />
      </div>
    </main>
  );
}
