'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Wishes.module.css'

export default function Wishes() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const wishes = [
    {
      text: "May this year bring you endless joy, countless blessings, and all the happiness your heart can hold. You deserve nothing but the best!",
      author: "💝 With Love",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      text: "Here's to another year of amazing adventures, beautiful memories, and dreams coming true. Happy Birthday, Mitzi!",
      author: "🎉 Cheers",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      text: "Wishing you a day filled with love, laughter, and all your favorite things. You make the world brighter just by being in it!",
      author: "✨ Best Wishes",
      gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const cardVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <section id="wishes" className={styles.wishes} ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Birthday Wishes
        </motion.h2>
        <motion.div 
          className={styles.wishesContent}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {wishes.map((wish, index) => (
            <motion.div
              key={index}
              className={styles.wishCard}
              variants={cardVariants}
              whileHover={{
                y: -5,
                scale: 1.01,
                transition: { duration: 0.2 }
              }}
              style={{ 
                borderImage: wish.gradient,
                borderImageSlice: 1
              }}
            >
              <div className={styles.quoteIcon}>
                💌
              </div>
              <motion.p 
                className={styles.wishText}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                &quot;{wish.text}&quot;
              </motion.p>
              <motion.div 
                className={styles.wishAuthor}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {wish.author}
              </motion.div>
              <div 
                className={styles.cardGlow} 
                style={{ background: wish.gradient }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
