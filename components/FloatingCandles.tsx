'use client'

import { motion } from 'framer-motion'
import styles from './FloatingCandles.module.css'

export default function FloatingCandles() {
  const candles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 0.8 + Math.random() * 0.4,
  }))

  return (
    <div className={styles.candlesContainer}>
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          className={styles.candle}
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: candle.duration,
            repeat: Infinity,
            delay: candle.delay,
            ease: 'easeInOut',
          }}
          style={{
            left: candle.left,
            top: `${20 + Math.random() * 40}%`,
            transform: `scale(${candle.size})`,
          }}
        >
          <div className={styles.candleBody}>
            <div className={styles.wick}></div>
          </div>
          <motion.div
            className={styles.flame}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            🕯️
          </motion.div>
          <div className={styles.glow}></div>
        </motion.div>
      ))}
    </div>
  )
}

