'use client'
import { Button, Card, CloseButton } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

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
        proposedSolution } = idea;
    return (
        <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
        <Card className="w-full  items-stretch md:flex-row">
            <div className="relative h-35 w-full shrink-0 overflow-hidden rounded-2xl sm:h-30 sm:w-30">
                <Image
            fill
            alt={ideaTitle || 'Idea thumbnail'}
            className="object-cover"
            sizes="(max-width: 640px) 100vw, 192px"
            src={imageUrl || '/fallback-image.jpg'}
          />
            </div>
            <div className="flex flex-1 flex-col gap-3">
                <Card.Header className="gap-1">
                    <Card.Title className="pr-8 text-lg font-semibold">{ideaTitle}</Card.Title>
                    <Card.Description>
                        {audience}
                    </Card.Description>
                    <div className="flex items-center gap-1 mt-4">
      <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
        {category}
      </span>

      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
        💰 {budget}
      </span>
    </div>
                </Card.Header>
                <Card.Footer className="mt-auto  flex w-full flex-col items-start gap-3  sm:w-40
                 sm:flex-col sm:items-left sm:justify-between">
                     {/* Short Description */}
                    <div className="mt-2">
      <h3 className="font-semibold text-gray-700">
        Short Description
      </h3>

      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
        {shortDescription}
      </p>
    </div>
     {/* Detailed Description */}
    <div className="mt-2">
      <h3 className="font-semibold text-gray-700">
        Detailed Description
      </h3>

      <p className="text-sm text-gray-600 line-clamp-2 mt-1 sm:w-60">
        {detailedDescription}
      </p>
    </div>
  
   
                   <Link href={`/ideas/${_id}`}>
                         <Button className="w-full sm:w-auto bg-[#4F46E5]">View Details</Button>
                   </Link>
                </Card.Footer>
            </div>
        </Card>
        </motion.div>
    );
}