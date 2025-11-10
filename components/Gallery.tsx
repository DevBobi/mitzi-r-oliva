'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import styles from './Gallery.module.css'

export default function Gallery() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const photos = [
    { id: 1, src: '/assets/504478713_4122857917997674_6426415377428168379_n.jpg', alt: 'Mitzi - Beautiful Memory' },
    { id: 2, src: '/assets/487827533_4048348582115275_9203379407453488634_n.jpg', alt: 'Mitzi - Special Moment' },
    { id: 3, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.41_759db5ad.jpg', alt: 'Mitzi - Precious Memory' },
    { id: 4, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.40_d527bb11.jpg', alt: 'Mitzi - Happy Times' },
    { id: 5, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.39_eb79f0a1.jpg', alt: 'Mitzi - Wonderful Memory' },
    { id: 6, src: '/assets/WhatsApp Image 2025-08-26 at 02.42.08_88826455.jpg', alt: 'Mitzi - Joyful Moment' },
    { id: 7, src: '/assets/WhatsApp Image 2025-08-24 at 23.42.52_14c701ec.jpg', alt: 'Mitzi - Sweet Memory' },
    { id: 8, src: '/assets/WhatsApp Image 2025-08-24 at 23.41.28_396f9c60.jpg', alt: 'Mitzi - Cherished Moment' },
    { id: 9, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.36_609daeac.jpg', alt: 'Mitzi - Amazing Moment' },
    { id: 10, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.37_bf8f3479.jpg', alt: 'Mitzi - Beautiful Day' },
    { id: 11, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.37_d2807fb4.jpg', alt: 'Mitzi - Special Time' },
    { id: 12, src: '/assets/WhatsApp Image 2025-04-25 at 03.43.38_e6d4b6d9.jpg', alt: 'Mitzi - Lovely Memory' },
  ]

  const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({})
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const handleImageError = (id: number) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { scale: 0, opacity: 0, rotateY: -180 },
    visible: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100
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
          Memories that make life beautiful
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
              className={styles.galleryItem}
              variants={itemVariants}
              whileHover={{
                scale: 1.08,
                rotate: index % 2 === 0 ? 3 : -3,
                zIndex: 10,
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImage(photo.id)}
            >
              {imageErrors[photo.id] ? (
                <div className={styles.photoPlaceholder}>
                  <span className={styles.placeholderIcon}>📸</span>
                  <p>
                    Photo could not load
                    <br />
                    <small>Please check the image file</small>
                  </p>
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
                  <div className={styles.imageOverlay}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileHover={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={styles.overlayIcon}>🔍</span>
                    </motion.div>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
