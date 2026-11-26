import { useEffect, useState } from 'react'

export default function useClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    let intervalId: number | undefined
    const stop = () => {
      if (intervalId !== undefined) {
        window.clearInterval(intervalId)
        intervalId = undefined
      }
    }
    const start = () => {
      stop()
      setNow(new Date())
      intervalId = window.setInterval(() => setNow(new Date()), 1000)
    }
    const handleVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    if (!document.hidden) start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      stop()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [])

  return now
}
