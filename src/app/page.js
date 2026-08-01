import Banner from "@/components/Banner";
import FaqSection from "@/components/FaqSection ";
import StatsSection from "@/components/StatsSection";
import TrendingSection from "@/components/TrendingSection";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-3xl text-center">
     <Banner/>
     <TrendingSection/>
     <StatsSection/>
     <FaqSection/>
    </div>
  );
}
