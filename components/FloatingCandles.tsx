'use client'

import { motion } from 'framer-motion'
import styles from './FloatingCandles.module.css'

export default function FloatingCandles() {
  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 90 + 5}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 4,
    size: 0.7 + Math.random() * 0.5,
    icon: ['✨', '🎈', '🎁', '🎀', '💝', '🌟', '⭐', '💫'][Math.floor(Math.random() * 8)],
    rotation: Math.random() * 360,
  }))

  return (
    <div className={styles.candlesContainer}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          className={styles.floatingItem}
          initial={{ y: -100, opacity: 0, rotate: 0 }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.6, 1, 0.6],
            rotate: [item.rotation, item.rotation + 360],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
          style={{
            left: item.left,
            top: `${20 + Math.random() * 50}%`,
            fontSize: `${1.5 + item.size}rem`,
          }}
        >
          <motion.span
            className={styles.icon}
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 1 + Math.random(),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {item.icon}
          </motion.span>
          <div className={styles.glow}></div>
        </motion.div>
      ))}
    </div>
  )
}

