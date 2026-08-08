import IdeasContainer from "@/components/IdeasContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const IdeasPage = async () => {
  const {token} = await auth.api.getToken({
      headers: await headers(),
    })
  const res = await fetch("http://localhost:5000/idea",{
    headers:{
      authorization : `Bearer ${token}`
    }
  }, {
    cache: "no-store",
  });

  const ideas = await res.json();

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-center text-4xl font-bold my-2 text-title">
        Ideas
      </h2>

      <IdeasContainer initialIdeas={ideas} />
    </div>
  );
};

export default IdeasPage;
