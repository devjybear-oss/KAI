import { motion } from 'framer-motion'

type Props = {
  cartCount: number
  hasActiveOrder: boolean
  onCartClick: () => void
  onTrackClick: () => void
}

export function Header({ cartCount, hasActiveOrder, onCartClick, onTrackClick }: Props) {
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
        <a href="#random">สุ่มเมนู</a>
        <a href="#menu">เมนู</a>
        <a href="#order">สั่งเลย</a>
      </nav>

      <div className="header__actions">
        {hasActiveOrder && (
          <motion.button
            type="button"
            className="header__track"
            onClick={onTrackClick}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
          >
            <motion.span
              className="header__track-dot"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
            ติดตามออเดอร์
          </motion.button>
        )}

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
      </div>
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
