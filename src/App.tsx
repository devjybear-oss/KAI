import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BASE_DISH, BASE_PRICE, type MenuItem, type Topping } from './data/menu'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { MenuSection } from './components/MenuSection'
import { RandomFoodPicker } from './components/RandomFoodPicker'
import { Cart, type CartItem } from './components/Cart'
import { OrderTracking } from './components/OrderTracking'
import type { ActiveOrder, DeliveryAddress } from './types/order'
import { STATUS_STEPS } from './types/order'
import './index.css'

const NEXT_STATUS: Record<ActiveOrder['status'], ActiveOrder['status'] | null> = {
  preparing: 'ready',
  ready: 'delivering',
  delivering: 'delivered',
  delivered: null,
}

function getDuration(status: ActiveOrder['status']) {
  if (status === 'delivered') return 0
  return STATUS_STEPS.find((s) => s.id === status)?.duration ?? 4000
}

function App() {
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null)
  const [trackingOpen, setTrackingOpen] = useState(false)

  const customTotal = useMemo(
    () => BASE_PRICE + selectedToppings.reduce((sum, t) => sum + t.price, 0),
    [selectedToppings],
  )

  const flashAdded = useCallback(() => {
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }, [])

  const toggleTopping = useCallback((topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id)
      return exists ? prev.filter((t) => t.id !== topping.id) : [...prev, topping]
    })
  }, [])

  const addCustomToCart = useCallback(() => {
    const item: CartItem = {
      id: crypto.randomUUID(),
      name: BASE_DISH.name,
      emoji: BASE_DISH.emoji,
      toppings: [...selectedToppings],
      total: customTotal,
    }
    setCart((prev) => [...prev, item])
    flashAdded()
  }, [selectedToppings, customTotal, flashAdded])

  const addMenuItem = useCallback(
    (menuItem: MenuItem, extraToppings: Topping[] = []) => {
      const toppingTotal = extraToppings.reduce((sum, t) => sum + t.price, 0)
      const item: CartItem = {
        id: crypto.randomUUID(),
        name: menuItem.name,
        emoji: menuItem.emoji,
        toppings: extraToppings,
        total: menuItem.price + toppingTotal,
      }
      setCart((prev) => [...prev, item])
      flashAdded()
    },
    [flashAdded],
  )

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const checkout = useCallback(
    (address: DeliveryAddress) => {
      const orderTotal = cart.reduce((sum, item) => sum + item.total, 0)
      setActiveOrder({
        id: crypto.randomUUID(),
        items: [...cart],
        total: orderTotal,
        address,
        status: 'preparing',
      })
      setTrackingOpen(true)
      setCart([])
      setCartOpen(false)
    },
    [cart],
  )

  useEffect(() => {
    if (!activeOrder || activeOrder.status === 'delivered') return

    const next = NEXT_STATUS[activeOrder.status]
    if (!next) return

    const timer = setTimeout(() => {
      setActiveOrder((prev) => (prev ? { ...prev, status: next } : null))
    }, getDuration(activeOrder.status))

    return () => clearTimeout(timer)
  }, [activeOrder?.id, activeOrder?.status])

  return (
    <div className="app">
      <Header
        cartCount={cart.length}
        hasActiveOrder={!!activeOrder && activeOrder.status !== 'delivered'}
        onCartClick={() => setCartOpen(true)}
        onTrackClick={() => setTrackingOpen(true)}
      />
      <main>
        <Hero />
        <RandomFoodPicker onAddPick={addMenuItem} />
        <MenuSection
          selectedToppings={selectedToppings}
          onToggleTopping={toggleTopping}
          onAddCustom={addCustomToCart}
          onAddItem={addMenuItem}
          customTotal={customTotal}
          justAdded={justAdded}
        />
      </main>
      <footer className="footer">
        <p>© 2026 KAI — ข้าวไข่เจียว · กะเพรา · ข้าวผัด สดใหม่ทุกจาน 🍳</p>
      </footer>

      <Cart
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />

      <AnimatePresence>
        {activeOrder && trackingOpen && (
          <OrderTracking
            order={activeOrder}
            onClose={() => {
              if (activeOrder.status === 'delivered') {
                setActiveOrder(null)
              }
              setTrackingOpen(false)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default App
