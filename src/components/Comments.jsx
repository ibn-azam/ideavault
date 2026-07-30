import { Button, Card, CloseButton } from "@heroui/react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export async function Comments() {
  const res = await fetch("http://localhost:5000/comment");
  const comments = await res.json();

  return (
    <Card className="w-full items-stretch md:flex justify-between">
      {comments.map((comment) => (
        <div key={comment._id} className="">
          <div className="relative h-15 w-15  shrink-0 overflow-hidden rounded-2xl sm:h-15 sm:w-15">
            <Image
              width={100}
              height={100}
              alt="Cherries"
              className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
              loading="lazy"
              src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
            />
          </div>
          <div className="flex justify-between gap-3 ">
            <Card.Header className="gap-1">
              <Card.Title className="pr-8">Become an ACME Creator!</Card.Title>
              <Card.Description>{comment.comment}</Card.Description>
            </Card.Header>
            <Card.Footer className="mt-auto flex gap-2 items-center">
              <Button
                variant="ghost"
                className="w-auto border border-[#4F46E5] rounded-md text-[#4F46E5] hover:border-none hover:bg-[#4F46E5] hover:text-white"
              >
                <FaEdit />
              </Button>
              <Button variant="danger" className=" w-auto rounded-md">
                <MdDeleteForever />
              </Button>
            </Card.Footer>
          </div>
        </div>
      ))}
    </Card>
  );
}
