import { Comments } from '@/components/Comments';
import { auth } from '@/lib/auth';
import { Button, Card } from '@heroui/react';
import { headers } from 'next/headers';
import Image from 'next/image';
import React from 'react';
import { formatDistanceToNow } from "date-fns";
import { DeleteCommentDialog } from '@/components/DeleteCommentDialog';
import Link from 'next/link';
import { EditCommentModal } from '@/components/EditCommentModal';

const MyInteractionsPage = async() => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    const {token} = await auth.api.getToken({
        headers: await headers(),
      })

    const user = session?.user
    

    const res = await fetch(`http://localhost:5000/comment/${user?.id}`,{
      headers:{
        authorization : `Bearer ${token}`
      }
    })
    const comments = await res.json()
    
    return (
        <div className='container mx-auto my-4'>
            <h2 className="text-center text-2xl font-bold my-4 text-[#101828]">My Interactions</h2>
            <Card className="w-full items-stretch md:flex justify-between my-4">
                  {comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="space-y-1 border-b border-gray-400 pb-4"
                    >
                      <div className="flex justify-between gap-3 ">
                        <Card.Header className="gap-1">
                          <div className="flex items-center gap-2">
                            <div className="relative h-10 w-10  shrink-0 overflow-hidden rounded-full sm:h-10 sm:w-10">
                              <Image
                                width={50}
                                height={50}
                                alt="Cherries"
                                className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
                                loading="lazy"
                                src={comment.userImage}
                              />
                            </div>
                            <div>
                              <Card.Title className="text-lg font-medium">{comment.userName}</Card.Title>
                              <Card.Description>
                                {formatDistanceToNow(new Date(comment.createdAt), {
                                  addSuffix: true,
                                })}
                              </Card.Description>
                            </div>
                          </div>
            
                          <Link href={`/ideas/${comment.ideaId}`}>
                                <Card.Title className="mt-2 text-xl font-semibold">
                            {comment.ideaTitle}
                          </Card.Title>
                          </Link>
                          <Card.Description className="mt-2 text-lg font-medium">
                            {comment.comment}
                          </Card.Description>
                        </Card.Header>
                        <Card.Footer className="mt-auto flex gap-2 items-center">
                          <EditCommentModal comment={comment}/>
                          <DeleteCommentDialog comment={comment}/>
                        </Card.Footer>
                      </div>
                    </div>
                  ))}
                </Card>
        </div>
    );
};

export default MyInteractionsPage;