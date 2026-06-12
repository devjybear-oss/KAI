import { motion } from 'framer-motion'
import { FLAGSHIP_PLAN } from '../data/insurance'
import { LINE_HREF } from '../data/contact'
import { ShieldVisual } from './ShieldVisual'

const chips = ['จ่ายไหวระยะยาว', 'คุ้มครองครบ', 'ปรึกษาฟรี', 'ดูแลหลังสมัคร']

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
          🏆 ตัวแทนประกันชีวิต AIA มืออาชีพ
        </motion.p>

        <motion.h1 variants={fadeUp}>
          {FLAGSHIP_PLAN.headline}
          <span className="hero__highlight"> {FLAGSHIP_PLAN.highlight}</span>
        </motion.h1>

        <motion.p className="hero__desc" variants={fadeUp}>
          {FLAGSHIP_PLAN.description}
        </motion.p>

        <motion.div className="hero__chips" variants={fadeUp}>
          {chips.map((word, i) => (
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

        <div className="hero__actions">
          <motion.a
            href={LINE_HREF}
            className="hero__cta hero__cta--fun"
            variants={fadeUp}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(211,17,69,0.35)' }}
            whileTap={{ scale: 0.96 }}
          >
            💬 คุยทาง LINE
          </motion.a>
          <motion.a
            href="#popular"
            className="hero__cta"
            variants={fadeUp}
            whileHover={{ scale: 1.04, boxShadow: '0 12px 40px rgba(160,13,53,0.4)' }}
            whileTap={{ scale: 0.96 }}
          >
            ดูผลิตภัณฑ์ยอดนิยม
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        className="hero__visual"
        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 14, delay: 0.3 }}
      >
        <ShieldVisual riders={[]} />
      </motion.div>
    </section>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
}
