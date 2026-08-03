"use client";

import { useEffect, useState } from "react";
import { Input, Select, SelectItem } from "@heroui/react";
import { IdeaCard } from "./IdeaCard";

export default function IdeasContainer({ initialIdeas }) {
  const [ideas, setIdeas] = useState(initialIdeas);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchIdeas = async () => {
      const res = await fetch(
        `http://localhost:5000/idea?search=${search}&category=${category}`
      );

      const data = await res.json();
      setIdeas(data);
    };

    fetchIdeas();
  }, [search, category]);

  return (
    <>
      <div className="container mx-auto w-lg sm:w-full grid grid-cols-3 sm:grid-cols-5 gap-2 my-4">
        <Input
        className='grid col-span-2 sm:col-span-4'
          placeholder="Search ideas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        
<select
  className="border rounded-lg p-2"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">All</option>
  <option value="Tech">Tech</option>
  <option value="AI">AI</option>
  <option value="Health">Health</option>
  <option value="Education">Education</option>
  <option value="Business">Business</option>
  <option value="Travel">Travel</option>
</select>
      </div>

      <div className="grid grid-cols-1 gap-2 m-4 sm:grid-cols-3 sm:gap-4">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </>
  );
}