import { Button, Card } from "@heroui/react";
import Image from "next/image";
import React from "react";
import TrendingSectionCard from "./TrendingSectionCard";

const TrendingSection = async () => {
  const res = await fetch("http://localhost:5000/trending");

  if (!res.ok) {
    throw new Error("Failed to fetch trending startups");
  }

  const trends = await res.json();

  return (
    <div className="container mx-auto my-4">
      <TrendingSectionCard trends={trends} />
    </div>
  );
};

export default TrendingSection;
