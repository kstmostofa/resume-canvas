"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } =
    useResumeStore();
  const { projects } = resumeData;

  const handleAdd = () => {
    addProject({
      name: "New Project",
      link: "",
      date: "",
      description: "",
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold mb-4">Projects</h4>
        <Button
          onClick={handleAdd}
          size="sm"
          variant="outline"
          className="mb-4"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {projects.map((project) => (
          <AccordionItem key={project.id} value={project.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold">
                  {project.name || "Untitled Project"}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4 px-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, { name: e.target.value })
                    }
                    placeholder="Project Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Date / Year</Label>
                  <Input
                    value={project.date}
                    onChange={(e) =>
                      updateProject(project.id, { date: e.target.value })
                    }
                    placeholder="2023"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Link</Label>
                <Input
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, { link: e.target.value })
                  }
                  placeholder="https://project-demo.com"
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) =>
                    updateProject(project.id, { description: e.target.value })
                  }
                  placeholder="Describe the project..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
