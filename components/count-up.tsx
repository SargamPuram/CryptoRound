"use client"

import { useEffect, useState } from "react"

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
}

export default function CountUp({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  prefix = "",
  suffix = "",
  separator = "",
}: CountUpProps) {
  const [count, setCount] = useState(start)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const countUp = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const currentCount = progress * (end - start) + start

      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(countUp)
      }
    }

    animationFrame = requestAnimationFrame(countUp)

    return () => cancelAnimationFrame(animationFrame)
  }, [start, end, duration])

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals)
    if (separator) {
      const parts = fixed.split(".")
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
      return parts.join(".")
    }
    return fixed
  }

  return (
    <>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </>
  )
}
