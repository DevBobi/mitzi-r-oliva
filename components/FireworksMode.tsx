'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import styles from './FireworksMode.module.css'

export default function FireworksMode() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const handleCelebrate = () => {
      setIsActive(true)
      launchFireworks()
      
      setTimeout(() => {
        setIsActive(false)
      }, 5000)
    }

    window.addEventListener('celebrate', handleCelebrate)
    return () => window.removeEventListener('celebrate', handleCelebrate)
  }, [])

  const launchFireworks = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: Particle[] = []
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#ffd700', '#ffed4e']

    class Particle {
      x: number
      y: number
      vx: number
      vy: number
      life: number
      color: string
      size: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        const angle = Math.random() * Math.PI * 2
        const speed = Math.random() * 5 + 2
        this.vx = Math.cos(angle) * speed
        this.vy = Math.sin(angle) * speed
        this.life = 100
        this.color = colors[Math.floor(Math.random() * colors.length)]
        this.size = Math.random() * 3 + 2
      }

      update() {
        this.x += this.vx
        this.y += this.vy
        this.vy += 0.1 // gravity
        this.life -= 1
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save()
        ctx.globalAlpha = this.life / 100
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    const createFirework = (x: number, y: number) => {
      for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y))
      }
    }

    let frameCount = 0
    const animate = () => {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        particle.update()
        particle.draw(ctx)
        
        if (particle.life <= 0) {
          particles.splice(index, 1)
        }
      })

      frameCount++
      if (frameCount % 15 === 0 && frameCount < 150) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height * 0.5
        createFirework(x, y)
      }

      if (frameCount < 200) {
        requestAnimationFrame(animate)
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      }
    }

    animate()
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${styles.fireworksCanvas} ${isActive ? styles.active : ''}`}
      />
      {isActive && (
        <motion.div
          className={styles.celebrationText}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
        >
          🎉 HAPPY BIRTHDAY MITZI! 🎉
        </motion.div>
      )}
    </>
  )
}

