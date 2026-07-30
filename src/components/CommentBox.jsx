"use client";
import { Button, TextArea } from "@heroui/react";

export function CommnetBox() {
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const comment = Object.fromEntries(formData.entries());

    const res = await fetch("http://localhost:5000/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    });
    const data = await res.json();
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
