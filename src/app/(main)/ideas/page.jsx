import { DropdownCategory } from "@/components/ProfileDropdown";
import { IdeaCard } from "@/components/IdeaCard";
import { Dropdown, Input } from "@heroui/react";
import React from "react";

const IdeasPage = async() => {
  const res = await fetch("http://localhost:5000/idea");
  const ideas = await res.json();
  return (
    <div className="container mx-auto my-4">
      <h2 className="text-center text-2xl font-bold my-2 text-[#101828]">
        Ideas
      </h2>
      <Input className="w-full" placeholder="Search Here......" />
      <div className="grid grid-cols-1 gap-2 m-4  sm:grid-cols-3 sm:gap-4 sm:my-4">
        {ideas.map((idea) => (
          <IdeaCard idea={idea} key={idea._id}>
          </IdeaCard>
        ))}
      </div>
    </div>
  );
};

export default IdeasPage;
