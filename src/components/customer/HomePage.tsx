import { bestSellingProducts, exploreProducts } from "@/data/demo.products";
import FlashSalesSection from "@/components/Homepage/FlashSalesSection";
import BrowseCategorySection from "@/components/Homepage/BrowseCategorySection";
import ProductGridSection from "@/components/Homepage/ProductGridSection";
import NewArrivalSection from "@/components/Homepage/NewArrivalSection";
import HeroSection from "@/components/Homepage/HeroSection";
import { Separator } from "../ui/separator";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />

        <div className="mt-8">
          <div className="w-full">
            <FlashSalesSection />
            <Separator />
            <BrowseCategorySection />
            <Separator />
            <ProductGridSection
              badge="This Month"
              title="Best Selling Products"
              products={bestSellingProducts}
              showViewAll
            />
            <ProductGridSection
              badge="Our Products"
              title="Explore Our Products"
              products={exploreProducts}
              showViewAll
            />
            <NewArrivalSection />
          </div>
        </div>
      </div>
    </div>
  );
}
