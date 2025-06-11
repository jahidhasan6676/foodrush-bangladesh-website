import Banner from "@/components/homeSection/Banner";
import DeliveryLocation from "@/components/homeSection/DeliveryLocation";
import FeatureSection from "@/components/homeSection/FeatureSection";
import FoodRushOverview from "@/components/homeSection/FoodRushOverview";
import PartnershipSection from "@/components/homeSection/PartnershipSection";



export default function Home() {
  return (
    <div>
      <Banner/>
      <PartnershipSection/>
      <FeatureSection/>
      <DeliveryLocation/>
      <FoodRushOverview/>
      
    </div>
  );
}
