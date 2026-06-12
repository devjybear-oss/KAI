export type Rider = {
  id: string
  name: string
  emoji: string
  price: number
  color: string
}

export type PlanCategory = {
  id: string
  name: string
  emoji: string
  description: string
}

export type InsurancePlan = {
  id: string
  categoryId: string
  name: string
  emoji: string
  price: number
  color: string
  coverage: string
  customizable?: boolean
}

export const BASE_PREMIUM = 1200

export const FLAGSHIP_PLAN = {
  id: 'aia-life',
  headline: 'วางแผนประกันที่จ่ายไหว คุ้มครองครบ',
  highlight: 'กับแนน AIA',
  emoji: '🛡️',
  description:
    'คุณ ศศิวิมล อนันทชาติวงศ์ พร้อมช่วยเลือกแผนประกันชีวิตและสุขภาพจาก AIA ให้เหมาะกับงบและเป้าหมายของครอบครัว',
}

export const CATEGORIES: PlanCategory[] = [
  {
    id: 'health',
    name: 'ประกันสุขภาพ',
    emoji: '🏥',
    description:
      'ชดเชยค่ารักษาพยาบาลจากเจ็บป่วย อุบัติเหตุ หรือโรคร้ายแรง ตามวงเงินที่ลูกค้าทำไว้ แผนยอดนิยม เช่น AIA HEALTH HAPPY',
  },
  {
    id: 'health-kids',
    name: 'ประกันสุขภาพเด็ก',
    emoji: '👶',
    description:
      'วางแผนสุขภาพเบื้องต้นให้ลูกน้อย บรรเทาค่ารักษาที่สูงลิบ พร้อมวงเงิน OPD แผนยอดนิยม AIA HEALTH STARTER',
  },
  {
    id: 'critical-illness',
    name: 'ประกันโรคร้ายแรง',
    emoji: '💗',
    description:
      'จ่ายเงินก้อนเมื่อตรวจพบโรคร้ายแรง มะเร็ง สมอง หัวใจ แผนยอดนิยม AIA CI SUPERCARE คุ้มครองถึง 99 ปี',
  },
  {
    id: 'accident',
    name: 'ประกันอุบัติเหตุ',
    emoji: '🚑',
    description:
      'ประกันอุบัติเหตุ PA คุ้มครองบาดเจ็บ ทุพพลภาพ หรือเสียชีวิตจากอุบัติเหตุ เบี้ยเข้าถึงง่าย',
  },
  {
    id: 'life',
    name: 'ประกันชีวิต',
    emoji: '🛡️',
    description:
      'เลือกแผนตามเป้าหมาย คุ้มครองชีวิต ออมทรัพย์ ลดหย่อนภาษี วางแผนมรดก คุ้มครองค่าความสามารถ หรือเกษียณ',
  },
  {
    id: 'prestige',
    name: 'AIA PRESTIGE',
    emoji: '👑',
    description:
      'AIA Prestige Club เอกสิทธิ์พิเศษ วงเงินคุ้มครองสูง และบริการระดับพรีเมียม',
  },
  {
    id: 'group',
    name: 'ประกันกลุ่ม',
    emoji: '👥',
    description:
      'สร้างสวัสดิการประกันกลุ่ม ครอบคลุมสุขภาพ ชีวิต และอุบัติเหตุ สำหรับพนักงานประจำ',
  },
  {
    id: 'savings',
    name: 'ประกันสะสมทรัพย์',
    emoji: '💰',
    description:
      'ผสานการออมกับความคุ้มครองชีวิต มีเงินคืนระหว่างสัญญา บางแบบลดหย่อนภาษีได้',
  },
  {
    id: 'pension',
    name: 'ประกันบำนาญ',
    emoji: '🌴',
    description:
      'วางแผนเกษียณ ลดหย่อนภาษีเพิ่มสูงสุด 200,000 บาท แผนยอดนิยม AIA ANNUITY SURE',
  },
  {
    id: 'unit-linked',
    name: 'UNIT LINKED',
    emoji: '📈',
    description:
      'ประกันชีวิตควบการลงทุนในกองทุนรวม ยืดหยุ่นตามช่วงจังหวะชีวิต',
  },
]

