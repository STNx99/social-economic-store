import { ChevronRight } from 'lucide-react'
import { categories } from '../../data/demo.products'

export default function CategorySidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-3 flex flex-col">
      <nav className="space-y-1 flex-1">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-200 cursor-pointer transition-colors group"
          >
            <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors">{category.name}</span>
            {(category.name === "Woman's Fashion" || category.name === "Men's Fashion") && (
              <ChevronRight
                size={16}
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
              />
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

