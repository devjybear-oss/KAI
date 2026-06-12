export type Topping = {
  id: string
  name: string
  emoji: string
  price: number
  color: string
}

export type MenuCategory = {
  id: string
  name: string
  emoji: string
  description: string
}

export type MenuItem = {
  id: string
  categoryId: string
  name: string
  emoji: string
  price: number
  color: string
  customizable?: boolean
}

export const BASE_PRICE = 45

export const BASE_DISH = {
  id: 'khao-khai-jiao',
  name: 'ข้าวไข่เจียว',
  emoji: '🍳',
  description: 'ข้าวหอมมะลิร้อนๆ ไข่เจียวฟูกรอบ ราดซอสสูตรลับ',
}

export const CATEGORIES: MenuCategory[] = [
  {
    id: 'khao-khai-jiao',
    name: 'ข้าวไข่เจียว',
    emoji: '🍳',
    description: 'เลือกท็อปปิ้งเพิ่มได้ตามใจ',
  },
  {
    id: 'gaprao',
    name: 'กะเพรา',
    emoji: '🌿',
    description: 'ผัดกะเพรารสจัด หอมเครื่องแกง',
  },
  {
    id: 'khao-pad',
    name: 'ข้าวผัด',
    emoji: '🍚',
    description: 'ข้าวผัดหอมๆ ทานคู่ไข่ดาว',
  },
]

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'khao-khai-jiao',
    categoryId: 'khao-khai-jiao',
    name: 'ข้าวไข่เจียว',
    emoji: '🍳',
    price: BASE_PRICE,
    color: '#f4a236',
    customizable: true,
  },
  {
    id: 'gaprao-pork',
    categoryId: 'gaprao',
    name: 'กะเพราหมู',
    emoji: '🐷',
    price: 55,
    color: '#e85d3a',
  },
  {
    id: 'gaprao-chicken',
    categoryId: 'gaprao',
    name: 'กะเพราไก่',
    emoji: '🍗',
    price: 55,
    color: '#f4a236',
  },
  {
    id: 'gaprao-shrimp',
    categoryId: 'gaprao',
    name: 'กะเพรากุ้ง',
    emoji: '🦐',
    price: 65,
    color: '#ff6b6b',
  },
  {
    id: 'gaprao-crispy-pork',
    categoryId: 'gaprao',
    name: 'กะเพราหมูกรอบ',
    emoji: '🥓',
    price: 65,
    color: '#c94a2b',
  },
  {
    id: 'khao-pad-pork',
    categoryId: 'khao-pad',
    name: 'ข้าวผัดหมู',
    emoji: '🐷',
    price: 50,
    color: '#e85d3a',
  },
  {
    id: 'khao-pad-chicken',
    categoryId: 'khao-pad',
    name: 'ข้าวผัดไก่',
    emoji: '🍗',
    price: 50,
    color: '#f4a236',
  },
  {
    id: 'khao-pad-shrimp',
    categoryId: 'khao-pad',
    name: 'ข้าวผัดกุ้ง',
    emoji: '🦐',
    price: 60,
    color: '#ff6b6b',
  },
  {
    id: 'khao-pad-crispy-pork',
    categoryId: 'khao-pad',
    name: 'ข้าวผัดหมูกรอบ',
    emoji: '🥓',
    price: 60,
    color: '#c94a2b',
  },
]

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

export function getItemsByCategory(categoryId: string) {
  return MENU_ITEMS.filter((item) => item.categoryId === categoryId)
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}
