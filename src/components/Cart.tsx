import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Topping } from '../data/menu'
import type { DeliveryAddress } from '../types/order'
import { EMPTY_ADDRESS } from '../types/order'
import { DeliveryForm } from './DeliveryForm'

export type CartItem = {
  id: string
  name: string
  emoji: string
  toppings: Topping[]
  total: number
}

type Props = {
  open: boolean
  items: CartItem[]
  onClose: () => void
  onRemove: (id: string) => void
  onCheckout: (address: DeliveryAddress) => void
}

function validateAddress(address: DeliveryAddress) {
  const errors: Partial<Record<keyof DeliveryAddress, string>> = {}
  if (!address.name.trim()) errors.name = 'กรุณากรอกชื่อผู้รับ'
  if (!address.phone.trim()) errors.phone = 'กรุณากรอกเบอร์โทร'
  else if (!/^0\d{8,9}$/.test(address.phone.replace(/\D/g, ''))) {
    errors.phone = 'เบอร์โทรไม่ถูกต้อง'
  }
  if (!address.address.trim()) errors.address = 'กรุณากรอกที่อยู่จัดส่ง'
  return errors
}

export function Cart({ open, items, onClose, onRemove, onCheckout }: Props) {
  const [address, setAddress] = useState<DeliveryAddress>(EMPTY_ADDRESS)
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({})
  const [shake, setShake] = useState(false)

  const grandTotal = items.reduce((sum, item) => sum + item.total, 0)

  const handleCheckout = () => {
    const validation = validateAddress(address)
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    setErrors({})
    onCheckout(address)
    setAddress(EMPTY_ADDRESS)
  }

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
                <p>ยังไม่มีรายการ ลองเลือกเมนูดูสิ!</p>
              </motion.div>
            ) : (
              <>
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
                          <strong>
                            {item.emoji} {item.name}
                          </strong>
                          <p>
                            {item.toppings.length > 0
                              ? `ท็อปปิ้ง: ${item.toppings.map((t) => t.name).join(', ')}`
                              : null}
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

                <motion.div
                  className="cart__delivery"
                  animate={shake ? { x: [-8, 8, -6, 6, 0] } : {}}
                  transition={{ duration: 0.4 }}
                >
                  <DeliveryForm value={address} onChange={setAddress} errors={errors} />
                </motion.div>
              </>
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
                onClick={handleCheckout}
                whileHover={items.length ? { scale: 1.02 } : {}}
                whileTap={items.length ? { scale: 0.96 } : {}}
              >
                ยืนยันสั่งอาหาร
              </motion.button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
