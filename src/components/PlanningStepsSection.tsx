import { motion } from 'framer-motion'

const STEPS = [
  {
    num: '01',
    title: 'ส่งข้อมูลเบื้องต้น',
    desc: 'แจ้งอายุ อาชีพ งบประมาณ และเป้าหมายที่ต้องการวางแผน เช่น ค่ารักษาพยาบาล เงินก้อนให้ครอบครัว หรือวางแผนเกษียณ',
  },
  {
    num: '02',
    title: 'วิเคราะห์ความต้องการ',
    desc: 'ช่วยดูความคุ้มครองเดิม ภาระครอบครัว รายได้ ค่าใช้จ่าย และความเสี่ยงที่ควรวางแผนเพิ่มเติม',
  },
  {
    num: '03',
    title: 'เปรียบเทียบแบบประกัน',
    desc: 'อธิบายจุดเด่น ข้อจำกัด เบี้ยประกัน วงเงินคุ้มครอง ระยะเวลารอคอย และเงื่อนไขสำคัญของแต่ละแบบ',
  },
  {
    num: '04',
    title: 'ดูแลหลังสมัคร',
    desc: 'ช่วยติดตามผล อธิบายกรมธรรม์ แจ้งเตือนข้อมูลสำคัญ และให้คำแนะนำเมื่อลูกค้าต้องใช้สิทธิ์หรือมีคำถาม',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
}

export function PlanningStepsSection() {
  return (
    <section className="planning" id="planning">
      <motion.div
        className="planning__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p className="section-tag" variants={fadeUp}>
          ขั้นตอนการวางแผน
        </motion.p>
        <motion.h2 variants={fadeUp}>ขั้นตอนการวางแผนประกันกับแนน AIA</motion.h2>
        <motion.p className="planning__lead" variants={fadeUp}>
          เริ่มจากการทำความเข้าใจเป้าหมาย งบประมาณ และความคุ้มครองที่ต้องการ
          ก่อนช่วยเปรียบเทียบแบบประกันชีวิต AIA ให้เหมาะกับครอบครัวของคุณ
        </motion.p>
      </motion.div>

      <motion.ol
        className="planning__steps"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {STEPS.map((step) => (
          <motion.li key={step.num} className="planning__step" variants={fadeUp}>
            <span className="planning__step-num">{step.num}</span>
            <div className="planning__step-body">
              <h3>{step.title}</h3>
              <p>{step.desc}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}
