import type { CartItem } from '../components/Cart'

export type OrderStatus = 'preparing' | 'ready' | 'delivering' | 'delivered'

export type DeliveryAddress = {
  name: string
  phone: string
  address: string
  note: string
}

export type ActiveOrder = {
  id: string
  items: CartItem[]
  total: number
  address: DeliveryAddress
  status: OrderStatus
}

export const STATUS_STEPS: {
  id: OrderStatus
  label: string
  emoji: string
  duration: number
}[] = [
  { id: 'preparing', label: 'กำลังทำอาหาร', emoji: '👨‍🍳', duration: 5000 },
  { id: 'ready', label: 'ทำอาหารเสร็จ', emoji: '✅', duration: 3000 },
  { id: 'delivering', label: 'กำลังจัดส่ง', emoji: '🛵', duration: 6000 },
]

export const EMPTY_ADDRESS: DeliveryAddress = {
  name: '',
  phone: '',
  address: '',
  note: '',
}
