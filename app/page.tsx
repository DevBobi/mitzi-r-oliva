'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery3D from '@/components/Gallery3D'
import Wishes from '@/components/Wishes'
import Footer from '@/components/Footer'
import ConfettiEffect from '@/components/ConfettiEffect'
import AnimatedBackground from '@/components/AnimatedBackground'
import ParticleBackground from '@/components/ParticleBackground'
import CursorTrail from '@/components/CursorTrail'
import BirthdayCountdown from '@/components/BirthdayCountdown'
import MusicPlayer from '@/components/MusicPlayer'
import FireworksMode from '@/components/FireworksMode'
import FloatingCandles from '@/components/FloatingCandles'
import { motion, AnimatePresence } from 'framer-motion'

export default function Home() {
  const [isBlurred, setIsBlurred] = useState(false)

  useEffect(() => {
    // Smooth scroll polyfill for older browsers
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Add page load animation
    document.body.style.overflow = 'hidden'
    setTimeout(() => {
      document.body.style.overflow = 'auto'
    }, 1000)

    // Listen for celebrate event
    const handleCelebrate = () => {
      setIsBlurred(true)
      setTimeout(() => {
        setIsBlurred(false)
      }, 3000)
    }

    window.addEventListener('celebrate', handleCelebrate)
    return () => window.removeEventListener('celebrate', handleCelebrate)
  }, [])

  return (
    <main>
      {/* Blur Backdrop Overlay */}
      <AnimatePresence>
        {isBlurred && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
              zIndex: 9998,
              pointerEvents: 'none'
            }}
          />
        )}
      </AnimatePresence>

      {/* Background Effects */}
      <AnimatedBackground />
      <ParticleBackground />
      <FloatingCandles />
      
      {/* Interactive Effects */}
      <CursorTrail />
      <ConfettiEffect />
      <FireworksMode />
      
      {/* Fixed UI Elements */}
      <BirthdayCountdown />
      <MusicPlayer />
      
      {/* Main Content */}
      <Navbar />
      <Hero />
      <About />
      <Gallery3D />
      <Wishes />
      <Footer />
    </main>
  )
}

