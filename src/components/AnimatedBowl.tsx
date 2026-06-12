import { AnimatePresence, motion } from 'framer-motion'
import type { Topping } from '../data/menu'
import { Steam } from './Steam'

type Props = {
  toppings: Topping[]
}

export function AnimatedBowl({ toppings }: Props) {
  return (
    <div className="bowl-scene">
      <motion.div
        className="bowl-glow"
        animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Steam />

      <motion.div
        className="bowl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="bowl__rim" />
        <div className="bowl__rice">
          <motion.span
            className="bowl__egg"
            animate={{ rotate: [0, 2, -2, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🍳
          </motion.span>

          <AnimatePresence mode="popLayout">
            {toppings.map((topping, i) => (
              <motion.span
                key={topping.id}
                className="bowl__topping"
                layout
                initial={{ scale: 0, opacity: 0, y: -40 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                  rotate: (i % 2 === 0 ? 1 : -1) * (8 + i * 3),
                }}
                exit={{ scale: 0, opacity: 0, y: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                style={{
                  left: `${18 + (i % 4) * 18}%`,
                  top: `${12 + Math.floor(i / 4) * 22}%`,
                  filter: `drop-shadow(0 2px 4px ${topping.color}55)`,
                }}
              >
                {topping.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="bowl__base" />
      </motion.div>

      <motion.div
        className="bowl-shadow"
        animate={{ scaleX: [1, 0.92, 1], opacity: [0.3, 0.2, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
