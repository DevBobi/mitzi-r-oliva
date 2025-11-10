'use client'

import { useEffect } from 'react'

export default function ConfettiEffect() {
  useEffect(() => {
    let confetti: any = null

    // Dynamically import canvas-confetti only on client side
    import('canvas-confetti').then((module) => {
      confetti = module.default

      // Initial confetti burst on page load
      setTimeout(() => {
        fireConfetti(confetti)
      }, 1000)

      // Listen for celebrate button clicks
      const handleCelebrate = () => {
        fireConfetti(confetti, true)
      }

      window.addEventListener('celebrate', handleCelebrate)

      return () => {
        window.removeEventListener('celebrate', handleCelebrate)
      }
    })
  }, [])

  const fireConfetti = (confettiInstance: any, intense: boolean = false) => {
    const count = intense ? 200 : 100
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999
    }

    function fire(particleRatio: number, opts: any) {
      confettiInstance({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      })
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    fire(0.2, {
      spread: 60,
    })

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    })

    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    })

    // Additional bursts for intense celebration
    if (intense) {
      setTimeout(() => {
        fire(0.2, {
          spread: 80,
          startVelocity: 35,
        })
      }, 300)

      setTimeout(() => {
        fire(0.15, {
          spread: 100,
          startVelocity: 40,
        })
      }, 600)
    }
  }

  return null
}

