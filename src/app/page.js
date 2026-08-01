import Banner from "@/components/Banner";
import TrendingSection from "@/components/TrendingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-3xl text-center">
     <Banner/>
     <TrendingSection/>
    </div>
  );
}
