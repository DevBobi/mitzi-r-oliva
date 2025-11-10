'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './MusicPlayer.module.css'

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        // Reset audio if it ended
        if (audioRef.current.ended) {
          audioRef.current.currentTime = 0
        }
        
        await audioRef.current.play()
        setIsPlaying(true)
        setError(null)
      }
    } catch (err) {
      console.error('Audio playback error:', err)
      setError('Could not play audio. Click again to retry.')
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleCanPlay = () => {
      console.log('Audio loaded successfully')
      setIsLoaded(true)
      setError(null)
    }

    const handleError = (e: Event) => {
      console.error('Audio loading error:', e)
      setError('Failed to load audio file')
      setIsLoaded(false)
    }

    const handleEnded = () => {
      setIsPlaying(false)
      // Loop will handle restart automatically
    }

    const handlePause = () => {
      setIsPlaying(false)
    }

    const handlePlay = () => {
      setIsPlaying(true)
    }

    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('error', handleError)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('pause', handlePause)
    audio.addEventListener('play', handlePlay)

    return () => {
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('error', handleError)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('pause', handlePause)
      audio.removeEventListener('play', handlePlay)
    }
  }, [])

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/One_Direction_-_Olivia_%28mp3.pm%29.mp3"
        loop
        preload="auto"
      />

      <motion.div
        className={styles.musicPlayer}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 1, type: 'spring', damping: 10 }}
      >
        <motion.button
          className={`${styles.playButton} ${error ? styles.error : ''}`}
          onClick={togglePlay}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={isPlaying ? { duration: 2, repeat: Infinity, ease: 'linear' } : {}}
          title={error || (isLoaded ? 'Play Olivia by One Direction' : 'Loading...')}
        >
          {!isLoaded ? '⏳' : isPlaying ? '⏸️' : '🎵'}
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className={styles.playerInfo}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 200, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
            >
              <div className={styles.songTitle}>
                {error ? '❌ Error' : 'Olivia - One Direction 🎵'}
              </div>
              {error && <div className={styles.errorText}>{error}</div>}
              {!error && (
                <div className={styles.visualizer}>
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={styles.bar}
                      animate={isPlaying ? {
                        height: ['10px', '30px', '10px'],
                      } : { height: '10px' }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          className={styles.expandButton}
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Show player info"
        >
          {isExpanded ? '◀' : '▶'}
        </motion.button>
      </motion.div>
    </>
  )
}

