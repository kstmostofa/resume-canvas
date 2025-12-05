import { ResumeEditor } from "@/components/builder/editor/resume-editor";
import { ResumePreview } from "@/components/builder/preview/resume-preview";

export default function BuilderPage() {
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
