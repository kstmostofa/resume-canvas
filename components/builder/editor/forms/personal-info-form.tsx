"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function PersonalInfoForm() {
    const { resumeData, setPersonalInfo } = useResumeStore();
    const { personalInfo } = resumeData;
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPersonalInfo({ [name]: value });
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPersonalInfo({ photoUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemovePhoto = () => {
        setPersonalInfo({ photoUrl: "" });
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="bg-card border rounded-2xl p-6">
            <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
            <div className="space-y-4">
                <div className="space-y-2">
                    <Label>Profile Photo</Label>
                    <div className="flex items-center gap-4">
                        {personalInfo.photoUrl && (
                            <div className="relative w-16 h-16 rounded-full overflow-hidden border shrink-0">
                                <Image
                                    src={personalInfo.photoUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                    width={64}
                                    height={64}
                                />
                                <button
                                    onClick={handleRemovePhoto}
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                                    type="button"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        )}
                        <div className="flex-1">
                            <Input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoUpload}
                                className="cursor-pointer"
                            />
                            <p className="text-xs text-gray-500 mt-1">
                                Recommended: Square JPG or PNG, max 2MB.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            name="fullName"
                            value={personalInfo.fullName}
                            onChange={handleChange}
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                            id="title"
                            name="title"
                            value={personalInfo.title}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={personalInfo.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={personalInfo.phone}
                            onChange={handleChange}
                            placeholder="+1 234 567 890"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                        id="location"
                        name="location"
                        value={personalInfo.location}
                        onChange={handleChange}
                        placeholder="New York, NY"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                        id="summary"
                        name="summary"
                        value={personalInfo.summary}
                        onChange={handleChange}
                        placeholder="Brief overview of your professional background..."
                        className="min-h-[100px]"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <Input
                            id="website"
                            name="website"
                            value={personalInfo.website}
                            onChange={handleChange}
                            placeholder="https://johndoe.com"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <Input
                            id="linkedin"
                            name="linkedin"
                            value={personalInfo.linkedin}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/johndoe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="github">GitHub</Label>
                        <Input
                            id="github"
                            name="github"
                            value={personalInfo.github}
                            onChange={handleChange}
                            placeholder="https://github.com/johndoe"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="twitter">Twitter / X</Label>
                        <Input
                            id="twitter"
                            name="twitter"
                            value={personalInfo.twitter}
                            onChange={handleChange}
                            placeholder="https://twitter.com/johndoe"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
