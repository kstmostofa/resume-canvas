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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getIconComponent, strengthIcons } from "@/lib/icons";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function StrengthsForm() {
    const { resumeData, addStrength, updateStrength, removeStrength } = useResumeStore();
    const { strengths } = resumeData;

    const handleAdd = () => {
        addStrength({
            title: "New Strength",
            description: "",
            icon: "Zap"
        });
    };

    return (
        <div className="bg-card border rounded-2xl p-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold mb-4">Strength</h4>
                <Button onClick={handleAdd} size="sm" variant="outline" className="mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {strengths.map((strength) => (
                    <AccordionItem key={strength.id} value={strength.id}>
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex flex-col items-start text-left">
                                <span className="font-semibold flex items-center gap-2">
                                    {strength.icon && (() => {
                                        const Icon = getIconComponent(strength.icon);
                                        return Icon ? <Icon className="w-4 h-4" /> : null;
                                    })()}
                                    {strength.title || "Untitled Strength"}
                                </span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4 px-1">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input
                                        value={strength.title}
                                        onChange={(e) => updateStrength(strength.id, { title: e.target.value })}
                                        placeholder="e.g. Leadership"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Icon</Label>
                                    <Select
                                        value={strength.icon}
                                        onValueChange={(value) => updateStrength(strength.id, { icon: value })}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {strengthIcons.map((iconName) => {
                                                const Icon = getIconComponent(iconName);
                                                return (
                                                    <SelectItem key={iconName} value={iconName}>
                                                        <div className="flex items-center gap-2">
                                                            {Icon && <Icon className="w-4 h-4" />}
                                                            <span>{iconName}</span>
                                                        </div>
                                                    </SelectItem>
                                                );
                                            })}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={strength.description}
                                    onChange={(e) => updateStrength(strength.id, { description: e.target.value })}
                                    placeholder="Describe this strength..."
                                    className="min-h-[100px]"
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeStrength(strength.id)}
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
