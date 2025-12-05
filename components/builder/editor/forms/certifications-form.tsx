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

export function CertificationsForm() {
    const { resumeData, addCertification, updateCertification, removeCertification } = useResumeStore();
    const { certifications } = resumeData;

    const handleAdd = () => {
        addCertification({
            name: "New Certification",
            issuer: "",
            date: "",
            link: "",
        });
    };

    return (
        <div className="bg-card border rounded-2xl p-6">
            <div className="flex justify-between items-center">
                <h4 className="text-lg font-semibold mb-4">Certifications</h4>
                <Button onClick={handleAdd} size="sm" variant="outline" className="mb-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                </Button>
            </div>
            <Accordion type="single" collapsible className="w-full">
                {certifications.map((cert) => (
                    <AccordionItem key={cert.id} value={cert.id}>
                        <AccordionTrigger className="hover:no-underline">
                            <div className="flex flex-col items-start text-left">
                                <span className="font-semibold">{cert.name || "Untitled Certification"}</span>
                                <span className="text-sm text-gray-500">{cert.issuer || "Unknown Issuer"}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4 pt-4 px-1">
                            <div className="space-y-2">
                                <Label>Certification Name</Label>
                                <Input
                                    value={cert.name}
                                    onChange={(e) => updateCertification(cert.id, { name: e.target.value })}
                                    placeholder="AWS Certified Solutions Architect"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Issuer</Label>
                                    <Input
                                        value={cert.issuer}
                                        onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                                        placeholder="Amazon Web Services"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        value={cert.date}
                                        onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                                        placeholder="2023"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Link</Label>
                                <Input
                                    value={cert.link}
                                    onChange={(e) => updateCertification(cert.id, { link: e.target.value })}
                                    placeholder="https://certification-link.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={cert.description || ""}
                                    onChange={(e) => updateCertification(cert.id, { description: e.target.value })}
                                    placeholder="Brief description of the certification..."
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeCertification(cert.id)}
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
