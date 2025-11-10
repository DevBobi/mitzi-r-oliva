'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import styles from './BirthdayCountdown.module.css'

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [isMidnight, setIsMidnight] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      
      // Set target to November 11, 2025 at 00:00:00 (midnight)
      const birthday = new Date('2025-11-11T00:00:00')
      
      const difference = birthday.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
        setIsMidnight(false)
      } else if (difference <= 0 && !isMidnight) {
        // It's exactly midnight or past it!
        setIsMidnight(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [isMidnight])

  return (
    <>
      {/* Countdown Timer */}
      {!isMidnight && (
        <motion.div
          className={styles.countdown}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className={styles.countdownTitle}>
            ⏰ Countdown to Mitzi&apos;s Birthday ⏰
          </div>
          <div className={styles.countdownSubtitle}>November 11, 2025 at 12:00 AM</div>
          <div className={styles.countdownBoxes}>
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className={styles.countdownBox}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <div className={styles.countdownValue}>{String(item.value).padStart(2, '0')}</div>
                <div className={styles.countdownLabel}>{item.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </>
  )
}

