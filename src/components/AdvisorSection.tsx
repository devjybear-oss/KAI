import { motion } from 'framer-motion'
import { ADVISOR } from '../data/advisor'
import { LINE_HREF, PHONE_HREF } from '../data/contact'

const REASONS = [
  {
    num: '01',
    title: 'ช่วยเลือกแผนให้เหมาะกับงบประมาณ',
    desc: 'ไม่ใช่เลือกจากเบี้ยถูกที่สุดเพียงอย่างเดียว แต่ช่วยดูวงเงินคุ้มครอง ความจำเป็น ภาระครอบครัว และงบประมาณที่จ่ายไหวในระยะยาว',
  },
  {
    num: '02',
    title: 'อธิบายเงื่อนไขสำคัญให้เข้าใจก่อนสมัคร',
    desc: 'เช่น ระยะเวลารอคอย ข้อยกเว้น การแถลงสุขภาพ เงื่อนไขการรับประกัน และจุดที่ควรรู้ก่อนตัดสินใจทำประกัน',
  },
  {
    num: '03',
    title: 'ดูแลหลังการขายเมื่อถึงเวลาต้องใช้สิทธิ์',
    desc: 'ช่วยตรวจสอบความคุ้มครอง แนะนำเอกสารเบื้องต้น ติดตามขั้นตอน และให้คำแนะนำเมื่อลูกค้าต้องเคลมหรือมีคำถามเกี่ยวกับกรมธรรม์',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
}

export function AdvisorSection() {
  return (
    <section className="advisor" id="advisor">
      <motion.div
        className="advisor__intro"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p className="section-tag" variants={fadeUp}>
          ที่ปรึกษาการเงินและประกันชีวิตมืออาชีพ
        </motion.p>
        <motion.h2 variants={fadeUp}>ทำไมต้องปรึกษา {ADVISOR.shortName}?</motion.h2>
        <motion.p className="advisor__lead" variants={fadeUp}>
          {ADVISOR.brand} คือบริการตัวแทนประกันชีวิตและที่ปรึกษาทางการเงิน
          ที่มุ่งเน้นการวางแผนการเงิน ประกันชีวิตและประกันสุขภาพ เพื่อความมั่นคงของครอบครัว
        </motion.p>
      </motion.div>

      <motion.div
        className="advisor__profile"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <div className="advisor__photo-wrap">
          <img src={ADVISOR.photo} alt={ADVISOR.name} className="advisor__photo" />
          <span className="advisor__photo-badge">AIA</span>
        </div>

        <div className="advisor__profile-body">
          <p className="advisor__brand">{ADVISOR.brand}</p>
          <h3>{ADVISOR.name}</h3>
          <p className="advisor__title">{ADVISOR.title}</p>
          <p className="advisor__quote">"{ADVISOR.quote}"</p>
          <p className="advisor__tagline">{ADVISOR.tagline}</p>

          <div className="advisor__stats">
            {ADVISOR.stats.map((stat) => (
              <article key={stat.label} className="advisor__stat">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>

          <div className="advisor__quick-actions">
            <motion.a
              href={LINE_HREF}
              className="advisor__action advisor__action--line"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              💬 คุยทาง LINE
            </motion.a>
            <motion.a
              href={PHONE_HREF}
              className="advisor__action advisor__action--phone"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              📞 โทรปรึกษา
            </motion.a>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="advisor__why"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
      >
        <motion.h3 variants={fadeUp}>
          ทำไมควรปรึกษาตัวแทน AIA ก่อนตัดสินใจทำประกัน?
        </motion.h3>
        <motion.p className="advisor__why-lead" variants={fadeUp}>
          เพราะแบบประกันแต่ละแบบมีเงื่อนไข วงเงิน ความคุ้มครอง และข้อยกเว้นที่แตกต่างกัน
          การมีตัวแทนช่วยวิเคราะห์จะทำให้คุณเลือกแผนได้เหมาะกับงบประมาณ สุขภาพ
          และเป้าหมายของครอบครัวมากขึ้น
        </motion.p>

        <div className="advisor__reasons">
          {REASONS.map((reason) => (
            <motion.article
              key={reason.num}
              className="advisor__reason-card"
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="advisor__reason-num">{reason.num}</span>
              <h4>{reason.title}</h4>
              <p>{reason.desc}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
