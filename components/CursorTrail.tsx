'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './CursorTrail.module.css'

interface Position {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [positions, setPositions] = useState<Position[]>([])
  const [emoji] = useState(['✨', '⚡', '🌟', '✦', '★', '✧', '⭐', '🪄'])

  useEffect(() => {
    let idCounter = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newPosition = {
        x: e.clientX,
        y: e.clientY,
        id: idCounter++,
      }

      setPositions((prev) => {
        const updated = [...prev, newPosition]
        return updated.slice(-15) // Keep only last 15
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className={styles.cursorTrail}>
      {positions.map((pos, index) => (
        <motion.div
          key={pos.id}
          className={styles.trailDot}
          initial={{ scale: 1, opacity: 1 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            left: pos.x,
            top: pos.y,
          }}
        >
          {emoji[index % emoji.length]}
        </motion.div>
      ))}
    </div>
  )
}

