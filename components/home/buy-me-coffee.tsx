"use client";

import { Button } from "@/components/shared/button";
import { motion } from "framer-motion";
import { Coffee, Heart } from "lucide-react";
import Link from "next/link";

export function BuyMeCoffee() {
  return (
    <section className="py-20 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-6 p-4 bg-background rounded-full shadow-lg"
          >
            <Heart className="h-8 w-8 text-red-500 fill-red-500 animate-pulse" />
          </motion.div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Support Open Source
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            This project is free and open source. If you found it useful,
            consider buying me a coffee to support future development.
          </p>

          <Button
            size="lg"
            className="h-14 px-8 text-lg rounded-full gap-3 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 bg-amber-400 text-white hover:bg-amber-400"
            asChild
          >
            <Link href="https://buymeacoffee.com/mostofa" target="_blank">
              <Coffee className="h-6 w-6" />
              Buy me a coffee
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
