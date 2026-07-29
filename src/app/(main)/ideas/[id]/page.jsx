import { EditModal } from "@/components/EditModal";
import { Button, Card } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";

const IdeaDetailsPage = async ({ params }) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/idea/${id}`);
  const idea = await res.json();
  console.log(idea);
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
    <div>
      <div className="max-w-4xl my-4 mx-4  sm:mx-auto flex justify-between items-center ">
        <Link href={'/ideas'}>
          <Button variant='ghost' className=" sm:w-auto text-[#4F46E5] border-2 rounded-md"><FaArrowLeft/> Back To Ideas</Button>
        </Link>
        
        <div className="flex items-center justify-center gap-1">
          
          <EditModal idea={idea}/>
          <Button variant="danger" className="w-full sm:w-auto rounded-md">
            <MdDeleteForever /> Delete
          </Button>
        </div>
      </div>
      <Card className="max-w-4xl my-4 mx-4  sm:mx-auto">
        <Image
          className="rounded-t-lg w-full sm:h-100"
          src={imageUrl}
          alt={ideaTitle}
          width={500}
          height={400}
        />
        <div className="flex flex-1 flex-col gap-3 space-y-4">
          <Card.Header className="gap-1 mt-4">
            <Card.Title className="pr-8 text-2xl font-semibold">
              {ideaTitle}
            </Card.Title>
            <Card.Description>{audience}</Card.Description>
            <div className="flex items-center gap-1 mt-4">
              <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                {category}
              </span>

              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                💰 {budget}
              </span>
            </div>
          </Card.Header>
          <Card.Footer
            className="mt-auto  flex w-full flex-col items-start gap-3  
                 sm:flex-col sm:items-left sm:justify-between"
          >
            {/* Short Description */}
            <div className="mt-2">
              <h3 className="font-semibold text-gray-700">Short Description</h3>

              <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                {shortDescription}
              </p>
            </div>
            {/* Detailed Description */}
            <div className="mt-2">
              <h3 className="font-semibold text-gray-700">
                Detailed Description
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {detailedDescription}
              </p>
            </div>
            {/* Problem */}
            <div className="mt-4 p-3 rounded-lg bg-red-50">
              <h4 className="font-semibold text-red-600">❗ Problem</h4>

              <p className="text-sm text-gray-600 line-clamp-2">
                {problemStatement}
              </p>
            </div>

            {/* Solution */}
            <div className="mt-3 p-3 rounded-lg bg-green-50">
              <h4 className="font-semibold text-green-600">✅ Solution</h4>

              <p className="text-sm text-gray-600 line-clamp-2">
                {proposedSolution}
              </p>
            </div>

            <Link href={`/ideas/${_id}`}>
              <Button className="w-full sm:w-auto bg-[#4F46E5]">
                View Details
              </Button>
            </Link>
          </Card.Footer>
        </div>
      </Card>
    </div>
  );
};

export default IdeaDetailsPage;
