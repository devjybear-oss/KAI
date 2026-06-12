import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { CONTACT_CHANNELS, CONTACT_TOPICS } from '../data/contact'

type FormState = {
  name: string
  phone: string
  topic: string
  message: string
}

const INITIAL_FORM: FormState = {
  name: '',
  phone: '',
  topic: CONTACT_TOPICS[0],
  message: '',
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 100 } },
}

export function ContactSection() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'กรุณากรอกชื่อ-นามสกุล'
    if (!form.phone.trim()) next.phone = 'กรุณากรอกเบอร์โทรศัพท์'
    else if (!/^0\d[\d\s-]{7,}$/.test(form.phone.replace(/\s/g, ''))) {
      next.phone = 'รูปแบบเบอร์โทรไม่ถูกต้อง'
    }
    if (!form.message.trim()) next.message = 'กรุณาระบุรายละเอียดที่ต้องการสอบถาม'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return
    setSubmitted(true)
  }

  const resetForm = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setSubmitted(false)
  }

  return (
    <section className="contact" id="contact">
      <motion.div
        className="contact__header"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.p className="section-tag" variants={fadeUp}>
          ติดต่อเรา
        </motion.p>
        <motion.h2 variants={fadeUp}>ปรึกษาแนน AIA ได้ทุกช่องทาง</motion.h2>
        <motion.p className="contact__lead" variants={fadeUp}>
          สนใจวางแผนประกันชีวิต ประกันสุขภาพ หรืออยากให้ช่วยเปรียบเทียบแผน
          ติดต่อได้ผ่านช่องทางด้านล่าง หรือกรอกแบบฟอร์มเพื่อให้ตัวแทนติดต่อกลับ
        </motion.p>
      </motion.div>

      <div className="contact__layout">
        <motion.div
          className="contact__channels"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
        >
          {CONTACT_CHANNELS.map((channel) => (
            <motion.article
              key={channel.id}
              className="contact__channel-card"
              variants={fadeUp}
              whileHover={{ y: -4 }}
            >
              <span className="contact__channel-emoji">{channel.emoji}</span>
              <div>
                <p className="contact__channel-label">{channel.label}</p>
                {channel.href ? (
                  <a href={channel.href} className="contact__channel-value" target="_blank" rel="noreferrer">
                    {channel.value}
                  </a>
                ) : (
                  <p className="contact__channel-value">{channel.value}</p>
                )}
                {channel.note && <p className="contact__channel-note">{channel.note}</p>}
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          className="contact__form-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 100 }}
        >
          {submitted ? (
            <div className="contact__success">
              <span className="contact__success-emoji">✅</span>
              <h3>ส่งข้อความเรียบร้อยแล้ว</h3>
              <p>
                ขอบคุณที่ติดต่อเรา แนน AIA จะติดต่อกลับภายใน 1 วันทำการ
                หากเรื่องด่วน สามารถโทรหรือทัก LINE ได้ทันที
              </p>
              <button type="button" className="contact__submit" onClick={resetForm}>
                ส่งข้อความอีกครั้ง
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit} noValidate>
              <h3>ส่งข้อความถึงตัวแทน</h3>
              <p className="contact__form-desc">กรอกข้อมูลเบื้องต้น แล้วเราจะติดต่อกลับโดยเร็วที่สุด</p>

              <label className="contact__field">
                <span>ชื่อ-นามสกุล *</span>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                  className={errors.name ? 'contact__input--error' : ''}
                  placeholder="เช่น สมชาย ใจดี"
                  autoComplete="name"
                />
                {errors.name && <em>{errors.name}</em>}
              </label>

              <label className="contact__field">
                <span>เบอร์โทรศัพท์ *</span>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                  className={errors.phone ? 'contact__input--error' : ''}
                  placeholder="08x-xxx-xxxx"
                  autoComplete="tel"
                />
                {errors.phone && <em>{errors.phone}</em>}
              </label>

              <label className="contact__field">
                <span>หัวข้อที่สนใจ</span>
                <select
                  value={form.topic}
                  onChange={(e) => setForm((prev) => ({ ...prev, topic: e.target.value }))}
                >
                  {CONTACT_TOPICS.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>

              <label className="contact__field">
                <span>รายละเอียด *</span>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                  className={errors.message ? 'contact__input--error' : ''}
                  placeholder="เช่น อายุ 35 ปี สนใจประกันสุขภาพ งบประมาณประมาณ 15,000 บาท/ปี"
                />
                {errors.message && <em>{errors.message}</em>}
              </label>

              <button type="submit" className="contact__submit">
                ส่งข้อความ
              </button>
              <p className="contact__privacy">
                ข้อมูลที่ส่งจะใช้เพื่อติดต่อกลับเท่านั้น ไม่มีการส่งต่อให้บุคคลที่สาม
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
