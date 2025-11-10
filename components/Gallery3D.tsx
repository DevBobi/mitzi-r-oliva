'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Gallery3D.module.css'

export default function Gallery3D() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const photos = [
    { id: 1, src: '/assets/504478713_4122857917997674_6426415377428168379_n.jpg', alt: 'Mitzi - Beautiful Memory', caption: 'Beautiful Moment' },
    { id: 2, src: '/assets/487827533_4048348582115275_9203379407453488634_n.jpg', alt: 'Mitzi - Special Moment', caption: 'Special Day' },
    { id: 3, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.41_759db5ad.jpg', alt: 'Mitzi - Precious Memory', caption: 'Precious Memory' },
    { id: 4, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.40_d527bb11.jpg', alt: 'Mitzi - Happy Times', caption: 'Happy Times' },
    { id: 5, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.39_eb79f0a1.jpg', alt: 'Mitzi - Wonderful Memory', caption: 'Wonderful Day' },
    { id: 6, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.08_88826455.jpg', alt: 'Mitzi - Joyful Moment', caption: 'Joyful Moment' },
    { id: 7, src: '/assets/WhatsApp Image 2025-08-24 at 23.42.52_14c701ec.jpg', alt: 'Mitzi - Sweet Memory', caption: 'Sweet Memory' },
    { id: 8, src: '/assets/WhatsApp Image 2025-08-24 at 23.41.28_396f9c60.jpg', alt: 'Mitzi - Cherished Moment', caption: 'Cherished Time' },
    { id: 9, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.36_609daeac.jpg', alt: 'Mitzi - Amazing Moment', caption: 'Amazing Day' },
    { id: 10, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.37_bf8f3479.jpg', alt: 'Mitzi - Beautiful Day', caption: 'Beautiful Smile' },
    { id: 11, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.37_d2807fb4.jpg', alt: 'Mitzi - Special Time', caption: 'Special Time' },
    { id: 12, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.38_e6d4b6d9.jpg', alt: 'Mitzi - Lovely Memory', caption: 'Lovely Memory' },
  ]

  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({})

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const toggleFlip = (id: number) => {
    setFlipped(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  }

  return (
    <section id="gallery" className={styles.gallery} ref={ref}>
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Precious Moments
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Memories that make life beautiful ✨
        </motion.p>
        <motion.div 
          className={styles.galleryGrid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              className={styles.cardContainer}
              variants={itemVariants}
            >
              <motion.div
                className={`${styles.card} ${flipped[photo.id] ? styles.flipped : ''}`}
                onClick={() => toggleFlip(photo.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                {/* Front */}
                <div className={styles.cardFront}>
                  {imageErrors[photo.id] ? (
                    <div className={styles.photoPlaceholder}>
                      <span className={styles.placeholderIcon}>📸</span>
                      <p>Photo could not load</p>
                    </div>
                  ) : (
                    <>
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        width={400}
                        height={400}
                        className={styles.galleryImage}
                        onError={() => handleImageError(photo.id)}
                      />
                      <div className={styles.cardOverlay}>
                        <div className={styles.overlayContent}>
                          <span className={styles.flipHint}>🔄 Click to flip</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Back */}
                <div className={styles.cardBack}>
                  <div className={styles.backContent}>
                    <div className={styles.backIcon}>💝</div>
                    <h3 className={styles.backTitle}>{photo.caption}</h3>
                    <p className={styles.backText}>
                      A beautiful memory captured forever in time. Every moment with you is special! 🌟
                    </p>
                    <div className={styles.backEmoji}>✨🎉💖</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}


