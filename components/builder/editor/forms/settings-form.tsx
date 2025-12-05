"use client";

import Select from "@/components/shared/select";
import { Label } from "@/components/ui/label";
import { ColorPicker } from "@/components/ui/color-picker";
import { documentSizes } from "@/data/document-size";
import { fontFamilies } from "@/data/font-family";
import { fontSizes } from "@/data/font-size";
import { useResumeStore } from "@/lib/store/useResumeStore";

export function SettingsForm() {
  const { settings, updateSettings } = useResumeStore();

  return (
    <div className="bg-card border rounded-2xl p-6">
      <h4 className="text-lg font-semibold mb-4">Resume Settings</h4>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={settings.fontFamily}
              onValueChange={(value) => updateSettings({ fontFamily: value })}
              options={fontFamilies}
              placeholder="Select font family"
            />
          </div>

          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select
              value={settings.fontSize}
              onValueChange={(value) =>
                updateSettings({ fontSize: value as "sm" | "md" | "lg" | "xl" })
              }
              options={fontSizes}
              placeholder="Select font size"
            />
          </div>

          <div className="space-y-2">
            <Label>Document Size</Label>
            <Select
              value={settings.documentSize}
              onValueChange={(value) =>
                updateSettings({ documentSize: value as "A4" | "Letter" })
              }
              options={documentSizes}
              placeholder="Select document size"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Theme Color</Label>
          <ColorPicker
            value={settings.themeColor}
            onChange={(value) => updateSettings({ themeColor: value })}
          />
        </div>
      </div>
    </div>
  );
}
