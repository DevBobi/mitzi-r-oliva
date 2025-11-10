'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Hero.module.css'

export default function Hero() {
  const [celebrating, setCelebrating] = useState(false)
  const [currentQuote, setCurrentQuote] = useState(0)

  const bestieQuotes = [
    "To my bestie who lights up every room! 🌟",
    "The world is brighter because you're in it! ✨",
    "Here's to the most amazing soul I know! 💖",
    "You make life a beautiful adventure! 🎨",
    "Grateful for every moment with you! 🌈"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % bestieQuotes.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [bestieQuotes.length])

  const handleCelebrate = () => {
    setCelebrating(true)
    window.dispatchEvent(new CustomEvent('celebrate'))
    
    setTimeout(() => {
      setCelebrating(false)
    }, 3000)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  }

  const balloonVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: (custom: number) => ({
      y: [0, -20, 0],
      opacity: 1,
      transition: {
        y: {
          repeat: Infinity,
          duration: 3 + custom * 0.5,
          ease: 'easeInOut'
        },
        opacity: {
          duration: 0.5
        }
      }
    })
  }

  const letterVariants = {
    hover: {
      scale: 1.2,
      color: '#ffd700',
      transition: {
        type: 'spring',
        stiffness: 300
      }
    }
  }

  return (
    <section id="home" className={styles.hero}>
      {/* Animated Background */}
      <motion.div 
        className={styles.heroBackground}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className={styles.bgImage} />
        <div className={styles.bgOverlay} />
        <motion.div 
          className={styles.bgGradient}
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>

      <motion.div 
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className={styles.birthdayBadge}
          variants={itemVariants}
          whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
        >
          🎉 Special Day 🎉
        </motion.div>

        <motion.h1 className={styles.heroTitle} variants={itemVariants}>
          <motion.span className={styles.titleLine}>
            {'Happy Birthday'.split('').map((letter, index) => (
              <motion.span
                key={index}
                variants={letterVariants}
                whileHover="hover"
                style={{ display: 'inline-block' }}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.span>
          <motion.span 
            className={styles.titleName}
            animate={{
              backgroundPosition: ['0% center', '200% center'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            Mitzi R Oliva
          </motion.span>
        </motion.h1>

        <motion.p 
          className={styles.heroSubtitle}
          variants={itemVariants}
        >
          Celebrating an amazing person on their special day!
        </motion.p>

        {/* Animated Bestie Quote */}
        <motion.div 
          className={styles.quoteContainer}
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              className={styles.bestieQuote}
              initial={{ opacity: 0, y: 20, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -20, rotateX: 90 }}
              transition={{ duration: 0.6, type: 'spring' }}
            >
              <span className={styles.quoteIcon}>💝</span>
              {bestieQuotes[currentQuote]}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.button 
          className={`${styles.ctaButton} ${celebrating ? styles.celebrating : ''}`}
          onClick={handleCelebrate}
          variants={itemVariants}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 20px 60px rgba(255, 215, 0, 0.6)',
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={celebrating ? {
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            } : {}}
            transition={{ duration: 0.5 }}
          >
            🎊 Let&apos;s Celebrate! 🎊
          </motion.span>
        </motion.button>

        {/* Sparkles Effect */}
        <div className={styles.sparkles}>
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className={styles.sparkle}
              initial={{ scale: 0, rotate: 0 }}
              animate={{
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut'
              }}
              style={{
                left: `${20 + (i * 6)}%`,
                top: `${30 + Math.sin(i) * 20}%`
              }}
            >
              ✨
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className={styles.floatingElements}>
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className={`${styles.balloon} ${styles[`balloon${index + 1}`]}`}
            custom={index}
            variants={balloonVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ 
              scale: 1.3,
              rotate: 10,
              transition: { duration: 0.2 }
            }}
          >
            🎈
          </motion.div>
        ))}
      </div>

      {/* Floating hearts */}
      <div className={styles.floatingHearts}>
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.heart}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: -1000,
              opacity: [0, 1, 1, 0],
              x: [0, Math.sin(i) * 100]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'linear'
            }}
            style={{
              left: `${10 + i * 12}%`
            }}
          >
            💖
          </motion.div>
        ))}
      </div>
    </section>
  )
}
