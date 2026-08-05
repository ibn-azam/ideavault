"use client";

import { authClient } from "@/lib/auth-client";
import {AlertDialog, Button} from "@heroui/react";

import {  useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";

export function DeleteCommentDialog({comment}) {
    const {_id} = comment;
    const router = useRouter();
    const handleDelete = async()=>{
     const { data: tokenData } = await authClient.token();
         const res = await fetch(`http://localhost:5000/comment/${_id}`, {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                    authorization : `Bearer ${tokenData?.token}`
                  },
                });
                const data = await res.json();
                toast.success("Comment deleted successfully");
                router.refresh();
    }
  return (
    <AlertDialog>
      <Button isIconOnly variant="danger">
                  <MdDeleteForever />
                </Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                
                Delete Comment Permanently?
                </AlertDialog.Heading>
            </AlertDialog.Header>
            
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