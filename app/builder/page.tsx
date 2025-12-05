"use client";

import { ResumeEditor } from "@/components/builder/editor/resume-editor";
import { ResumePreview } from "@/components/builder/preview/resume-preview";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { FileText } from "lucide-react";

export default function BuilderPage() {
  const { _hasHydrated } = useResumeStore();

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
            <p className="text-sm text-muted-foreground">Please wait while we prepare your workspace...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen w-full overflow-hidden">
      {/* Left Panel - Editor */}
      <div className="w-1/2 h-full min-w-[400px]">
        <ResumeEditor />
      </div>

      {/* Right Panel - Preview */}
      <div className="w-1/2 h-full bg-muted border-l border-border">
        <ResumePreview />
      </div>
    </main>
  );
}
