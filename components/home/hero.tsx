"use client";

import { Button } from "@/components/shared/button";
import { motion } from "framer-motion";
import { ArrowUpRight, FileText, Github, Sparkles } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden min-h-screen flex items-center py-20 sm:py-32 lg:pb-32 xl:pb-36"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-8 items-center">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              <span>Resume Canvas - Open Source Resume Builder</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
            >
              Build Your Professional Resume in{" "}
              <span className="text-primary">Minutes</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl"
            >
              Create a stunning, ATS-friendly resume with our free and
              open-source builder. No sign-up required, privacy-focused, and
              completely customizable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                asChild
                className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 text-white"
              >
                <Link href="/builder">
                  Build Resume <ArrowUpRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="h-12 px-8 text-base hover:bg-primary/5"
              >
                <Link
                  href="https://github.com/kstmostofa/resume-canvas"
                  target="_blank"
                >
                  <Github className="inline-block mr-2 h-5 w-5" />
                  Star on GitHub
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative mx-auto w-full max-w-[500px] lg:max-w-none"
          >
            <div className="aspect-4/3 w-full overflow-hidden rounded-2xl border bg-card shadow-2xl relative group">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-muted/30">
                <div className="text-center">
                  <FileText className="h-24 w-24 mx-auto mb-4 opacity-20" />
                  <p className="text-sm font-medium">Interactive Preview</p>
                </div>
              </div>
              {/* Add actual screenshot here later */}
              <div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 h-24 w-24 rounded-xl bg-primary/10 backdrop-blur-xl border border-primary/20 -z-10"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-secondary/50 backdrop-blur-xl border border-border -z-10"
            />
          </motion.div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/4 rounded-full bg-secondary/20 blur-3xl" />
    </section>
  );
}
