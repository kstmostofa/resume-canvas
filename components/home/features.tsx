"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Download,
  Layout,
  Lock,
  Palette,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-primary" />,
    title: "Real-time Preview",
    description:
      "See changes instantly as you edit your resume. No more guessing how it will look.",
  },
  {
    icon: <Lock className="h-6 w-6 text-primary" />,
    title: "Privacy First",
    description:
      "Your data stays on your device. We don't store your personal information on our servers.",
  },
  {
    icon: <Download className="h-6 w-6 text-primary" />,
    title: "PDF Export",
    description:
      "Download your resume as a high-quality PDF, ready to be sent to recruiters.",
  },
  {
    icon: <Layout className="h-6 w-6 text-primary" />,
    title: "ATS Friendly",
    description:
      "Templates designed to be easily parsed by Applicant Tracking Systems.",
  },
  {
    icon: <Palette className="h-6 w-6 text-primary" />,
    title: "Customizable Themes",
    description:
      "Choose from a variety of professional themes and customize colors to match your style.",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6 text-primary" />,
    title: "Open Source",
    description:
      "Free forever and open for contributions. Built by the community, for the community.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-32 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need to build a perfect resume
          </h2>
          <p className="text-lg text-muted-foreground">
            Our builder is packed with powerful features to help you land your
            dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
