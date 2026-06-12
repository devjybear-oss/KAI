import { useCallback, useMemo, useState } from 'react'
import { BASE_PRICE, type Topping } from './data/menu'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ToppingSelector } from './components/ToppingSelector'
import { Cart, type CartItem } from './components/Cart'
import { OrderSuccess } from './components/OrderSuccess'
import './index.css'

function App() {
  const [selected, setSelected] = useState<Topping[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  const total = useMemo(
    () => BASE_PRICE + selected.reduce((sum, t) => sum + t.price, 0),
    [selected],
  )

  const toggleTopping = useCallback((topping: Topping) => {
    setSelected((prev) => {
      const exists = prev.some((t) => t.id === topping.id)
      return exists ? prev.filter((t) => t.id !== topping.id) : [...prev, topping]
    })
  }, [])

  const addToCart = useCallback(() => {
    const item: CartItem = {
      id: crypto.randomUUID(),
      toppings: [...selected],
      total,
    }
    setCart((prev) => [...prev, item])
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1200)
  }, [selected, total])

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const checkout = useCallback(() => {
    setCart([])
    setCartOpen(false)
    setOrderSuccess(true)
  }, [])

  return (
    <div className="app">
      <Header cartCount={cart.length} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <ToppingSelector
          selected={selected}
          onToggle={toggleTopping}
          onAddToCart={addToCart}
          total={total}
          justAdded={justAdded}
        />
      </main>
      <footer className="footer">
        <p>© 2026 KAI — ข้าวไข่เจียวสดใหม่ทุกจาน 🍳</p>
      </footer>

      <Cart
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onRemove={removeFromCart}
        onCheckout={checkout}
      />
      <OrderSuccess show={orderSuccess} onClose={() => setOrderSuccess(false)} />
    </div>
  )
}

export default App
