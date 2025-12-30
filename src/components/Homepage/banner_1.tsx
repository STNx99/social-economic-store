import { useState, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { bannerSlides } from '../../data/demo.banner'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const slide = bannerSlides[currentSlide]

  return (
    <div className="bg-black text-white rounded-lg overflow-hidden relative h-[350px] mb-8">
      <div className="relative z-20 h-full flex items-center px-6 transition-opacity duration-500">
        <div className="flex-1 max-w-lg">
          <div className="flex items-center gap-2 mb-2">
            {slide.brandLogo && (
              <img
                src={slide.brandLogo}
                alt={slide.brand}
                className="h-5 w-5 invert"
              />
            )}
            <span className="text-xs text-gray-300">{slide.subtitle}</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>
          <Button
            variant="secondary"
            size="default"
            className="bg-white text-black hover:bg-gray-100"
          >
            {slide.buttonText}
            <ArrowRight size={16} className="ml-2" />
          </Button>
        </div>
        <div className="flex-1 flex justify-end items-center pr-6 relative">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-[260px] object-contain relative z-10 transition-opacity duration-500"
          />
        </div>
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all cursor-pointer",
              index === currentSlide
                ? 'bg-red-500 border border-white'
                : 'bg-gray-500 hover:bg-gray-400'
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

