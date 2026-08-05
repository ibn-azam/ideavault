"use client";
import { authClient } from "@/lib/auth-client";
import { Button, TextArea } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function CommnetBox({ idea }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (!idea) return null;
  const { _id, ideaTitle } = idea;

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("No user session — can't submit comment");
      return;
    }
    const formData = new FormData(e.currentTarget);
    const comment = Object.fromEntries(formData.entries());

    const commentData = {
      userId: user.id,
      userImage: user.image,
      userName: user.name,
      createdAt: new Date(),
      ideaId: _id,
      ideaTitle,
      ...comment,
    };

    const { data: tokenData } = await authClient.token();

    const res = await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization : `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(commentData),
    });
    const data = await res.json();
    toast.success("Comment Posted Successfully");
    router.refresh();
  };
  return (
    <form onSubmit={handleSubmitComment}>
      <TextArea
        name="comment"
        aria-label="Comment on ideavault project"
        className="h-32 w-full"
        placeholder="Type Your Comment Here..."
      />
      <Button
        type="submit"
        variant="outline"
        className=" my-2 bg-[#4F46E5] text-white rounded-lg"
      >
        Post Comment
      </Button>
    </form>
  );
}
