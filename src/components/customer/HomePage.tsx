import Footer from "@/components/Homepage/footer";
import { bestSellingProducts, exploreProducts } from "@/data/demo.products";
import FlashSalesSection from "@/components/Homepage/flash_sales_section";
import BrowseCategorySection from "@/components/Homepage/browse_category_section";
import ProductGridSection from "@/components/Homepage/product_grid_section";
import NewArrivalSection from "@/components/Homepage/new_arrival_section";
import HeroSection from "@/components/Homepage/hero_section";
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
      <Footer />
    </div>
  );
}
