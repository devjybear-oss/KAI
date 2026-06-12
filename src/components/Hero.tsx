import { motion } from 'framer-motion'
import { BASE_DISH } from '../data/menu'
import { AnimatedBowl } from './AnimatedBowl'

const words = ['อร่อย', 'ฟู', 'กรอบ', 'ร้อนๆ']

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__bg">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.span
            key={i}
            className="hero__particle"
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
            style={{
              left: `${8 + i * 7}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="hero__content"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.12 } },
        }}
      >
        <motion.p className="hero__tag" variants={fadeUp}>
          🔥 เปิดร้าน 10:00 – 20:00 ทุกวัน
        </motion.p>

        <motion.h1 variants={fadeUp}>
          {BASE_DISH.name}
          <span className="hero__highlight"> สูตรลับ</span>
        </motion.h1>

        <motion.p className="hero__desc" variants={fadeUp}>
          {BASE_DISH.description} เลือกท็อปปิ้งได้ตามใจ สดทำใหม่ทุกจาน
        </motion.p>

        <motion.div className="hero__chips" variants={fadeUp}>
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="hero__chip"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.a
          href="#order"
          className="hero__cta"
          variants={fadeUp}
          whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(232,93,58,0.45)' }}
          whileTap={{ scale: 0.96 }}
        >
          สั่งเลย เริ่มต้น 45 บาท
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            →
          </motion.span>
        </motion.a>
      </motion.div>

      <motion.div
        className="hero__visual"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.3 }}
      >
        <AnimatedBowl toppings={[]} />
      </motion.div>
    </section>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
}
