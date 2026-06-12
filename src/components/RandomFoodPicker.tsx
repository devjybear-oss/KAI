import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MENU_ITEMS, TOPPINGS, getCategory, type MenuItem, type Topping } from '../data/menu'

const MESSAGES = [
  'วันนี้ฟ้าบอกให้กินอันนี้!',
  'โชคชี้มาที่จานนี้แล้ว',
  'ลองอันนี้ดูสิ อร่อยแน่นอน',
  'ดวงวันนี้มาแรงมาก!',
  'ไม่ต้องคิดมาก กินเลย!',
]

type Props = {
  onAddPick: (item: MenuItem, toppings: Topping[]) => void
}

type Phase = 'idle' | 'spinning' | 'result'

function pickRandom<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickRandomToppings() {
  const count = Math.floor(Math.random() * 3)
  const shuffled = [...TOPPINGS].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export function RandomFoodPicker({ onAddPick }: Props) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [display, setDisplay] = useState<MenuItem>(MENU_ITEMS[0])
  const [result, setResult] = useState<MenuItem | null>(null)
  const [toppings, setToppings] = useState<Topping[]>([])
  const [message, setMessage] = useState('')
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  useEffect(() => () => clearTimers(), [clearTimers])

  const spin = useCallback(() => {
    clearTimers()
    setPhase('spinning')
    setResult(null)

    const final = pickRandom(MENU_ITEMS)
    const finalToppings = final.customizable ? pickRandomToppings() : []
    const totalTicks = 18 + Math.floor(Math.random() * 8)

    let tick = 0
    const runTick = () => {
      setDisplay(pickRandom(MENU_ITEMS))
      tick += 1

      if (tick >= totalTicks) {
        setDisplay(final)
        setResult(final)
        setToppings(finalToppings)
        setMessage(pickRandom(MESSAGES))
        setPhase('result')
        return
      }

      const delay = 60 + tick * tick * 2.2
      const id = setTimeout(runTick, delay)
      timers.current.push(id)
    }

    runTick()
  }, [clearTimers])

  const total =
    result && result.customizable
      ? result.price + toppings.reduce((s, t) => s + t.price, 0)
      : result?.price ?? 0

  return (
    <section className="random-picker" id="random">
      <motion.div
        className="random-picker__card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ type: 'spring', stiffness: 90 }}
      >
        <div className="random-picker__glow" aria-hidden />

        <p className="section-tag">🎲 ลูกเล่นพิเศษ</p>
        <h2>วันนี้กินอะไรดี?</h2>
        <p className="random-picker__sub">กดสุ่มแล้วปล่อยให้ดวงเลือกเมนูให้คุณ</p>

        <div className="random-picker__stage">
          <motion.div
            className="random-picker__slot"
            animate={
              phase === 'spinning'
                ? { scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] }
                : phase === 'result'
                  ? { scale: [1, 1.08, 1] }
                  : {}
            }
            transition={
              phase === 'spinning'
                ? { duration: 0.3, repeat: Infinity }
                : { type: 'spring', stiffness: 200 }
            }
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={phase === 'result' && result ? result.id : display.id + phase}
                className="random-picker__emoji"
                initial={{ opacity: 0, y: 30, scale: 0.5, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                exit={{ opacity: 0, y: -30, scale: 0.5, rotateX: 90 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {(phase === 'result' && result ? result : display).emoji}
              </motion.span>
            </AnimatePresence>

            <AnimatePresence mode="wait">
              <motion.p
                key={(phase === 'result' && result ? result : display).name + phase}
                className="random-picker__name"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {(phase === 'result' && result ? result : display).name}
              </motion.p>
            </AnimatePresence>

            {phase === 'spinning' && (
              <motion.div
                className="random-picker__dots"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                กำลังสุ่ม...
              </motion.div>
            )}
          </motion.div>

          {phase === 'result' && result && (
            <motion.div
              className="random-picker__result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="random-picker__message">{message}</p>
              {toppings.length > 0 && (
                <p className="random-picker__toppings">
                  แถมท็อปปิ้ง: {toppings.map((t) => `${t.emoji}${t.name}`).join(' ')}
                </p>
              )}
              <p className="random-picker__price">{total} บาท</p>
            </motion.div>
          )}
        </div>

        <div className="random-picker__actions">
          {phase !== 'spinning' && (
            <motion.button
              type="button"
              className="random-picker__spin-btn"
              onClick={spin}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              initial={phase === 'result' ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
            >
              {phase === 'result' ? '🎲 สุ่มใหม่' : '🎲 สุ่มเลย!'}
            </motion.button>
          )}

          {phase === 'result' && result && (
            <motion.button
              type="button"
              className="random-picker__add-btn"
              onClick={() => onAddPick(result, toppings)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              🛒 เอาเมนูนี้!
            </motion.button>
          )}
        </div>

        {phase === 'result' && result && (
          <motion.p
            className="random-picker__category"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            หมวด {getCategory(result.categoryId)?.emoji}{' '}
            {getCategory(result.categoryId)?.name}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
