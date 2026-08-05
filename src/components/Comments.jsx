import { Button, Card } from "@heroui/react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { DeleteCommentDialog } from "./DeleteCommentDialog";
import { EditCommentModal } from "./EditCommentModal";

export async function Comments({ idea }) {
  const {token} = await auth.api.getToken({
      headers: await headers(),
    })
  const { _id } = idea;

  const res = await fetch("http://localhost:5000/comment",{
    headers:{
      authorization : `Bearer ${token}`
    }
  }, {
    
    cache: "no-store",
  });

  const comments = await res.json();

  // Filter comments for the current idea
  const filteredComments = comments.filter(
    (comment) => comment.ideaId === _id
  );

  

  return (
    <Card className="w-full p-4">
      {filteredComments.length > 0 ? (
        filteredComments.map((comment) => (
          <div
            key={comment._id}
            className="space-y-2 border-b border-gray-300 pb-4 mb-4 last:border-b-0"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                  <Image
                    src={comment.userImage}
                    alt={comment.userName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>

                <div>
                  <Card.Title className="text-lg font-semibold">
                    {comment.userName}
                  </Card.Title>

                  <Card.Description className="text-sm text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), {
                      addSuffix: true,
                    })}
                  </Card.Description>

                  <p className="mt-2 text-gray-700">{comment.comment}</p>
                </div>
              </div>

              <div className="flex  gap-2">
                <EditCommentModal comment={comment}/>

                <DeleteCommentDialog comment={comment}/>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="py-6 text-center text-gray-500">
          No comments yet.
        </div>
      )}
    </Card>
  );
}