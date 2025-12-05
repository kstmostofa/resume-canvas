"use client";

import Select from "@/components/shared/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { languageProficiencies } from "@/data/language-proficiency";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Language } from "@/lib/types";
import { Plus, X } from "lucide-react";
;

export function LanguagesForm() {
    const { resumeData, addLanguage, removeLanguage, updateLanguage } = useResumeStore();
    const { languages } = resumeData;

    const handleAdd = () => {
        addLanguage({ name: "", proficiency: "Basic" });
    };

    return (
        <div className="bg-card border rounded-2xl p-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold mb-4">Languages</h4>
                <Button onClick={handleAdd} size="sm" variant="outline" className="mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </div>
            <div className="space-y-4">
                {languages.map((lang) => (
                    <div key={lang.id} className="flex items-end gap-2">
                        <div className="flex-1 space-y-2">
                            <Label className="text-xs">Language</Label>
                            <Input
                                value={lang.name}
                                onChange={(e) => updateLanguage(lang.id, { name: e.target.value })}
                                placeholder="English"
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <Label className="text-xs">Proficiency</Label>
                            <Select
                                value={lang.proficiency}
                                onValueChange={(value) =>
                                    updateLanguage(lang.id, { proficiency: value as Language["proficiency"] })
                                }

                                options={languageProficiencies}
                                placeholder="Select Proficiency"
                            />
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeLanguage(lang.id)}
                            className="text-gray-500 hover:text-red-500 mb-0.5"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
                {languages.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                        No languages added yet.
                    </p>
                )}
            </div>
        </div>
    );
}
