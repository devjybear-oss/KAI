import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_LINKS = [
  { href: '#popular', label: 'ยอดนิยม' },
  { href: '#finder', label: 'ช่วยเลือกแผน' },
  { href: '#plans', label: 'ผลิตภัณฑ์' },
  { href: '#advisor', label: 'ตัวแทน AIA' },
  { href: '#planning', label: 'ขั้นตอน' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'ติดต่อเรา' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const close = () => setMenuOpen(false)
    window.addEventListener('hashchange', close)
    return () => window.removeEventListener('hashchange', close)
  }, [])

  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="header__brand">
        <motion.span
          className="header__logo header__logo--aia"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          AIA
        </motion.span>
        <div>
          <strong>AIA</strong>
          <span>ประกันชีวิตและสุขภาพ</span>
        </div>
      </div>

      <nav className="header__nav">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header__actions">
        <button
          type="button"
          className="header__menu-btn"
          aria-label={menuOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <motion.a
          href="#contact"
          className="header__cart"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
        >
          ปรึกษาแนน AIA
        </motion.a>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="header__mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
