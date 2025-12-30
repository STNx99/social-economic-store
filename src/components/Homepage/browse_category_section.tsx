import { useState } from "react";
import SectionHeader from "./section_header";
import { categories, iconMap } from "@/data/demo.categories";
import { cn } from "@/lib/utils";

export default function BrowseCategorySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Camera");

  return (
    <section className="mb-16">
      <SectionHeader badge="Categories" title="Browse By Category" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map(({ name, iconName }) => {
          const Icon = iconMap[iconName];
          const isSelected = selectedCategory === name;
          return (
            <div
              key={name}
              onClick={() => setSelectedCategory(name)}
              className={cn(
                "bg-white border rounded-lg p-4 text-center hover:border-red-500 transition-colors cursor-pointer",
                isSelected ? "border-red-500 bg-red-50" : "border-gray-200",
              )}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-lg mx-auto mb-2 flex items-center justify-center",
                  isSelected ? "bg-red-500" : "bg-gray-100",
                )}
              >
                <Icon
                  size={32}
                  className={cn(isSelected ? "text-white" : "text-gray-600")}
                />
              </div>
              <p className="text-sm font-medium text-gray-700">{name}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}