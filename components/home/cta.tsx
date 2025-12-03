"use client";

import { Button } from "@/components/shared/button";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-20 text-center shadow-2xl sm:px-16 sm:py-24 lg:px-24">
          {/* Abstract Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-8 rounded-full bg-white/10 p-3 backdrop-blur-sm"
            >
              <div className="rounded-full bg-white p-2">
                <ArrowRight className="h-6 w-6 text-primary" />
              </div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl mb-6"
            >
              Ready to build your professional resume?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mx-auto max-w-xl text-lg text-primary-foreground/90 mb-10"
            >
              Join thousands of job seekers who have successfully landed
              interviews using our open-source builder. No hidden fees, no
              watermarks.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full justify-center"
            >
              <Button
                size="lg"
                asChild
                className="h-14 px-8 text-lg font-semibold text-primary shadow-lg bg-zinc-200 hover:shadow-xl transition-all hover:-translate-y-1 hover:bg-zinc-300"
              >
                <Link href="/builder">
                  Get Started for Free
                  <ArrowUpRight className="inline-block ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                asChild
                className="h-14 px-8 text-lg font-semibold text-primary shadow-lg bg-zinc-200 hover:shadow-xl transition-all hover:-translate-y-1 hover:bg-zinc-300"
              >
                <Link
                  href="https://github.com/yourusername/open-resume"
                  target="_blank"
                >
                  <Github className="inline-block mr-2 h-5 w-5" />
                  Star on GitHub
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
