"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

export function SkillsForm() {
  const { resumeData, addSkill, removeSkill, updateSkill } = useResumeStore();
  const { skills } = resumeData;

  const handleAdd = () => {
    addSkill({ name: "" });
  };

  return (
    <div className="bg-card border rounded-2xl p-6">
      <div className="flex justify-between items-center">
        <h4 className="text-lg font-semibold mb-4">Skills</h4>
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {skills.map((skill) => (
          <div key={skill.id} className="flex items-center gap-2">
            <Input
              value={skill.name}
              onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
              placeholder="Skill (e.g. React, Python)"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeSkill(skill.id)}
              className="text-gray-500 hover:text-red-500 bg-accent"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No skills added yet. Click &quot;Add&quot; to start.
          </p>
        )}
      </div>
    </div>
  );
}
