import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const FAQS = [
  {
    id: 'life-or-health',
    question: 'ควรเริ่มจากประกันชีวิตหรือประกันสุขภาพ AIA ก่อน?',
    answer:
      'ควรเริ่มจากความเสี่ยงหลักของครอบครัวก่อน หากกังวลค่ารักษาพยาบาล ควรดูประกันสุขภาพเป็นอันดับแรก แต่ถ้าเป็นหัวหน้าครอบครัว มีภาระหนี้สิน หรือมีคนที่ต้องดูแล ควรวางแผนประกันชีวิตควบคู่กัน เพื่อให้มีเงินก้อนดูแลคนข้างหลัง',
  },
  {
    id: 'health-types',
    question: 'ประกันสุขภาพ AIA แบบเหมาจ่ายต่างจากแบบแยกค่าใช้จ่ายอย่างไร?',
    answer:
      'แบบเหมาจ่ายจะให้วงเงินรวมต่อปี ใช้งานง่ายและยืดหยุ่นกว่าในหลายกรณี ส่วนแบบแยกค่าใช้จ่ายจะมีการจำกัดวงเงินตามหมวด เช่น ค่าห้อง ค่าผ่าตัด หรือค่ารักษาอื่น ๆ การเลือกควรดูวงเงินรวม โรงพยาบาลที่ใช้ประจำ และงบประมาณเบี้ยที่รับได้',
  },
  {
    id: 'pre-existing',
    question: 'มีโรคประจำตัว สมัครประกันชีวิต AIA ได้ไหม?',
    answer:
      'สามารถสมัครได้ แต่ผลการพิจารณาขึ้นอยู่กับข้อมูลสุขภาพ ประวัติการรักษา อายุ อาชีพ และเงื่อนไขของแบบประกัน บริษัทอาจรับปกติ เพิ่มเบี้ย ยกเว้นบางโรค หรือขอเอกสารทางการแพทย์เพิ่มเติมก่อนอนุมัติ',
  },
  {
    id: 'ci-needed',
    question: 'ประกันโรคร้ายแรง AIA จำเป็นไหม ถ้ามีประกันสุขภาพแล้ว?',
    answer:
      'ประกันสุขภาพช่วยดูแลค่ารักษาพยาบาล ส่วนประกันโรคร้ายแรงมักช่วยเรื่องเงินก้อน เมื่อเข้าเงื่อนไขโรคร้ายแรงตามกรมธรรม์ เงินก้อนนี้สามารถใช้เป็นค่าพักฟื้น รายได้ทดแทน ค่าเดินทาง หรือค่าใช้จ่ายครอบครัวระหว่างรักษาตัวได้',
  },
  {
    id: 'premium-budget',
    question: 'เบี้ยประกันควรจ่ายเท่าไรต่อปีถึงจะเหมาะสม?',
    answer:
      'ไม่มีตัวเลขเดียวที่เหมาะกับทุกคน ควรดูจากรายได้ ภาระครอบครัว เงินสำรองฉุกเฉิน หนี้สิน และเป้าหมายความคุ้มครอง โดยทั่วไปควรวางแผนให้จ่ายไหวต่อเนื่อง ไม่กระทบสภาพคล่อง และยังได้ความคุ้มครองที่ตอบโจทย์จริง',
  },
  {
    id: 'tax-deduction',
    question: 'ประกัน AIA แบบไหนใช้ลดหย่อนภาษีได้?',
    answer:
      'แบบประกันที่สามารถใช้สิทธิลดหย่อนภาษีได้ต้องเป็นไปตามเงื่อนไขของกรมธรรม์ และหลักเกณฑ์ภาษีที่เกี่ยวข้อง เช่น ประกันชีวิต ประกันสุขภาพ หรือประกันบำนาญบางประเภท ก่อนสมัครควรตรวจสอบเงื่อนไขของแบบประกันและเป้าหมายภาษีของแต่ละคน',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
}

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQS[0].id)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="faq" id="faq">
      <motion.div
        className="faq__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p className="section-tag" variants={fadeUp}>
          คำถามที่พบบ่อย
        </motion.p>
        <motion.h2 variants={fadeUp}>คำถามที่พบบ่อยเกี่ยวกับประกัน AIA</motion.h2>
        <motion.p className="faq__lead" variants={fadeUp}>
          รวมคำถามสำคัญก่อนเลือกประกันชีวิต ประกันสุขภาพ ประกันโรคร้ายแรง
          และแผนลดหย่อนภาษี เพื่อช่วยให้คุณตัดสินใจได้ชัดเจนขึ้น
        </motion.p>
      </motion.div>

      <motion.div
        className="faq__list"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {FAQS.map((item) => {
          const isOpen = openId === item.id
          return (
            <motion.div key={item.id} className="faq__item" variants={fadeUp}>
              <button
                type="button"
                className={`faq__question${isOpen ? ' faq__question--open' : ''}`}
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
              >
                <span>{item.question}</span>
                <motion.span
                  className="faq__icon"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq__answer-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 24 }}
                  >
                    <p className="faq__answer">{item.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
