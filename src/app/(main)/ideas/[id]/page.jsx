import { CommnetBox } from "@/components/CommentBox";
import { Comments } from "@/components/Comments";
import { DeleteDialog } from "@/components/DeleteDialog";
import { EditModal } from "@/components/EditModal";
import { auth } from "@/lib/auth";
import { Button, Card } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const IdeaDetailsPage = async ({ params }) => {

  const session = await auth.api.getSession({
  headers: await headers(),
});

  const {token} = await auth.api.getToken({
    headers: await headers()
  })
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/idea/${id}`,{
    headers:{
      authorization : `Bearer ${token}`
    }
  });
  const idea = await res.json();
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
      <div className="max-w-4xl my-4 mx-4  sm:mx-auto flex justify-between items-center">
        <Link href={"/ideas"}>
          <Button
            variant="ghost"
            className=" sm:w-auto text-[#4F46E5] border-2 rounded-md"
          >
            <FaArrowLeft /> Back To Ideas
          </Button>
        </Link>

        <div className="flex items-center justify-center gap-1">
          <EditModal idea={idea} />
          <DeleteDialog idea={idea} />
        </div>
      </div>
      <Card className="max-w-4xl my-4 mx-4  sm:mx-auto backdrop-blur-md border">
        <Image
          className="rounded-t-lg w-full sm:h-100"
          src={imageUrl}
          alt={ideaTitle}
          width={500}
          height={400}
        />
        <div className="flex flex-1 flex-col gap-3 space-y-4">
          <Card.Header className="gap-1 mt-4">
            <Card.Title className="pr-8 text-3xl font-semibold">
              {ideaTitle}
            </Card.Title>
            <Card.Description className="text-title/60">{audience}</Card.Description>
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
              <h3 className="font-semibold text-title text-xl">Short Description</h3>

              <p className="text-title/80 text-md mt-1 line-clamp-2">
                {shortDescription}
              </p>
            </div>
            {/* Detailed Description */}
            <div className="mt-2">
              <h3 className="text-xl font-semibold text-title">
                Detailed Description
              </h3>

              <p className="text-md text-title/80 line-clamp-2 mt-1">
                {detailedDescription}
              </p>
            </div>
            {/* Problem */}
            <div className="mt-4 p-3 rounded-lg background border">
              <h4 className="font-semibold text-red-600">❗Problem</h4>

              <p className="text-sm text-title/80 line-clamp-2">
                {problemStatement}
              </p>
            </div>

            {/* Solution */}
            <div className="mt-3 p-3 rounded-lg background border">
              <h4 className="font-semibold text-green-600">✅ Solution</h4>

              <p className="text-sm text-title/80 line-clamp-2">
                {proposedSolution}
              </p>
            </div>
          </Card.Footer>
        </div>
      </Card>
      <Card className="max-w-4xl my-4 mx-4  sm:mx-auto border backdrop-blur-md">
        <h2 className="text-lg font-medium">Comment</h2>
        <CommnetBox idea={idea}/>
        <Comments idea={idea}/>
      </Card>
    </div>
  );
};

export default IdeaDetailsPage;
