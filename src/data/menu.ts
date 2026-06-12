export type Topping = {
  id: string
  name: string
  emoji: string
  price: number
  color: string
}

export const BASE_PRICE = 45

export const BASE_DISH = {
  name: 'ข้าวไข่เจียว',
  emoji: '🍳',
  description: 'ข้าวหอมมะลิร้อนๆ ไข่เจียวฟูกรอบ ราดซอสสูตรลับ',
}

export const TOPPINGS: Topping[] = [
  { id: 'pork', name: 'หมูกรอบ', emoji: '🥓', price: 20, color: '#e85d3a' },
  { id: 'chicken', name: 'ไก่ทอด', emoji: '🍗', price: 25, color: '#f4a236' },
  { id: 'shrimp', name: 'กุ้งทอด', emoji: '🦐', price: 30, color: '#ff6b6b' },
  { id: 'ham', name: 'แฮม', emoji: '🍖', price: 15, color: '#d4577a' },
  { id: 'sausage', name: 'ไส้กรอก', emoji: '🌭', price: 15, color: '#c0392b' },
  { id: 'pickle', name: 'ผักกาดดอง', emoji: '🥒', price: 10, color: '#27ae60' },
  { id: 'chili', name: 'พริกสด', emoji: '🌶️', price: 0, color: '#e74c3c' },
  { id: 'sauce', name: 'ซอสพิเศษ', emoji: '🫙', price: 5, color: '#8b4513' },
]
