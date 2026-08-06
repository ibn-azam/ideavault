"use client";

import { authClient } from "@/lib/auth-client";
import EditProfile from "@/components/ProfileEdit";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        User not logged in
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-default-100 py-10 px-4">
      <EditProfile user={session.user} />
    </div>
  );
}