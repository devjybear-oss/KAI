import { motion } from 'framer-motion'

type Props = {
  cartCount: number
  onCartClick: () => void
}

export function Header({ cartCount, onCartClick }: Props) {
  return (
    <motion.header
      className="header"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="header__brand">
        <motion.span
          className="header__logo"
          animate={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
        >
          🍳
        </motion.span>
        <div>
          <strong>KAI</strong>
          <span>ข้าวไข่เจียวสดใหม่</span>
        </div>
      </div>

      <nav className="header__nav">
        <a href="#menu">เมนู</a>
        <a href="#order">สั่งเลย</a>
      </nav>

      <motion.button
        type="button"
        className="header__cart"
        onClick={onCartClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
      >
        🛒 ตะกร้า
        <AnimateBadge count={cartCount} />
      </motion.button>
    </motion.header>
  )
}

function AnimateBadge({ count }: { count: number }) {
  if (count === 0) return null
  return (
    <motion.span
      className="header__badge"
      key={count}
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1.3, 1] }}
      transition={{ type: 'spring', stiffness: 500, damping: 14 }}
    >
      {count}
    </motion.span>
  )
}
