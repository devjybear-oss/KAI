import { motion } from 'framer-motion'
import type { Rider } from '../data/insurance'

type Props = {
  riders: Rider[]
}

export function ShieldVisual({ riders }: Props) {
  return (
    <div className="shield-scene">
      <motion.div
        className="shield-glow"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="shield"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="shield__body">
          <span className="shield__icon">🛡️</span>
          <span className="shield__brand">AIA</span>
        </div>

        {riders.map((rider, i) => (
          <motion.span
            key={rider.id}
            className="shield__rider"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              left: `${15 + (i % 3) * 30}%`,
              top: `${20 + Math.floor(i / 3) * 28}%`,
            }}
          >
            {rider.emoji}
          </motion.span>
        ))}
      </motion.div>

      <motion.div
        className="shield-shadow"
        animate={{ scaleX: [1, 0.92, 1], opacity: [0.15, 0.1, 0.15] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </div>
  )
}
