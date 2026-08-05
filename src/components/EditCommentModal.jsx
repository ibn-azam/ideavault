"use client";

import { Button, Modal, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export function EditCommentModal({ comment }) {
  const router = useRouter();

  const handleSubmitComment = async (e) => {
    const { data: tokenData } = await authClient.token();
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updatedComment = {
      comment: formData.get("comment"),
    };

    const res = await fetch(
      `http://localhost:5000/comment/${comment._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(updatedComment),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      toast.success("Comment updated successfully");
      router.refresh();
    } else {
      toast.error("Failed to update comment");
    }
  };

  return (
    <Modal>
      <Button
        isIconOnly
        variant="ghost"
        className="border border-[#4F46E5] text-[#4F46E5] hover:bg-[#4F46E5] hover:text-white"
      >
        <FaEdit />
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />

            <Modal.Header>

              <Modal.Heading>Edit Comment</Modal.Heading>
            </Modal.Header>

            <Modal.Body>
              <form onSubmit={handleSubmitComment}>
                <TextArea
                    className="h-32 w-full"
                  defaultValue={comment.comment}
                  name="comment"
                  placeholder="Type your comment..."
                />

                <Button
                slot="close"
                  type="submit"
                  className="my-2 bg-[#4F46E5] text-white"
                >
                  Update Comment
                </Button>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}