import { motion } from 'framer-motion'

type Props = {
  show: boolean
  onClose: () => void
}

export function OrderSuccess({ show, onClose }: Props) {
  if (!show) return null

  return (
    <motion.div
      className="success-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="success-modal"
        initial={{ scale: 0.5, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.div
          className="success-modal__icon"
          animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          🎉
        </motion.div>
        <h2>สั่งอาหารสำเร็จ!</h2>
        <p>กำลังเตรียมข้าวไข่เจียวให้คุณ รอสักครู่นะ</p>
        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          ตกลง
        </motion.button>

        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            className="confetti"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{
              opacity: [1, 1, 0],
              y: [-20, -120 - i * 20],
              x: (i % 2 === 0 ? 1 : -1) * (40 + i * 15),
              rotate: i * 45,
            }}
            transition={{ duration: 1.2, delay: i * 0.05 }}
            style={{ left: `${20 + i * 8}%` }}
          >
            {['🍳', '🍚', '✨', '🌶️'][i % 4]}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}
