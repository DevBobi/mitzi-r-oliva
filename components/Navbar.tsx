'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  const menuItems = [
    { name: 'Home', icon: '🏠' },
    { name: 'About', icon: '✨' },
    { name: 'Gallery', icon: '📸' },
    { name: 'Wishes', icon: '💝' }
  ]

  return (
    <motion.nav 
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', damping: 20 }}
    >
      <div className={styles.navContainer}>
        <motion.a 
          href="#home" 
          className={styles.navLogo} 
          onClick={(e) => scrollToSection(e, '#home')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={styles.logoText}>Mitzi&apos;s Birthday</span>
          <span className={styles.logoIcon}>🎂</span>
        </motion.a>

        {/* Desktop Menu */}
        <ul className={styles.navMenu}>
          {menuItems.map((item, index) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.a
                href={`#${item.name.toLowerCase()}`}
                className={styles.navLink}
                onClick={(e) => scrollToSection(e, `#${item.name.toLowerCase()}`)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.linkIcon}>{item.icon}</span>
                <span>{item.name}</span>
              </motion.a>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Hamburger Button */}
        <motion.button
          className={`${styles.hamburger} ${mobileMenuOpen ? styles.open : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ul className={styles.mobileMenuList}>
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.name}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.a
                    href={`#${item.name.toLowerCase()}`}
                    className={styles.mobileNavLink}
                    onClick={(e) => scrollToSection(e, `#${item.name.toLowerCase()}`)}
                    whileHover={{ x: 10, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={styles.mobileLinkIcon}>{item.icon}</span>
                    <span>{item.name}</span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
