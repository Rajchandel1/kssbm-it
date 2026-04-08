'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { SmoothScrollHero } from '@/components/smooth-scroll-hero'
import { CinematicLoader } from '@/components/cinematic-loader'

const LOADER_TOTAL_MS = 2400
const INTRO_SCROLL_DELAY_MS = 450
const INTRO_SCROLL_DURATION_MS = 5000

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const t = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = ''
    }, LOADER_TOTAL_MS)

    return () => {
      clearTimeout(t)
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (isLoading) return

    let animationFrame = 0

    const scrollTimer = window.setTimeout(() => {
      const introSection = document.getElementById('intro-reveal')
      if (!introSection) return

      const startY = window.scrollY
      const targetY =
        introSection.getBoundingClientRect().top + window.scrollY
      const distance = targetY - startY
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / INTRO_SCROLL_DURATION_MS, 1)
        const easedProgress = easeInOutCubic(progress)

        window.scrollTo(0, startY + distance * easedProgress)

        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(animateScroll)
        }
      }

      animationFrame = window.requestAnimationFrame(animateScroll)
    }, INTRO_SCROLL_DELAY_MS)

    return () => {
      window.clearTimeout(scrollTimer)
      window.cancelAnimationFrame(animationFrame)
    }
  }, [isLoading])

  return (
    <>
      <SmoothScrollHero />
      <AnimatePresence>
        {isLoading && <CinematicLoader />}
      </AnimatePresence>
    </>
  )
}
