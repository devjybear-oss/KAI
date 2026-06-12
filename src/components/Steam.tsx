import { motion } from 'framer-motion'

export function Steam() {
  return (
    <div className="steam" aria-hidden>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="steam__wisp"
          initial={{ opacity: 0, y: 10, scaleX: 0.6 }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [-4, -36, -56],
            scaleX: [0.6, 1.1, 0.8],
            x: [0, i % 2 === 0 ? 6 : -6, i % 2 === 0 ? 10 : -10],
          }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
