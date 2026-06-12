import { AnimatePresence, motion } from 'framer-motion'
import type { Topping } from '../data/menu'

export type CartItem = {
  id: string
  toppings: Topping[]
  total: number
}

type Props = {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onCheckout: () => void
}

export function Cart({ open, items, onClose, onRemove, onCheckout }: Props) {
  const grandTotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="cart"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 32 }}
          >
            <div className="cart__head">
              <h2>🛒 ตะกร้าของคุณ</h2>
              <button type="button" className="cart__close" onClick={onClose}>
                ✕
              </button>
            </div>

            {items.length === 0 ? (
              <motion.div
                className="cart__empty"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '3rem' }}
                >
                  🍚
                </motion.span>
                <p>ยังไม่มีรายการ ลองเลือกท็อปปิ้งดูสิ!</p>
              </motion.div>
            ) : (
              <ul className="cart__list">
                <AnimatePresence>
                  {items.map((item, i) => (
                    <motion.li
                      key={item.id}
                      className="cart__item"
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40, height: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div>
                        <strong>ข้าวไข่เจียว</strong>
                        <p>
                          {item.toppings.length === 0
                            ? 'ไม่เพิ่มท็อปปิ้ง'
                            : item.toppings.map((t) => t.emoji).join(' ')}
                        </p>
                      </div>
                      <div className="cart__item-actions">
                        <span>{item.total}฿</span>
                        <button type="button" onClick={() => onRemove(item.id)}>
                          ลบ
                        </button>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}

            <div className="cart__footer">
              <div className="cart__grand">
                <span>ยอดรวม</span>
                <motion.strong
                  key={grandTotal}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {grandTotal} บาท
                </motion.strong>
              </div>
              <motion.button
                type="button"
                className="cart__checkout"
                disabled={items.length === 0}
                onClick={onCheckout}
                whileHover={items.length ? { scale: 1.02 } : {}}
                whileTap={items.length ? { scale: 0.96 } : {}}
              >
                สั่งอาหารเลย
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
