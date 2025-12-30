import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Banner1 from '@/components/Homepage/banner_1'
import Banner2 from '@/components/Homepage/banner_2'
import CategorySidebar from '@/components/Homepage/category_sidebar'
import FlashSalesCountdown from '@/components/Homepage/flashsales'
import ProductCard from '@/components/Homepage/product_card'
import Footer from '@/components/Homepage/footer'
import { Button } from '@/components/ui/button'
import { SidebarProvider } from '@/components/ui/sidebar'
import { flashSaleProducts, bestSellingProducts, exploreProducts } from '@/data/demo.products'
import { categories, iconMap } from '@/data/demo.categories'
import { newArrivalBanners } from '@/data/demo.newarrival'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/')({ component: HomePage })

// Section Header Component
interface SectionHeaderProps {
  badge?: string
  title?: string
  showViewAll?: boolean
}

function SectionHeader({ badge, title, showViewAll = false }: SectionHeaderProps) {
  return (
    <>
      {badge && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex gap-3">
            <div className="w-5 h-12 rounded flex-shrink-0 bg-[#DB4444]"></div>
            <div className="flex flex-col justify-center gap-1">
              <span className="text-base font-bold text-[#DB4444]">{badge}</span>
            </div>
          </div>
        </div>
      )}
      {title && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-4xl font-bold text-gray-900">{title}</h2>
          {showViewAll && (
            <div className="flex justify-end">
              <button className="bg-[#DB4444] text-white py-3 px-8 rounded font-semibold hover:opacity-90 transition-opacity">
                View All
              </button>
            </div>
          )}
        </div>
      )}
    </>
  )
}

// Divider Component
function Divider() {
  return <div className="border-t border-gray-200 my-8"></div>
}

// Flash Sales Section
function FlashSalesSection() {
  return (
    <section className="mb-16">
      <SectionHeader badge="Today's" />
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-28">
          <h2 className="text-4xl font-bold text-gray-900">Flash Sales</h2>
          <FlashSalesCountdown />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {flashSaleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-lg font-semibold">
          View All Products
        </Button>
      </div>
    </section>
  )
}

// Browse By Category Section
function BrowseCategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('Camera')
  
  return (
    <section className="mb-16">
      <SectionHeader badge="Categories" title="Browse By Category" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(({ name, iconName }) => {
          const Icon = iconMap[iconName]
          const isSelected = selectedCategory === name
          return (
            <div
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={cn(
                "bg-white border rounded-lg p-4 text-center hover:border-red-500 transition-colors cursor-pointer",
                isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200'
              )}
            >
              <div className={cn(
                "w-16 h-16 rounded-lg mx-auto mb-2 flex items-center justify-center",
                isSelected ? 'bg-red-500' : 'bg-gray-100'
              )}>
                <Icon size={32} className={cn(isSelected ? 'text-white' : 'text-gray-600')} />
              </div>
              <p className="text-sm font-medium text-gray-700">{name}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Product Grid Section (Reusable)
interface ProductGridSectionProps {
  badge?: string
  title: string
  products: typeof bestSellingProducts
  showViewAll?: boolean
}

function ProductGridSection({ badge, title, products, showViewAll = false }: ProductGridSectionProps) {
  return (
    <section className="mb-16">
      <SectionHeader badge={badge} title={title} showViewAll={showViewAll} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

// New Arrival Section
function NewArrivalSection() {
  return (
    <section className="mb-16">
      <SectionHeader badge="Featured" title="New Arrival" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {newArrivalBanners.map((banner) => {
          const isLarge = banner.colSpan === 2 && banner.rowSpan === 2
          const isMedium = banner.colSpan === 2 && banner.rowSpan === 1
          const isSmall = banner.colSpan === 1 && banner.rowSpan === 1
          
          const colSpanClass = banner.colSpan === 2 ? 'lg:col-span-2' : 'lg:col-span-1'
          const rowSpanClass = banner.rowSpan === 2 ? 'lg:row-span-2' : 'lg:row-span-1'
          
          return (
            <div
              key={banner.id}
              className={cn(colSpanClass, rowSpanClass, "rounded-lg overflow-hidden relative", banner.height)}
            >
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className={cn(
                "absolute inset-0 flex flex-col justify-end z-10",
                isLarge ? 'pb-6 lg:pb-8 px-6 lg:px-8' : isMedium ? 'pb-6 px-6' : 'pb-4 px-4'
              )}>
                <h3 className={cn(
                  "font-bold text-white mb-2",
                  isLarge ? 'text-2xl lg:text-3xl' : isMedium ? 'text-xl' : 'text-lg'
                )}>
                  {banner.title}
                </h3>
                <p className={cn(
                  "text-white",
                  isLarge ? 'text-sm mb-6' : isMedium ? 'text-sm mb-4' : 'text-xs mb-3'
                )}>
                  {banner.description}
                </p>
                <button className={cn(
                  "text-white underline underline-offset-4 hover:opacity-80 transition-opacity w-fit",
                  isSmall && 'text-sm'
                )}>
                  Shop Now
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

// Main HomePage Component
function HomePage() {
  return (
    <SidebarProvider className="!flex-col overflow-x-hidden">
      <div className="min-h-screen bg-white w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Content with Sidebar */}
          <div className="flex gap-8 items-start">
            <div className="hidden lg:block w-64 flex-shrink-0">
              <CategorySidebar />
            </div>
            <div className="flex-1">
              <Banner1 />
            </div>
          </div>

          {/* Content Sections */}
          <div className="mt-8">
            <div className="w-full">
              <FlashSalesSection />
              <Divider />
              <BrowseCategorySection />
              <Divider />
              <ProductGridSection
                badge="This Month"
                title="Best Selling Products"
                products={bestSellingProducts}
                showViewAll
              />
              <Banner2 />
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
    </SidebarProvider>
  )
}