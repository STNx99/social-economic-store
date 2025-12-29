import { useState, useEffect } from 'react'

export default function FlashSalesCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev

        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
          if (minutes < 0) {
            minutes = 59
            hours--
            if (hours < 0) {
              hours = 23
              days--
              if (days < 0) {
                days = 0
              }
            }
          }
        }

        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="flex flex-col items-center">
      <span className="text-gray-900 text-xs font-normal mb-1">{label}</span>
      <div className="text-gray-900 font-bold text-3xl min-w-[50px] text-center">
        {String(value).padStart(2, '0')}
      </div>
    </div>
  )

  const Colon = () => (
    <div className="flex items-end mb-1">
      <span className="text-red-500 font-bold text-2xl">:</span>
    </div>
  )

  return (
    <div className="flex items-end gap-2">
      <TimeUnit label="Days" value={timeLeft.days} />
      <Colon />
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <Colon />
      <TimeUnit label="Minutes" value={timeLeft.minutes} />
      <Colon />
      <TimeUnit label="Seconds" value={timeLeft.seconds} />
    </div>
  )
}

