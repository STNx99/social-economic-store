import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import Banner1 from '@/components/Homepage/banner_1'
import Banner2 from '@/components/Homepage/banner_2'
import CategorySidebar from '@/components/Homepage/category_sidebar'
import FlashSalesCountdown from '@/components/Homepage/flashsales'
import ProductCard from '@/components/Homepage/product_card'
import Footer from '@/components/Homepage/footer'
import { flashSaleProducts, bestSellingProducts, exploreProducts } from '@/data/demo.products'
import { categories, iconMap } from '@/data/demo.categories'
import { newArrivalBanners } from '@/data/demo.newarrival'

export const Route = createFileRoute('/')({ component: HomePage })

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('Camera')
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Content with Sidebar */}
        <div className="flex gap-8 items-start">
          {/* Left Column: Category Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <CategorySidebar />
          </div>

          {/* Right Column: Banner */}
          <div className="flex-1">
            {/* Banner 1 */}
            <Banner1 />
          </div>
        </div>

        {/* Flash Sales Section and Other Content - starts from left */}
        <div className="mt-8">
          <div className="w-full">
            <section className="mb-16">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div className="flex gap-3">
                  <div className="w-5 h-12 rounded flex-shrink-0" style={{ backgroundColor: '#DB4444' }}></div>
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-base font-bold" style={{ color: '#DB4444' }}>Today's</span>
                  </div>
                </div>
              </div>
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
                <button className="bg-red-500 text-white py-3 px-8 rounded-lg font-semibold hover:bg-red-600 transition-colors">
                  View All Products
                </button>
              </div>
            </section>
            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>
            {/* Browse By Category Section */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                  <div className="w-5 h-12 rounded flex-shrink-0" style={{ backgroundColor: '#DB4444' }}></div>
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-base font-bold" style={{ color: '#DB4444' }}>Categories</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-4xl font-bold text-gray-900">Browse By Category</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {categories.map(({ name, iconName }) => {
                  const Icon = iconMap[iconName]
                  const isSelected = selectedCategory === name
                  return (
                    <div
                      key={name}
                      onClick={() => setSelectedCategory(name)}
                      className={`bg-white border rounded-lg p-4 text-center hover:border-red-500 transition-colors cursor-pointer ${
                        isSelected ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                        isSelected ? 'bg-red-500' : 'bg-gray-100'
                      }`}>
                        <Icon size={32} className={isSelected ? 'text-white' : 'text-gray-600'} />
                      </div>
                      <p className="text-sm font-medium text-gray-700">{name}</p>
                    </div>
                  )
                })}
              </div>
            </section>
            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>
            {/* Best Selling Products */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                  <div className="w-5 h-12 rounded flex-shrink-0" style={{ backgroundColor: '#DB4444' }}></div>
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-base font-bold" style={{ color: '#DB4444' }}>This Month</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <h2 className="text-4xl font-bold text-gray-900">Best Selling Products</h2>
                 <div className="flex justify-end">
                <button 
                  className="text-white py-3 px-8 rounded font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#DB4444' }}
                >
                  View All
                </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bestSellingProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* Banner 2 */}
            <Banner2 />

            {/* Explore Products */}
            <section className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-3">
                  <div className="w-5 h-12 rounded flex-shrink-0" style={{ backgroundColor: '#DB4444' }}></div>
                  <div className="flex flex-col justify-center gap-1">
                    <span className="text-base font-bold" style={{ color: '#DB4444' }}>Our Products</span>
                  </div>
                </div>
                </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-4xl font-bold text-gray-900">Explore Our Products</h2>
                <div className="flex justify-end">
                <button 
                  className="text-white py-3 px-8 rounded font-semibold hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#DB4444' }}
                >
                  View All
                </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {exploreProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </section>

            {/* New Arrival Section */}
            <section className="mb-16">
              <div className="flex gap-3 mb-6">
                <div className="w-5 h-12 rounded flex-shrink-0" style={{ backgroundColor: '#DB4444' }}></div>
                <div className="flex flex-col justify-center gap-1">
                  <span className="text-base font-bold" style={{ color: '#DB4444' }}>Featured</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <h2 className="text-4xl font-bold text-gray-900">New Arrival</h2>
              </div>
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
                      className={`${colSpanClass} ${rowSpanClass} rounded-lg overflow-hidden relative ${banner.height}`}
                    >
                      <img
                        src={banner.image}
                        alt={banner.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className={`absolute inset-0 flex flex-col justify-end z-10 ${
                        isLarge ? 'pb-6 lg:pb-8 px-6 lg:px-8' : isMedium ? 'pb-6 px-6' : 'pb-4 px-4'
                      }`}>
                        <h3 className={`font-bold text-white mb-2 ${
                          isLarge ? 'text-2xl lg:text-3xl' : isMedium ? 'text-xl' : 'text-lg'
                        }`}>
                          {banner.title}
                        </h3>
                        <p className={`text-white ${
                          isLarge ? 'text-sm mb-6' : isMedium ? 'text-sm mb-4' : 'text-xs mb-3'
                        }`}>
                          {banner.description}
                        </p>
                        <button className={`text-white underline underline-offset-4 hover:opacity-80 transition-opacity w-fit ${
                          isSmall ? 'text-sm' : ''
                        }`}>
                          Shop Now
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
