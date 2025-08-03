import Banner from "@/components/homeSection/Banner";
import DeliveryLocation from "@/components/homeSection/DeliveryLocation";
import FeatureSection from "@/components/homeSection/FeatureSection";
import FoodRushOverview from "@/components/homeSection/FoodRushOverview";
import PartnershipSection from "@/components/homeSection/PartnershipSection";
import Slider from "@/components/Slider";



export default function Home() {
  return (
    <div>
      <Banner/>
      <PartnershipSection/>
      {/* <Slider/> */}
      <FeatureSection/>
      <DeliveryLocation/>
      <FoodRushOverview/>
      
    </div>
  );
}
