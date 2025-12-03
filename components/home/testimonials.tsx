"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/shared/button";

const testimonials = [
  {
    id: 1,
    content:
      "This resume builder is a game-changer! I was able to create a professional-looking resume in minutes, and I landed my dream job shortly after.",
    author: "Sarah Jenkins",
    role: "Software Engineer",
    rating: 5,
  },
  {
    id: 2,
    content:
      "I love how easy it is to customize the templates. The real-time preview feature saved me so much time. Highly recommended!",
    author: "Michael Chen",
    role: "Product Designer",
    rating: 5,
  },
  {
    id: 3,
    content:
      "Finally, a resume builder that doesn't hide features behind a paywall. The open-source nature of this project is fantastic.",
    author: "Emily Rodriguez",
    role: "Marketing Specialist",
    rating: 5,
  },
  {
    id: 4,
    content:
      "Clean code, great design, and very intuitive. I've recommended this to all my friends who are job hunting.",
    author: "David Kim",
    role: "Frontend Developer",
    rating: 4,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="py-20 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Loved by job seekers
          </h2>
          <p className="text-lg text-muted-foreground">
            Don&apos;t just take our word for it. Here&apos;s what our users
            have to say.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="bg-card border rounded-2xl p-8 md:p-12 shadow-lg relative"
              >
                <Quote className="absolute top-8 left-8 h-12 w-12 text-primary/10 rotate-180" />

                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-primary text-primary"
                        />
                      ),
                    )}
                  </div>

                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    &quot;{testimonials[currentIndex].content}&quot;
                  </blockquote>

                  <div>
                    <div className="font-semibold text-lg">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-muted-foreground">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous testimonial</span>
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-primary/20 hover:bg-primary/40"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary/5 hover:text-primary"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
