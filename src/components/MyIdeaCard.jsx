"use client";
import { Button, Card } from "@heroui/react";
import { motion } from "framer-motion";
import { Users, Wallet, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function MyIdeaCard({ idea }) {
  const {
    _id,
    ideaTitle,
    audience,
    category,
    budget,
    imageUrl,
    shortDescription,
    detailedDescription,
    problemStatement,
    proposedSolution,
  } = idea;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#101828]/10 shadow-sm hover:shadow-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative h-44 w-full shrink-0 sm:h-48 rounded-lg">
          <Image
            src={imageUrl || "/fallback-image.jpg"}
            alt={ideaTitle || "Idea thumbnail"}
            fill
            className="object-cover rounded-lg"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {category && (
            <span className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-[#4F46E5] shadow-sm">
              {category}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h2 className="text-base sm:text-lg font-semibold text-[#101828] leading-snug line-clamp-2">
            {ideaTitle}
          </h2>

          {audience && (
            <p className="mt-1 flex items-center gap-1 text-xs sm:text-sm text-[#101828]/50">
              <Users size={13} />
              {audience}
            </p>
          )}

          <p className="mt-3 flex-1 text-sm text-[#101828]/60 leading-relaxed line-clamp-3">
            {shortDescription}
          </p>

          <div className="mt-4 flex items-center justify-between gap-2">
            {budget && (
              <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 whitespace-nowrap">
                <Wallet size={12} />${budget}
              </span>
            )}

            <Link href={`/ideas/${_id}`} className="ml-auto">
              <Button
                className="bg-[#4F46E5] text-white font-medium"
                size="sm"
                endContent={<ArrowRight size={14} />}
              >
                View details
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
