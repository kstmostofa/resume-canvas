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
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function EducationForm() {
    const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore();
    const { education } = resumeData;

    const handleAdd = () => {
        addEducation({
            degree: "New Degree",
            school: "School/University",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
        });
    };

    return (
        <div className="bg-card border rounded-2xl p-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold mb-4">Education</h4>
                <Button onClick={handleAdd} size="sm" variant="outline" className="mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </div>
            <div className="flex justify-end mb-4">
                <Accordion type="single" collapsible className="w-full">
                    {education.map((edu) => (
                        <AccordionItem key={edu.id} value={edu.id}>
                            <AccordionTrigger className="hover:no-underline">
                                <div className="flex flex-col items-start text-left">
                                    <span className="font-semibold">{edu.degree || "Untitled Degree"}</span>
                                    <span className="text-sm text-gray-500">{edu.school || "Unknown School"}</span>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="space-y-4 pt-4 px-1">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Degree / Major</Label>
                                        <Input
                                            value={edu.degree}
                                            onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                                            placeholder="Bachelor of Science in CS"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>School / University</Label>
                                        <Input
                                            value={edu.school}
                                            onChange={(e) => updateEducation(edu.id, { school: e.target.value })}
                                            placeholder="University of Technology"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Location</Label>
                                        <Input
                                            value={edu.location}
                                            onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                                            placeholder="City, Country"
                                        />
                                    </div>
                                    <div className="flex items-center space-x-2 pt-8">
                                        <input
                                            type="checkbox"
                                            id={`edu-current-${edu.id}`}
                                            checked={edu.current}
                                            onChange={(e) => updateEducation(edu.id, { current: e.target.checked })}
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                        <Label htmlFor={`edu-current-${edu.id}`}>I currently study here</Label>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Start Date</Label>
                                        <MonthYearPicker
                                            value={edu.startDate}
                                            onChange={(value) => updateEducation(edu.id, { startDate: value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>End Date</Label>
                                        <MonthYearPicker
                                            value={edu.endDate}
                                            onChange={(value) => updateEducation(edu.id, { endDate: value })}
                                            disabled={edu.current}
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-2">
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => removeEducation(edu.id)}
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
