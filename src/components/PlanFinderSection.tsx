import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { CATEGORIES } from '../data/insurance'
import { CATEGORY_LABELS, QUIZ_QUESTIONS, scoreQuiz } from '../data/planFinder'

type Props = {
  onRecommend: (categoryId: string) => void
}

export function PlanFinderSection({ onRecommend }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [finished, setFinished] = useState(false)

  const question = QUIZ_QUESTIONS[step]
  const result = useMemo(() => (finished ? scoreQuiz(answers) : null), [finished, answers])
  const topCategory = CATEGORIES.find((cat) => cat.id === result?.topCategory)

  const selectOption = (questionId: string, optionId: string) => {
    const nextAnswers = { ...answers, [questionId]: optionId }
    setAnswers(nextAnswers)

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep((prev) => prev + 1)
      return
    }

    setFinished(true)
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setFinished(false)
  }

  return (
    <section className="finder" id="finder">
      <motion.div
        className="finder__header"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <p className="section-tag">ช่วยเลือกแผน</p>
        <h2>แบบทดสอบช่วยเลือกแผนประกัน</h2>
        <p>ตอบคำถาม 4 ข้อ ใช้เวลาไม่ถึง 1 นาที แล้วเราจะแนะนำหมวดผลิตภัณฑ์ที่เหมาะกับคุณ</p>
      </motion.div>

      <motion.div
        className="finder__card"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
      >
        {!finished ? (
          <div className="finder-quiz">
            <div className="finder__progress">
              <span>
                คำถาม {step + 1} / {QUIZ_QUESTIONS.length}
              </span>
              <div className="finder__progress-bar">
                <motion.div
                  className="finder__progress-fill"
                  animate={{ width: `${((step + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <p className="finder-quiz__label">{question.label}</p>
            <div className="finder-quiz__options">
              {question.options.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`finder-quiz__option${answers[question.id] === option.id ? ' finder-quiz__option--active' : ''}`}
                  onClick={() => selectOption(question.id, option.id)}
                >
                  <span>{option.emoji}</span>
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            {step > 0 && (
              <button type="button" className="finder__back" onClick={() => setStep((prev) => prev - 1)}>
                ← ย้อนกลับ
              </button>
            )}
          </div>
        ) : (
          <div className="finder__result">
            <span className="finder__result-emoji">{topCategory?.emoji ?? '🛡️'}</span>
            <h3>แนะนำหมวด: {CATEGORY_LABELS[result!.topCategory] ?? result!.topCategory}</h3>
            <p>
              จากคำตอบของคุณ หมวด <strong>{topCategory?.name}</strong> น่าจะตอบโจทย์มากที่สุด
              {topCategory?.description ? ` — ${topCategory.description}` : ''}
            </p>
            <div className="finder__result-actions">
              <motion.button
                type="button"
                className="finder__result-btn finder__result-btn--primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onRecommend(result!.topCategory)}
              >
                ดูผลิตภัณฑ์ในหมวดนี้ →
              </motion.button>
              <button type="button" className="finder__result-btn" onClick={reset}>
                ทำแบบทดสอบใหม่
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  )
}
