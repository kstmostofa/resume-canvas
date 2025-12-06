"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { DebouncedTextarea } from "@/components/ui/debounced-textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

const BULLET_STYLES = [
  { label: "Default (•)", value: "Dot" },
  { label: "Circle (○)", value: "Circle" },
  { label: "Square (■)", value: "Square" },
  { label: "Diamond (◆)", value: "Diamond" },
  { label: "Star (★)", value: "Star" },
  { label: "Dash (-)", value: "Minus" },
  { label: "Check (✓)", value: "Check" },
  { label: "Arrow (→)", value: "ArrowRight" },
  { label: "Chevron (›)", value: "ChevronRight" },
  { label: "None", value: "None" },
];

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } =
    useResumeStore();
  const { experience } = resumeData;

  const handleAdd = () => {
    addExperience({
      title: "New Position",
      company: "Company Name",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold mb-4">Experience</h4>
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
      <div className="flex justify-end mb-4">
        <Accordion type="single" collapsible className="w-full">
          {experience.map((exp) => (
            <AccordionItem key={exp.id} value={exp.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex flex-col items-start text-left">
                  <span className="font-semibold">
                    {exp.title || "Untitled Position"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {exp.company || "Unknown Company"}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="space-y-4 pt-4 px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input
                      value={exp.title}
                      onChange={(e) =>
                        updateExperience(exp.id, { title: e.target.value })
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(exp.id, { company: e.target.value })
                      }
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) =>
                        updateExperience(exp.id, { location: e.target.value })
                      }
                      placeholder="City, Country"
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) =>
                        updateExperience(exp.id, { current: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <Label htmlFor={`current-${exp.id}`}>
                      I currently work here
                    </Label>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <MonthYearPicker
                      value={exp.startDate}
                      onChange={(value) =>
                        updateExperience(exp.id, { startDate: value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <MonthYearPicker
                      value={exp.endDate}
                      onChange={(value) =>
                        updateExperience(exp.id, { endDate: value })
                      }
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label>Description</Label>
                    <div className="w-40">
                      <Select
                        value={exp.bulletStyle || "default"}
                        onValueChange={(value) =>
                          updateExperience(exp.id, { bulletStyle: value })
                        }
                      >
                        <SelectTrigger className="h-8 w-full">
                          <SelectValue placeholder="Bullet Style" />
                        </SelectTrigger>
                        <SelectContent>
                          {BULLET_STYLES.map((style) => (
                            <SelectItem
                              key={style.value}
                              value={style.value}
                              className="text-xs"
                            >
                              {style.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DebouncedTextarea
                    value={exp.description}
                    onDebouncedChange={(value) =>
                      updateExperience(exp.id, { description: value })
                    }
                    placeholder="Describe your responsibilities and achievements..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
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
    </div>
  );
}
