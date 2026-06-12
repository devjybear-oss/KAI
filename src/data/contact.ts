import { ADVISOR } from './advisor'

export const PHONE_DISPLAY = '081-234-5678'
export const PHONE_HREF = 'tel:+66812345678'
export const LINE_ID = '@aia-khun-nan'
export const LINE_HREF = 'https://line.me/R/ti/p/@aia-khun-nan'
export const EMAIL = 'advisor@aia-khun-nan.com'
export const EMAIL_HREF = `mailto:${EMAIL}`

export type ContactChannel = {
  id: string
  emoji: string
  label: string
  value: string
  href?: string
  note?: string
}

export const CONTACT_CHANNELS: ContactChannel[] = [
  {
    id: 'phone',
    emoji: '📞',
    label: 'โทรศัพท์',
    value: PHONE_DISPLAY,
    href: PHONE_HREF,
    note: `โทรหา${ADVISOR.shortName} หรือทักนัดหมายได้ทุกวัน`,
  },
  {
    id: 'line',
    emoji: '💬',
    label: 'LINE',
    value: LINE_ID,
    href: LINE_HREF,
    note: 'ตอบกลับภายใน 1 วันทำการ',
  },
  {
    id: 'email',
    emoji: '✉️',
    label: 'อีเมล',
    value: EMAIL,
    href: EMAIL_HREF,
    note: 'สำหรับส่งเอกสารหรือสอบถามรายละเอียด',
  },
  {
    id: 'hours',
    emoji: '🕐',
    label: 'เวลาทำการ',
    value: 'จันทร์ – เสาร์ 09:00 – 18:00',
    note: 'นอกเวลาทำการสามารถทิ้งข้อความไว้ได้',
  },
  {
    id: 'location',
    emoji: '📍',
    label: 'พื้นที่ให้บริการ',
    value: 'กรุงเทพมหานคร และปริมณฑล',
    note: 'นัดพบตัวแทนได้ตามสะดวก หรือปรึกษาออนไลน์',
  },
]

export const CONTACT_TOPICS = [
  'ประกันชีวิต',
  'ประกันสุขภาพ',
  'ประกันโรคร้ายแรง',
  'ประกันอุบัติเหตุ',
  'วางแผนเกษียณ / ลดหย่อนภาษี',
  'อื่น ๆ',
] as const
