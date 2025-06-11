import Banner from "@/components/homeSection/Banner";
import FeatureSection from "@/components/homeSection/FeatureSection";
import FoodRushOverview from "@/components/homeSection/FoodRushOverview";
import PartnershipSection from "@/components/homeSection/PartnershipSection";



export default function Home() {
  return (
    <div>
      <Banner/>
      <PartnershipSection/>
      <FeatureSection/>
      <FoodRushOverview/>
      
    </div>
  );
}
