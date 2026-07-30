"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Rocket, Lightbulb, Globe } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    headline: "Every Great Startup Begins with One Brilliant Idea",
    subheading:
      "Discover innovative business ideas, share your own vision, and connect with a community of creators turning imagination into reality.",
    cta: "Explore Ideas",
    ctaIcon: Rocket,
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    headline: "Collaborate. Validate. Innovate.",
    subheading:
      "Join passionate entrepreneurs, receive valuable feedback, and refine your ideas through meaningful community discussions.",
    cta: "Explore Ideas",
    ctaIcon: Lightbulb,
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    headline: "Your Next Big Idea Could Change the World",
    subheading:
      "Browse trending startup concepts, discover emerging innovations, and inspire the next generation of entrepreneurs.",
    cta: "Explore Ideas",
    ctaIcon: Globe,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  },
];

const AUTOPLAY_MS = 5000;

export default function Banner() {
  const [current, setCurrent] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const goTo = useCallback((index) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isHovering) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [next, isHovering]);

  return (
    <section
      className="relative h-[85vh] min-h-140 w-full overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-roledescription="carousel"
      aria-label="Featured highlights"
    >
      {/* Slides */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        const Icon = slide.ctaIcon;

        return (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
            aria-hidden={!isActive}
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center scale-105"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/60" />
            {/* Accent gradient wash for extra depth */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-transparent to-purple-950/30" />

            {/* Content */}
            <div className="relative z-10 flex h-full text-left items-center">
              <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
                <div
                  className={`max-w-2xl transition-all duration-1000 ease-out ${
                    isActive
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.05] text-white">
                    {slide.headline}
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg md:text-xl text-gray-200">
                    {slide.subheading}
                  </p>
                  <Link href='/ideas'>
                    <button
                    className="group mt-8 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-900/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/40 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
                    {slide.cta}
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-8"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-8"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-8 bg-gradient-to-r from-indigo-500 to-purple-500"
                : "w-2 bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}