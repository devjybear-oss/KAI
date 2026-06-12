import type { CSSProperties } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BASE_DISH, BASE_PRICE, TOPPINGS, type Topping } from '../data/menu'
import { AnimatedBowl } from './AnimatedBowl'

type Props = {
  selected: Topping[]
  onToggle: (topping: Topping) => void
  onAddToCart: () => void
  total: number
  justAdded: boolean
}

export function ToppingSelector({
  selected,
  onToggle,
  onAddToCart,
  total,
  justAdded,
}: Props) {
  const selectedIds = new Set(selected.map((t) => t.id))

  return (
    <section className="order" id="order">
      <motion.div
        className="order__header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <p className="section-tag">🍚 ปรับแต่งจานของคุณ</p>
        <h2>เลือกท็อปปิ้งเพิ่มได้</h2>
        <p>กดเพื่อเพิ่ม/ลบท็อปปิ้ง ดูจานอัปเดตแบบเรียลไทม์</p>
      </motion.div>

      <div className="order__layout">
        <motion.div
          className="order__preview"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', delay: 0.1 }}
        >
          <AnimatedBowl toppings={selected} />

          <motion.div className="order__summary" layout>
            <h3>{BASE_DISH.name}</h3>
            <p className="order__base-price">ฐานราคา {BASE_PRICE} บาท</p>

            <AnimatePresence>
              {selected.length > 0 && (
                <motion.ul
                  className="order__selected-list"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  {selected.map((t) => (
                    <motion.li
                      key={t.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <span>{t.emoji} {t.name}</span>
                      <span>+{t.price}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>

            <motion.div className="order__total" layout>
              <span>รวม</span>
              <motion.strong
                key={total}
                initial={{ scale: 1.3, color: '#e85d3a' }}
                animate={{ scale: 1, color: '#1a1208' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {total} บาท
              </motion.strong>
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="order__toppings" id="menu">
          <motion.div
            className="topping-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06 } },
            }}
          >
            {TOPPINGS.map((topping) => {
              const active = selectedIds.has(topping.id)
              return (
                <motion.button
                  key={topping.id}
                  type="button"
                  className={`topping-card${active ? ' topping-card--active' : ''}`}
                  variants={cardVariant}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => onToggle(topping)}
                  style={{ '--accent': topping.color } as CSSProperties}
                >
                  <motion.span
                    className="topping-card__emoji"
                    animate={active ? { scale: [1, 1.25, 1], rotate: [0, 10, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {topping.emoji}
                  </motion.span>
                  <span className="topping-card__name">{topping.name}</span>
                  <span className="topping-card__price">
                    {topping.price === 0 ? 'ฟรี' : `+${topping.price}฿`}
                  </span>
                  <AnimatePresence>
                    {active && (
                      <motion.span
                        className="topping-card__check"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </motion.div>

          <motion.button
            type="button"
            className="order__add-btn"
            onClick={onAddToCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            animate={
              justAdded
                ? { boxShadow: ['0 0 0 0 rgba(232,93,58,0.5)', '0 0 0 16px rgba(232,93,58,0)'] }
                : {}
            }
            transition={{ duration: 0.6 }}
          >
            <motion.span
              key={justAdded ? 'added' : 'idle'}
              initial={justAdded ? { y: 20, opacity: 0 } : false}
              animate={{ y: 0, opacity: 1 }}
            >
              {justAdded ? '✓ เพิ่มลงตะกร้าแล้ว!' : '🛒 เพิ่มลงตะกร้า'}
            </motion.span>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 200 } },
}
