"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { redirect, useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

export function DeleteDialog({ idea }) {
  const router = useRouter();
  const { _id, ideaTitle } = idea;
  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();

    const res = await fetch(`http://localhost:5000/idea/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${tokenData.token}`,
      },
      body: JSON.stringify(idea),
    });
    const data = await res.json();
    console.log(data);
    toast.success("Idea deleted successfully");
    router.push("/ideas");
  };
  return (
    <AlertDialog>
      <Button variant="danger" className="w-full sm:w-auto rounded-md">
        <MdDeleteForever /> Delete
      </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                <h4>Delete {ideaTitle} Permanently?</h4>
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Awesome Idea</strong>{" "}
                and all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Idea
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
