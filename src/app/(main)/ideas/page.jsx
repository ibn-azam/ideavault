import IdeasContainer from "@/components/IdeasContainer";

const IdeasPage = async () => {
  const res = await fetch("http://localhost:5000/idea", {
    cache: "no-store",
  });

  const ideas = await res.json();

  return (
    <div className="container mx-auto my-4">
      <h2 className="text-center text-2xl font-bold my-2 text-[#101828]">
        Ideas
      </h2>

      <IdeasContainer initialIdeas={ideas} />
    </div>
  );
};

export default IdeasPage;
