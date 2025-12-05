import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

export type IconName = keyof typeof Icons;

export const iconList = Object.keys(Icons) as IconName[];

export const getIconComponent = (name: string): LucideIcon | null => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Icon = (Icons as any)[name];
    return Icon || null;
};

export const socialIcons = [
    "Github", "Linkedin", "Twitter", "Facebook", "Instagram", "Youtube", "Globe", "Mail", "Phone", "MapPin", "Briefcase", "Link", "ExternalLink",
    "Twitch", "Gitlab", "Dribbble", "Figma", "Codepen", "Slack",
    "Code", "Terminal", "PenTool", "MessageCircle", "Gamepad2", "Hash", "Layers"
];

export const strengthIcons = [
    "Zap", "Star", "Award", "Target", "TrendingUp", "Lightbulb", "CheckCircle", "Shield", "Users", "MessageCircle", "Code", "Cpu", "Database", "Layout", "Smartphone"
];
