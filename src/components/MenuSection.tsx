import type { CSSProperties } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BASE_PRICE,
  CATEGORIES,
  TOPPINGS,
  getCategory,
  getItemsByCategory,
  type MenuItem,
  type Topping,
} from '../data/menu'
import { AnimatedBowl } from './AnimatedBowl'

type Props = {
  selectedToppings: Topping[]
  onToggleTopping: (topping: Topping) => void
  onAddCustom: () => void
  onAddItem: (item: MenuItem) => void
  customTotal: number
  justAdded: boolean
}

export function MenuSection({
  selectedToppings,
  onToggleTopping,
  onAddCustom,
  onAddItem,
  customTotal,
  justAdded,
}: Props) {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id)
  const category = getCategory(activeCategory)!
  const items = getItemsByCategory(activeCategory)
  const isCustomizable = activeCategory === 'khao-khai-jiao'
  const selectedIds = new Set(selectedToppings.map((t) => t.id))

  return (
    <section className="order" id="order">
      <motion.div
        className="order__header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <p className="section-tag">🍽️ เมนูทั้งหมด</p>
        <h2>เลือกเมนูที่ชอบ</h2>
        <p>ข้าวไข่เจียวปรับท็อปปิ้งได้ · กะเพรา & ข้าวผัดพร้อมสั่งเลย</p>
      </motion.div>

      <div className="menu-tabs" id="menu">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            className={`menu-tab${activeCategory === cat.id ? ' menu-tab--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            layout
          >
            <span>{cat.emoji}</span>
            {cat.name}
            {activeCategory === cat.id && (
              <motion.span
                className="menu-tab__indicator"
                layoutId="menu-tab-indicator"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={activeCategory}
          className="menu-category-desc"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
        >
          {category.emoji} {category.description}
        </motion.p>
      </AnimatePresence>

      {isCustomizable ? (
        <div className="order__layout">
          <motion.div
            className="order__preview"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', delay: 0.1 }}
          >
            <AnimatedBowl toppings={selectedToppings} />

            <motion.div className="order__summary" layout>
              <h3>ข้าวไข่เจียว</h3>
              <p className="order__base-price">ฐานราคา {BASE_PRICE} บาท</p>

              <AnimatePresence>
                {selectedToppings.length > 0 && (
                  <motion.ul
                    className="order__selected-list"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    {selectedToppings.map((t) => (
                      <motion.li
                        key={t.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <span>
                          {t.emoji} {t.name}
                        </span>
                        <span>+{t.price}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <motion.div className="order__total" layout>
                <span>รวม</span>
                <motion.strong
                  key={customTotal}
                  initial={{ scale: 1.3, color: '#e85d3a' }}
                  animate={{ scale: 1, color: '#1a1208' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {customTotal} บาท
                </motion.strong>
              </motion.div>
            </motion.div>
          </motion.div>

          <div className="order__toppings">
            <motion.div
              className="topping-grid"
              initial="hidden"
              animate="visible"
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
                    onClick={() => onToggleTopping(topping)}
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

            <AddButton onClick={onAddCustom} justAdded={justAdded} label="เพิ่มลงตะกร้า" />
          </div>
        </div>
      ) : (
        <motion.div
          className="menu-grid"
          key={activeCategory}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {items.map((item, i) => (
            <motion.button
              key={item.id}
              type="button"
              className="menu-card"
              variants={cardVariant}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => onAddItem(item)}
              style={{ '--accent': item.color } as CSSProperties}
            >
              <motion.span
                className="menu-card__emoji"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
              >
                {item.emoji}
              </motion.span>
              <span className="menu-card__name">{item.name}</span>
              <span className="menu-card__price">{item.price} บาท</span>
              <span className="menu-card__add">+ เพิ่ม</span>
            </motion.button>
          ))}
        </motion.div>
      )}
    </section>
  )
}

function AddButton({
  onClick,
  justAdded,
  label,
}: {
  onClick: () => void
  justAdded: boolean
  label: string
}) {
  return (
    <motion.button
      type="button"
      className="order__add-btn"
      onClick={onClick}
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
        {justAdded ? '✓ เพิ่มลงตะกร้าแล้ว!' : `🛒 ${label}`}
      </motion.span>
    </motion.button>
  )
}

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 200 } },
}
