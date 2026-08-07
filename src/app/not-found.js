// app/not-found.js
"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { Home, Search, Compass } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Big 404 with glow */}
        <div className="relative mb-6">
          <h1 className="text-[120px] md:text-[160px] font-extrabold leading-none bg-linear-to-b from-[#4F46E5] to-indigo-300 bg-clip-text text-transparent">
            404
          </h1>
          <div className="absolute inset-0 blur-3xl opacity-20 bg-[#4F46E5] -z-10" />
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-4 rounded-full bg-[#4F46E5]/10 border border-[#4F46E5]/20">
            <Compass className="w-8 h-8 text-[#4F46E5]" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-foreground mb-2">
          This idea doesn&apos;t exist... yet
        </h2>
        <p className="text-default-500 mb-8">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/">
           <Button
            startContent={<Home className="w-4 h-4" />}
            className="bg-[#4F46E5] text-white font-medium"
            radius="full"
            size="lg"
          >
            Back to Home
          </Button>
          </Link>
          <Link href="/ideas">
            <Button
            
            startContent={<Search className="w-4 h-4" />}
            variant="bordered"
            radius="full"
            size="lg"
            className="border-[#4F46E5]/30 text-foreground"
          >
            Browse Ideas
          </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}