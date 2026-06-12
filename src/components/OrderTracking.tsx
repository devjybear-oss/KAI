import { AnimatePresence, motion } from 'framer-motion'
import type { ActiveOrder } from '../types/order'
import { STATUS_STEPS } from '../types/order'

type Props = {
  order: ActiveOrder | null
  onClose: () => void
}

const statusIndex = (status: ActiveOrder['status']) => {
  if (status === 'delivered') return STATUS_STEPS.length
  return STATUS_STEPS.findIndex((s) => s.id === status)
}

export function OrderTracking({ order, onClose }: Props) {
  if (!order) return null

  const current = statusIndex(order.status)
  const isDelivered = order.status === 'delivered'
  const activeStep = STATUS_STEPS[Math.min(current, STATUS_STEPS.length - 1)]

  return (
    <motion.div
      className="tracking-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="tracking-modal"
        initial={{ scale: 0.85, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        <div className="tracking-modal__head">
          <div>
            <p className="tracking-modal__id">ออเดอร์ #{order.id.slice(0, 6).toUpperCase()}</p>
            <h2>{isDelivered ? 'ส่งถึงแล้ว! 🎉' : 'ติดตามออเดอร์'}</h2>
          </div>
          <button type="button" className="tracking-modal__close" onClick={onClose} aria-label="ปิด">
            ✕
          </button>
        </div>

        <motion.div
          className="tracking-modal__hero"
          key={order.status}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <motion.span
            className="tracking-modal__hero-emoji"
            animate={
              isDelivered
                ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }
                : { y: [0, -8, 0], rotate: [0, 5, -5, 0] }
            }
            transition={{ duration: 2, repeat: Infinity }}
          >
            {isDelivered ? '📦' : activeStep.emoji}
          </motion.span>
          <strong>{isDelivered ? 'ขอบคุณที่สั่ง KAI!' : activeStep.label}</strong>
          {!isDelivered && (
            <motion.p
              className="tracking-modal__hint"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              กรุณารอสักครู่...
            </motion.p>
          )}
        </motion.div>

        <div className="tracking-progress">
          <motion.div
            className="tracking-progress__bar"
            initial={{ width: '0%' }}
            animate={{ width: `${(current / STATUS_STEPS.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          />
        </div>

        <ol className="tracking-steps">
          {STATUS_STEPS.map((step, i) => {
            const done = i < current
            const active = i === current && !isDelivered
            const completed = isDelivered || done

            return (
              <motion.li
                key={step.id}
                className={`tracking-step${completed ? ' tracking-step--done' : ''}${active ? ' tracking-step--active' : ''}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.span
                  className="tracking-step__icon"
                  animate={
                    active
                      ? { scale: [1, 1.15, 1], boxShadow: ['0 0 0 0 rgba(232,93,58,0.4)', '0 0 0 10px rgba(232,93,58,0)', '0 0 0 0 rgba(232,93,58,0)'] }
                      : {}
                  }
                  transition={{ duration: 1.5, repeat: active ? Infinity : 0 }}
                >
                  {completed && !active ? '✓' : step.emoji}
                </motion.span>
                <div>
                  <strong>{step.label}</strong>
                  <AnimatePresence mode="wait">
                    {active && (
                      <motion.span
                        className="tracking-step__live"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        กำลังดำเนินการ
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            )
          })}
        </ol>

        <div className="tracking-address">
          <h4>📍 จัดส่งไปที่</h4>
          <p>
            <strong>{order.address.name}</strong> · {order.address.phone}
          </p>
          <p>{order.address.address}</p>
          {order.address.note && <p className="tracking-address__note">หมายเหตุ: {order.address.note}</p>}
        </div>

        <div className="tracking-summary">
          <span>{order.items.length} รายการ</span>
          <strong>{order.total} บาท</strong>
        </div>

        {!isDelivered && (
          <p className="tracking-modal__footer-note">
            สถานะอัปเดตอัตโนมัติ — ปิดหน้าต่างแล้วกด "ติดตามออเดอร์" ด้านบนได้
          </p>
        )}

        {isDelivered && (
          <motion.button
            type="button"
            className="tracking-modal__done-btn"
            onClick={onClose}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            สั่งอีกครั้ง
          </motion.button>
        )}
      </motion.div>
    </motion.div>
  )
}
