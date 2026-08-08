"use client";

import { Button, Card, CardFooter, CardTitle } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Bell } from "lucide-react";
import React from "react";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const TrendingSectionCard = ({ trends }) => {
  if (trends.length === 0) {
    return (
      <div className="container mx-auto my-16 text-center text-[#101828]">
        No trending startups right now.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-12 px-4">
      <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-5xl font-bold text-title mb-2">
                  Ideas on the Rise
                </h2>
                <p className="text-title/60">
                 Discover the ideas gaining momentum and making an impact.
                </p>
              </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {trends.map(({ _id, ideaTitle, imageUrl, category, audience }) => (
          <motion.div
            key={_id}
            variants={cardVariant}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <Card
              className="group relative h-80 overflow-hidden rounded-2xl border border-white/10 shadow-lg"
            >
              {/* Background image */}
              <Image
                fill
                alt={ideaTitle || "Startup image"}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                src={imageUrl || "/fallback-image.jpg"}
              />

              {/* Gradient overlay for readability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Category pill */}
              {category && (
                <span className="absolute top-4 left-4 z-10 rounded-full bg-[#4F46E5] px-3 py-1 text-xs font-semibold text-white shadow-sm">
                  {category}
                </span>
              )}

              <CardTitle className="relative z-10 mt-auto justify-end text-lg font-semibold text-white leading-tight line-clamp-2">
                {ideaTitle}
              </CardTitle>

              <CardFooter className="relative z-10 flex items-center justify-between bg-black/30 backdrop-blur-md py-1.5 px-2 rounded-md">
                <div>
                  <div className="text-sm font-medium text-white">Audience</div>
                  <div className="text-xs text-white/60">{audience}</div>
                </div>
                <Link href={`/ideas/${_id}`}>
                    <Button
                  className="bg-white text-[#101828] font-medium"
                  size="sm"
                  variant="solid"
                >
                  View Details
                </Button>
                </Link>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TrendingSectionCard;
