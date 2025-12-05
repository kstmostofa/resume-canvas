"use client";

import Select from "@/components/shared/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, X } from "lucide-react";


const SOCIAL_PLATFORMS = [
    { label: "LinkedIn", value: "LinkedIn" },
    { label: "GitHub", value: "GitHub" },
    { label: "Twitter", value: "Twitter" },
    { label: "Portfolio", value: "Portfolio" },
    { label: "Website", value: "Website" },
    { label: "Instagram", value: "Instagram" },
    { label: "Facebook", value: "Facebook" },
    { label: "Youtube", value: "Youtube" },
    { label: "Other", value: "Other" },
];

export function SocialsForm() {
    const { resumeData, addSocial, removeSocial, updateSocial } = useResumeStore();
    const { socials } = resumeData;

    const handleAdd = () => {
        addSocial({ platform: "LinkedIn", url: "", username: "" });
    };

    return (
        <div className="bg-card border rounded-2xl p-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold mb-4">Social Profiles</h4>
                <Button onClick={handleAdd} size="sm" variant="outline" className="mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </div>
            <div className="space-y-4">
                {socials.map((social) => (
                    <div key={social.id} className="space-y-3 p-3 border rounded-md relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeSocial(social.id)}
                            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 h-6 w-6"
                        >
                            <X className="h-4 w-4" />
                        </Button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <Label className="text-xs">Platform</Label>
                                <Select
                                    value={social.platform}
                                    onValueChange={(value) => updateSocial(social.id, { platform: value })}
                                    options={SOCIAL_PLATFORMS}
                                    placeholder="Select Platform"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs">Username</Label>
                                <Input
                                    value={social.username}
                                    onChange={(e) => updateSocial(social.id, { username: e.target.value })}
                                    placeholder="johndoe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">URL</Label>
                            <Input
                                value={social.url}
                                onChange={(e) => updateSocial(social.id, { url: e.target.value })}
                                placeholder="https://linkedin.com/in/johndoe"
                            />
                        </div>
                    </div>
                ))}
                {socials.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4">
                        No social profiles added yet.
                    </p>
                )}
            </div>
        </div>
    );
}
