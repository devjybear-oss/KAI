import type { CSSProperties } from 'react'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { POPULAR_PRODUCTS } from '../data/popularProducts'
import { getPlanById, getProductDetail } from '../data/productDetails'
import { ProductDetailModal } from './ProductDetailModal'

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 200 } },
}

export function PopularProductsSection() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const selectedPlan = selectedPlanId ? getPlanById(selectedPlanId) : null
  const productDetail = selectedPlanId ? getProductDetail(selectedPlanId) : null

  const products = POPULAR_PRODUCTS.map((item) => {
    const plan = getPlanById(item.planId)
    return plan ? { ...item, plan } : null
  }).filter((item): item is NonNullable<typeof item> => item !== null)

  return (
    <section className="popular" id="popular">
      <motion.div
        className="popular__header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <p className="section-tag">ยอดนิยม</p>
        <h2>ผลิตภัณฑ์ยอดนิยมจาก AIA</h2>
        <p>แผนที่ลูกค้าสอบถามบ่อย — คลิกดูรายละเอียดหรือปรึกษาเพื่อรับคำแนะนำที่เหมาะกับคุณ</p>
      </motion.div>

      <motion.div
        className="popular__grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {products.map(({ plan, badge }, i) => (
          <motion.button
            key={plan.id}
            type="button"
            className="popular__card"
            variants={cardVariant}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedPlanId(plan.id)}
            style={{ '--accent': plan.color } as CSSProperties}
          >
            <span className="popular__badge">{badge}</span>
            <motion.span
              className="popular__emoji"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            >
              {plan.emoji}
            </motion.span>
            <span className="popular__name">{plan.name}</span>
            <span className="popular__coverage">{plan.coverage}</span>
            <span className="popular__cta">ดูรายละเอียด →</span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="popular__footer"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <a href="#plans" className="popular__all-link">
          ดูผลิตภัณฑ์ทั้งหมด →
        </a>
      </motion.div>

      <AnimatePresence>
        {selectedPlan && productDetail && (
          <ProductDetailModal
            plan={selectedPlan}
            detail={productDetail}
            onClose={() => setSelectedPlanId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
