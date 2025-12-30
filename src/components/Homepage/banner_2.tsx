import { Button } from '../ui/button'

export default function MusicBanner() {
  return (
    <div className="bg-black text-white rounded-lg overflow-hidden relative mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
        <div>
          <span className="inline-block text-green-500 text-sm font-semibold mb-4">
            Categories
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Enhance Your<br />Music Experience
          </h2>
          
          <div className="flex gap-4 mb-6">
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
                <span className="text-black text-lg font-bold">00</span>
                <span className="text-black text-xs">Hours</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
                <span className="text-black text-lg font-bold">00</span>
                <span className="text-black text-xs">Days</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
                <span className="text-black text-lg font-bold">00</span>
                <span className="text-black text-xs">Minutes</span>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-20 h-20 flex flex-col items-center justify-center">
                <span className="text-black text-lg font-bold">00</span>
                <span className="text-black text-xs">Seconds</span>
              </div>
            </div>
          </div>

          <Button
            variant="destructive"
            size="lg"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Buy Now
          </Button>
        </div>
        <div className="flex justify-center lg:justify-end">
          <img
            src="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600"
            alt="JBL Speaker"
            className="h-80 lg:h-96 object-contain"
          />
        </div>
      </div>
    </div>
  )
}

