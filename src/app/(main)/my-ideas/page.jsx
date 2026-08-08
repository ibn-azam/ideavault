import { IdeaCard } from "@/components/IdeaCard";
import { MyIdeaCard } from "@/components/MyIdeaCard";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyIdeasPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const {token} = await auth.api.getToken({
    headers: await headers(),
  })

  const user = session?.user;

  const res = await fetch(`http://localhost:5000/my-ideas/${user.id}`,{
    headers:{
      authorization : `Bearer ${token}`
    }
  });
  const myIdeas = await res.json();
  return (
    <div className="container mx-auto my-4">
      <h2 className="text-center text-4xl font-bold my-2 text-title">
        My Ideas
      </h2>
      <div className="grid grid-cols-1 gap-2 m-4  sm:grid-cols-3 sm:gap-4 sm:my-4">
        {myIdeas.map((idea) => (
          <MyIdeaCard idea={idea} key={idea._id}></MyIdeaCard>
        ))}
      </div>
    </div>
  );
};

export default MyIdeasPage;
