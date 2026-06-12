import { motion } from 'framer-motion'
import type { InsurancePlan } from '../data/insurance'
import type { ProductDetail } from '../data/productDetails'

type Props = {
  plan: InsurancePlan
  detail: ProductDetail
  onClose: () => void
}

export function ProductDetailModal({ plan, detail, onClose }: Props) {
  return (
    <motion.div
      className="tracking-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="tracking-modal plan-detail-modal"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="tracking-modal__head">
          <div>
            <p className="tracking-modal__id">ผลิตภัณฑ์ AIA</p>
            <h2>{plan.name}</h2>
          </div>
          <button type="button" className="tracking-modal__close" onClick={onClose} aria-label="ปิด">
            ✕
          </button>
        </div>

        <div className="tracking-modal__hero">
          <span className="tracking-modal__hero-emoji">{plan.emoji}</span>
          <strong>{detail.tagline}</strong>
        </div>

        <div className="plan-detail-modal__section">
          <h3>ภาพรวมผลิตภัณฑ์</h3>
          {detail.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {detail.highlights.length > 0 && (
          <div className="plan-detail-modal__section">
            <h3>จุดเด่นที่ควรรู้</h3>
            <ul className="plan-detail-modal__list">
              {detail.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {detail.related.length > 0 && (
          <div className="plan-detail-modal__section">
            <h3>ผลิตภัณฑ์ที่เกี่ยวข้อง</h3>
            <div className="plan-detail-modal__related">
              {detail.related.map((name) => (
                <span key={name}>{name}</span>
              ))}
            </div>
          </div>
        )}

        <a href="#contact" className="tracking-modal__done-btn" onClick={onClose}>
          ปรึกษาแนน AIA เพื่อวางแผน
        </a>
      </motion.div>
    </motion.div>
  )
}