export const PLANS: InsurancePlan[] = [
  // ประกันสุขภาพ
  {
    id: 'aia-health-happy',
    categoryId: 'health',
    name: 'AIA HEALTH HAPPY',
    emoji: '🏥',
    price: 2500,
    color: '#d31145',
    coverage:
      'แบบเหมาจ่าย วงเงินสูงสุด 25 ล้านบาท/ปี ไม่จำกัดต่อครั้ง เพิ่มผลประโยชน์ 2 เท่าเมื่อพบโรคร้ายแรง',
  },
  {
    id: 'aia-ci-supercare-health',
    categoryId: 'health',
    name: 'AIA CI SUPERCARE',
    emoji: '💗',
    price: 2200,
    color: '#a00d35',
    coverage:
      'จ่ายเงินก้อนเมื่อวินิจฉัยโรคร้ายแรง เบี้ยคงที่ ชำระเบี้ย 10–15 ปี เสริมแผนสุขภาพ',
  },
  // ประกันสุขภาพเด็ก
  {
    id: 'aia-health-starter',
    categoryId: 'health-kids',
    name: 'AIA HEALTH STARTER',
    emoji: '👶',
    price: 1200,
    color: '#d31145',
    coverage:
      'แผนใหม่ 2569 มี OPD และ Copayment 10% ที่ AIA Smart Network ทำได้ตั้งแต่อายุ 15 วัน',
  },
  {
    id: 'aia-health-kids-overview',
    categoryId: 'health-kids',
    name: 'ประกันสุขภาพเด็ก AIA',
    emoji: '🧒',
    price: 950,
    color: '#e85d75',
    coverage:
      'คุ้มครองตั้งแต่แรกเกิด เบี้ยประกันเริ่มต้นเหมาะกับครอบครัว วางแผนควบคู่กับผู้ปกครองได้',
  },
  // ประกันโรคร้ายแรง
  {
    id: 'aia-ci-supercare',
    categoryId: 'critical-illness',
    name: 'AIA CI SUPERCARE',
    emoji: '💗',
    price: 2200,
    color: '#d31145',
    coverage:
      'คุ้มครองตลอดชีพถึง 99 ปี เบี้ยคงที่ ชำระ 10–15 ปี มีเงินสะสมและรับเงินคืนเมื่อครบสัญญา',
  },
  {
    id: 'aia-ci-overview',
    categoryId: 'critical-illness',
    name: 'ประกันโรคร้ายแรง AIA',
    emoji: '🩺',
    price: 1500,
    color: '#a00d35',
    coverage:
      'เสริมความคุ้มครองจากประกันสุขภาพ ช่วยรักษาสภาพคล่องทางการเงิน เลือกวงเงินตามความเสี่ยงและงบประมาณ',
  },
  // ประกันอุบัติเหตุ
  {
    id: 'aia-pa',
    categoryId: 'accident',
    name: 'ประกันอุบัติเหตุ AIA',
    emoji: '🚑',
    price: 450,
    color: '#d31145',
    coverage:
      'คุ้มครองการบาดเจ็บจากอุบัติเหตุ ชดเชยรายได้หรือค่ารักษาตามแผน เบี้ยประกันเข้าถึงง่าย',
  },
  {
    id: 'aia-pa-supplement',
    categoryId: 'accident',
    name: 'แผนเสริมอุบัติเหตุ AIA',
    emoji: '🦺',
    price: 350,
    color: '#a00d35',
    coverage:
      'เสริมความคุ้มครองจากประกันกลุ่มเดิม เหมาะกับผู้เดินทางบ่อยหรือทำงานเสี่ยง',
  },
  // ประกันชีวิต
  {
    id: 'aia-life',
    categoryId: 'life',
    name: 'ประกันชีวิตพื้นฐาน',
    emoji: '🛡️',
    price: BASE_PREMIUM,
    color: '#d31145',
    coverage:
      'แบบชั่วระยะเวลา (Term) เน้นคุ้มครองชีวิต ไม่มีเงินสะสม ได้ทุนสูงด้วยเบี้ยต่ำ',
  },
  {
    id: 'aia-life-whole',
    categoryId: 'life',
    name: 'ประกันชีวิตพิเศษ',
    emoji: '💼',
    price: 2800,
    color: '#a00d35',
    coverage:
      'แบบตลอดชีพ (Whole Life) คุ้มครอง 90–99 ปี ชำระเบี้ย 10–20 ปี มีมูลค่ากรมธรรม์ วางแผนมรดกได้',
  },
  {
    id: 'aia-life-endowment',
    categoryId: 'life',
    name: 'ประกันชีวิตแบบสะสมทรัพย์',
    emoji: '💰',
    price: 3000,
    color: '#c94a2b',
    coverage:
      'ออมเงินพร้อมความคุ้มครองชีวิต มีเงินคืนระหว่างสัญญา นิยมใช้ลดหย่อนภาษีและเก็บเงินให้ลูก',
  },
  {
    id: 'aia-life-linked',
    categoryId: 'life',
    name: 'แบบประกันควบการลงทุน',
    emoji: '📈',
    price: 4500,
    color: '#7a6555',
    coverage:
      'Unit Linked ยืดหยุ่นสูง ผสานคุ้มครองชีวิตกับการลงทุนในกองทุนรวม โอกาสผลตอบแทนสูงกว่าแบบทั่วไป',
  },
  // AIA PRESTIGE
  {
    id: 'aia-prestige',
    categoryId: 'prestige',
    name: 'AIA PRESTIGE',
    emoji: '👑',
    price: 15000,
    color: '#d31145',
    coverage:
      'วงเงินคุ้มครองชีวิตระดับสูง ยืดหยุ่นในการกำหนดผู้รับผลประโยชน์ เหมาะกับการวางแผนมรดกและภาษี',
  },
  {
    id: 'aia-prestige-service',
    categoryId: 'prestige',
    name: 'AIA PRESTIGE Premium',
    emoji: '💎',
    price: 20000,
    color: '#a00d35',
    coverage:
      'บริการและสิทธิประโยชน์ระดับพรีเมียม สำหรับลูกค้าที่มีภาระทางการเงินสูงและเป้าหมายระยะยาว',
  },
  // ประกันกลุ่ม
  {
    id: 'aia-group',
    categoryId: 'group',
    name: 'ประกันกลุ่ม AIA',
    emoji: '👥',
    price: 800,
    color: '#d31145',
    coverage:
      'ความคุ้มครองชีวิต อุบัติเหตุ และสุขภาพ ออกแบบแผนตามขนาดองค์กร ครอบคลุมพนักงานและครอบครัว',
  },
  {
    id: 'aia-group-welfare',
    categoryId: 'group',
    name: 'สวัสดิการพนักงาน AIA',
    emoji: '🏢',
    price: 1200,
    color: '#e85d75',
    coverage: 'เสริมสวัสดิการพนักงาน บริหารจัดการกรมธรรม์แบบกลุ่มอย่างเป็นระบบ',
  },
  // ประกันออมทรัพย์
  {
    id: 'aia-saving',
    categoryId: 'savings',
    name: 'ประกันออมทรัพย์ AIA',
    emoji: '💰',
    price: 3000,
    color: '#d31145',
    coverage:
      'ออมอย่างมีวินัยตามแผน พร้อมความคุ้มครองชีวิต เตรียมเงินสำหรับการศึกษาของลูก เกษียณ หรือเงินก้อนในอนาคต',
  },
  {
    id: 'aia-saving-tax',
    categoryId: 'savings',
    name: 'แผนออมทรัพย์ลดหย่อนภาษี',
    emoji: '🐷',
    price: 2000,
    color: '#a00d35',
    coverage: 'เหมาะกับเป้าหมายระยะกลาง-ยาว บางแบบใช้ลดหย่อนภาษีได้ตามเงื่อนไข',
  },
  // ประกันบำนาญ
  {
    id: 'aia-annuity-sure',
    categoryId: 'pension',
    name: 'AIA ANNUITY SURE',
    emoji: '🌴',
    price: 3500,
    color: '#d31145',
    coverage:
      'วางแผนเกษียณตัวเลขแน่นอน ลดหย่อนภาษีเพิ่มสูงสุด 200,000 บาท',
  },
  {
    id: 'aia-annuity-linked',
    categoryId: 'pension',
    name: 'UNIT LINKED AIA',
    emoji: '📈',
    price: 5000,
    color: '#c94a2b',
    coverage:
      'ผสานความคุ้มครองชีวิตกับการลงทุน ยืดหยุ่นในการปรับพอร์ต เหมาะกับเป้าหมายระยะยาวควบคู่เกษียณ',
  },
  // UNIT LINKED
  {
    id: 'aia-unit-linked',
    categoryId: 'unit-linked',
    name: 'UNIT LINKED AIA',
    emoji: '📈',
    price: 5000,
    color: '#d31145',
    coverage:
      'ลงทุนในทุนตามนโยบายที่เลือก มีความคุ้มครองชีวิตควบคู่ ยืดหยุ่นในการปรับพอร์ต',
  },
  {
    id: 'aia-unit-linked-growth',
    categoryId: 'unit-linked',
    name: 'แผนลงทุนระยะยาว AIA',
    emoji: '📊',
    price: 4500,
    color: '#a00d35',
    coverage:
      'เหมาะกับผู้ที่ยอมรับความเสี่ยงในการลงทุนได้ระดับหนึ่ง วางแผนการเงินระยะยาวควบคู่ความคุ้มครองชีวิต',
  },
]

export const RIDERS: Rider[] = [
  { id: 'ci', name: 'โรคร้ายแรง', emoji: '💗', price: 800, color: '#d31145' },
  { id: 'hospital', name: 'ค่ารักษารายวัน', emoji: '🛏️', price: 500, color: '#a00d35' },
  { id: 'disability', name: 'ทุพพลภาพถาวร', emoji: '♿', price: 600, color: '#e85d75' },
  { id: 'waiver', name: 'ยกเว้นเบี้ยประกัน', emoji: '📋', price: 400, color: '#7a6555' },
  { id: 'parent', name: 'ผู้ปกครอง', emoji: '👨‍👩‍👧', price: 350, color: '#d4577a' },
  { id: 'child', name: 'บุตร', emoji: '👶', price: 300, color: '#f4a236' },
  { id: 'accident-rider', name: 'อุบัติเหตุเสริม', emoji: '🚑', price: 250, color: '#c0392b' },
  { id: 'medical', name: 'ค่ารักษาเบิกจ่าย', emoji: '💉', price: 450, color: '#27ae60' },
]

export function getPlansByCategory(categoryId: string) {
  return PLANS.filter((plan) => plan.categoryId === categoryId)
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}
