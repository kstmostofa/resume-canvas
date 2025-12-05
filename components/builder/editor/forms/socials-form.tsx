"use client";

import SharedSelect from "@/components/shared/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getIconComponent, socialIcons } from "@/lib/icons";
import { useResumeStore } from "@/lib/store/useResumeStore";
import { Plus, Trash2 } from "lucide-react";

const SOCIAL_PLATFORMS = [
  { label: "LinkedIn", value: "LinkedIn" },
  { label: "GitHub", value: "GitHub" },
  { label: "Twitter", value: "Twitter" },
  { label: "Portfolio", value: "Portfolio" },
  { label: "Website", value: "Website" },
  { label: "Instagram", value: "Instagram" },
  { label: "Facebook", value: "Facebook" },
  { label: "Youtube", value: "Youtube" },
  { label: "Dribbble", value: "Dribbble" },
  { label: "Behance", value: "Behance" },
  { label: "Stack Overflow", value: "Stack Overflow" },
  { label: "Medium", value: "Medium" },
  { label: "GitLab", value: "GitLab" },
  { label: "Twitch", value: "Twitch" },
  { label: "Discord", value: "Discord" },
  { label: "Reddit", value: "Reddit" },
  { label: "LeetCode", value: "LeetCode" },
  { label: "Kaggle", value: "Kaggle" },
  { label: "Other", value: "Other" },
];

const ICON_OPTIONS = socialIcons.map((iconName) => {
  const Icon = getIconComponent(iconName);
  return {
    label: iconName,
    value: iconName,
    component: (
      <div className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" />}
        <span>{iconName}</span>
      </div>
    ),
  };
});

export function SocialsForm() {
  const { resumeData, addSocial, removeSocial, updateSocial } =
    useResumeStore();
  const { socials } = resumeData;

  const handleAdd = () => {
    addSocial({
      platform: "LinkedIn",
      url: "",
      username: "",
      icon: "Linkedin",
    });
  };

  return (
    <div className="bg-card border rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold mb-4">Social Profiles</h4>
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
      <div className="space-y-8">
        {socials.map((social) => (
          <div key={social.id} className="space-y-3 p-3 border rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label className="text-xs">Platform</Label>
                <SharedSelect
                  value={social.platform}
                  onValueChange={(value) =>
                    updateSocial(social.id, { platform: value })
                  }
                  options={SOCIAL_PLATFORMS}
                  placeholder="Select Platform"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Icon</Label>
                <SharedSelect
                  value={social.icon || ""}
                  onValueChange={(value) =>
                    updateSocial(social.id, { icon: value })
                  }
                  options={ICON_OPTIONS}
                  placeholder="Select Icon"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs">Username</Label>
                <Input
                  value={social.username}
                  onChange={(e) =>
                    updateSocial(social.id, { username: e.target.value })
                  }
                  placeholder="johndoe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">URL</Label>
              <Input
                value={social.url}
                onChange={(e) =>
                  updateSocial(social.id, { url: e.target.value })
                }
                placeholder="https://linkedin.com/in/johndoe"
              />
            </div>
            <div className="flex justify-end pt-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeSocial(social.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove
              </Button>
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
