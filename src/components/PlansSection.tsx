import type { CSSProperties } from 'react'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CATEGORIES, getPlansByCategory } from '../data/insurance'
import {
  getCategoryDetail,
  getPlanById,
  getProductDetail,
} from '../data/productDetails'
import { ProductDetailModal } from './ProductDetailModal'

type Props = {
  activeCategory?: string
  onCategoryChange?: (categoryId: string) => void
}

export function PlansSection({ activeCategory: controlledCategory, onCategoryChange }: Props) {
  const [internalCategory, setInternalCategory] = useState('health')
  const activeCategory = controlledCategory ?? internalCategory
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null)
  const categoryDetail = getCategoryDetail(activeCategory)
  const plans = getPlansByCategory(activeCategory)
  const selectedPlan = selectedPlanId ? getPlanById(selectedPlanId) : null
  const productDetail = selectedPlanId ? getProductDetail(selectedPlanId) : null

  const setCategory = (categoryId: string) => {
    if (onCategoryChange) onCategoryChange(categoryId)
    else setInternalCategory(categoryId)
    setSelectedPlanId(null)
  }

  useEffect(() => {
    if (controlledCategory) setSelectedPlanId(null)
  }, [controlledCategory])

  return (
    <section className="order" id="plans">
      <motion.div
        className="order__header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <p className="section-tag">ผลิตภัณฑ์</p>
        <h2>เลือกแผนที่เหมาะกับคุณ</h2>
        <p>เลือกดูข้อมูลสินค้าและผลิตภัณฑ์ที่คุณต้องการ</p>
      </motion.div>

      <div className="menu-tabs">
        {CATEGORIES.map((cat) => (
          <motion.button
            key={cat.id}
            type="button"
            className={`menu-tab${activeCategory === cat.id ? ' menu-tab--active' : ''}`}
            onClick={() => setCategory(cat.id)}
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
        {categoryDetail && (
          <motion.div
            key={activeCategory}
            className="plan-category-detail"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <h3>{categoryDetail.title}</h3>
            <p className="plan-category-detail__tagline">{categoryDetail.tagline}</p>
            {categoryDetail.overview.map((paragraph) => (
              <p key={paragraph} className="plan-category-detail__text">
                {paragraph}
              </p>
            ))}
            <div className="plan-category-detail__highlights">
              {categoryDetail.highlights.map((item) => (
                <article key={item.title} className="plan-category-detail__highlight">
                  <span className="plan-category-detail__highlight-emoji">{item.emoji}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="plan-products-label">ผลิตภัณฑ์แนะนำ</p>
      <motion.div
        className={`menu-grid${activeCategory === 'life' ? ' menu-grid--life' : ''}`}
        key={activeCategory}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07 } },
        }}
      >
        {plans.map((plan, i) => (
          <motion.button
            key={plan.id}
            type="button"
            className="menu-card menu-card--info"
            variants={cardVariant}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setSelectedPlanId(plan.id)}
            style={{ '--accent': plan.color } as CSSProperties}
          >
            <motion.span
              className="menu-card__emoji"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            >
              {plan.emoji}
            </motion.span>
            <span className="menu-card__name">{plan.name}</span>
            <span className="menu-card__coverage">{plan.coverage}</span>
            <span className="menu-card__add">ดูรายละเอียด →</span>
          </motion.button>
        ))}
      </motion.div>

      {activeCategory === 'life' && (
        <motion.a
          href="#contact"
          className="order__add-btn order__add-btn--link order__add-btn--center"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          ปรึกษาแนน AIA เพื่อวางแผนประกันชีวิต
        </motion.a>
      )}

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

const cardVariant = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 200 } },
}
