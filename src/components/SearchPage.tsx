import { useSearch } from '@tanstack/react-router'
import { useMemo } from 'react'
import { 
  flashSaleProducts, 
  bestSellingProducts, 
  exploreProducts,
} from '@/data/demo.products'
import { categories as sidebarCategories } from '@/data/demo.categories'
import { getCategorySearchTerms } from '@/data/category.search.map'
import SearchSection from './SearchPage/search_section'

export default function SearchPage() {
  const { q } = useSearch({ from: '/search' })
  
  // Combine all products
  const allProducts = useMemo(() => {
    return [...flashSaleProducts, ...bestSellingProducts, ...exploreProducts]
  }, [])

  // Check if the search query is a category name
  const isCategorySearch = useMemo(() => {
    if (!q || q.trim() === '') return false
    return sidebarCategories.some(cat => cat.name.toLowerCase() === q.toLowerCase().trim())
  }, [q])

  // Find matching products
  const searchResults = useMemo(() => {
    if (!q || q.trim() === '') return []
    
    const query = q.toLowerCase().trim()
    const queryWords = query.split(/\s+/).filter(word => word.length > 0)
    
    // Get search terms for category if it's a category search
    const categorySearchTerms = isCategorySearch 
      ? getCategorySearchTerms(q.trim()) 
      : []
    
    return allProducts.filter(product => {
      const productName = product.name.toLowerCase()
      const productCategory = product.category.toLowerCase()
      
      // If it's a category search, use the mapped search terms
      if (isCategorySearch && categorySearchTerms.length > 0) {
        return categorySearchTerms.some(term => 
          productName.includes(term) || productCategory.includes(term)
        )
      }
      
      // First, check for exact category match (case-insensitive)
      if (productCategory === query) {
        return true
      }
      
      // Check if query matches category name
      if (productCategory.includes(query) || query.includes(productCategory)) {
        return true
      }
      
      // Check if all query words are found in name or category
      return queryWords.some(word => 
        productName.includes(word) || productCategory.includes(word)
      ) || productName.includes(query)
    })
  }, [q, allProducts, isCategorySearch])

  // Get category from search results (most common category or first result's category)
  const category = useMemo(() => {
    if (searchResults.length === 0) return null
    
    // Count category occurrences
    const categoryCount = new Map<string, number>()
    searchResults.forEach(product => {
      const count = categoryCount.get(product.category) || 0
      categoryCount.set(product.category, count + 1)
    })
    
    // Get the most common category
    let maxCount = 0
    let mostCommonCategory = searchResults[0].category
    categoryCount.forEach((count, cat) => {
      if (count > maxCount) {
        maxCount = count
        mostCommonCategory = cat
      }
    })
    
    return mostCommonCategory
  }, [searchResults])

  // Get related products from same category (excluding the search results)
  const relatedProducts = useMemo(() => {
    if (!category) return []
    
    const searchResultIds = new Set(searchResults.map(p => p.id))
    return allProducts.filter(
      product => 
        product.category === category && 
        !searchResultIds.has(product.id)
    ).slice(0, 8) // Limit to 8 related products
  }, [category, searchResults, allProducts])

  return (
    <div className="container mx-auto px-4 py-8">
      {q && q.trim() !== '' ? (
        <SearchSection
          searchQuery={q}
          searchResults={searchResults}
          relatedProducts={relatedProducts}
          category={category}
          isCategorySearch={isCategorySearch}
        />
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Please enter a search query.</p>
        </div>
      )}
    </div>
  )
}

