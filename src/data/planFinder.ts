export type QuizOption = {
  id: string
  emoji: string
  label: string
  weights: Record<string, number>
}

export type QuizQuestion = {
  id: string
  label: string
  options: QuizOption[]
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'age',
    label: 'ช่วงอายุของคุณ',
    options: [
      { id: 'young', emoji: '🧑', label: 'ต่ำกว่า 30 ปี', weights: { health: 2, accident: 2 } },
      { id: 'adult', emoji: '👨', label: '30 – 45 ปี', weights: { health: 3, life: 2, 'critical-illness': 1 } },
      { id: 'mid', emoji: '👩', label: '46 – 55 ปี', weights: { health: 2, life: 2, 'critical-illness': 2, pension: 1 } },
      { id: 'senior', emoji: '🧓', label: '56 ปีขึ้นไป', weights: { pension: 3, health: 2, life: 1 } },
    ],
  },
  {
    id: 'family',
    label: 'สถานะครอบครัว',
    options: [
      { id: 'single', emoji: '👤', label: 'โสด', weights: { health: 2, accident: 1 } },
      { id: 'couple', emoji: '💑', label: 'คู่สมรส ไม่มีลูก', weights: { health: 2, life: 2 } },
      { id: 'kids', emoji: '👨‍👩‍👧', label: 'มีลูก', weights: { 'health-kids': 4, health: 2, life: 2 } },
      { id: 'provider', emoji: '🏠', label: 'หัวหน้าครอบครัว มีภาระ', weights: { life: 4, health: 2, 'critical-illness': 2 } },
    ],
  },
  {
    id: 'concern',
    label: 'กังวลเรื่องอะไรมากที่สุด',
    options: [
      { id: 'medical', emoji: '🏥', label: 'ค่ารักษาพยาบาล', weights: { health: 5, 'health-kids': 1 } },
      { id: 'life', emoji: '🛡️', label: 'คนข้างหลัง / ชีวิต', weights: { life: 5, 'critical-illness': 1 } },
      { id: 'ci', emoji: '💗', label: 'โรคร้ายแรง', weights: { 'critical-illness': 5, health: 1 } },
      { id: 'retire', emoji: '🌴', label: 'เกษียณ / ลดภาษี', weights: { pension: 5, savings: 2 } },
    ],
  },
  {
    id: 'budget',
    label: 'งบประมาณเบี้ยประมาณ (ต่อปี)',
    options: [
      { id: 'low', emoji: '💰', label: 'น้อยกว่า 20,000 บาท', weights: { accident: 3, 'health-kids': 1 } },
      { id: 'mid', emoji: '💵', label: '20,000 – 50,000 บาท', weights: { health: 3, life: 1 } },
      { id: 'high', emoji: '💎', label: '50,000 – 100,000 บาท', weights: { health: 2, life: 2, 'critical-illness': 2 } },
      { id: 'premium', emoji: '👑', label: 'มากกว่า 100,000 บาท', weights: { prestige: 3, pension: 2, 'unit-linked': 2 } },
    ],
  },
]

export const CATEGORY_LABELS: Record<string, string> = {
  health: 'ประกันสุขภาพ',
  'health-kids': 'ประกันสุขภาพเด็ก',
  'critical-illness': 'ประกันโรคร้ายแรง',
  accident: 'ประกันอุบัติเหตุ',
  life: 'ประกันชีวิต',
  prestige: 'AIA PRESTIGE',
  'group-insurance': 'ประกันกลุ่ม',
  savings: 'ประกันออมทรัพย์',
  pension: 'ประกันบำนาญ',
  'unit-linked': 'UNIT LINKED',
}

export function scoreQuiz(answers: Record<string, string>) {
  const scores: Record<string, number> = {}

  for (const question of QUIZ_QUESTIONS) {
    const answerId = answers[question.id]
    const option = question.options.find((item) => item.id === answerId)
    if (!option) continue

    for (const [categoryId, weight] of Object.entries(option.weights)) {
      scores[categoryId] = (scores[categoryId] ?? 0) + weight
    }
  }

  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1])
  const topCategory = sorted[0]?.[0] ?? 'health'

  return { scores, topCategory }
}
