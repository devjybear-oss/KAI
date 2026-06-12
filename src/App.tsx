import { useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PopularProductsSection } from './components/PopularProductsSection'
import { PlanFinderSection } from './components/PlanFinderSection'
import { PlansSection } from './components/PlansSection'
import { AdvisorSection } from './components/AdvisorSection'
import { PlanningStepsSection } from './components/PlanningStepsSection'
import { FaqSection } from './components/FaqSection'
import { ContactSection } from './components/ContactSection'
import { MobileActionBar } from './components/MobileActionBar'
import './index.css'

function App() {
  const [plansCategory, setPlansCategory] = useState('health')

  const handleQuizRecommend = (categoryId: string) => {
    setPlansCategory(categoryId)
    requestAnimationFrame(() => {
      document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <PopularProductsSection />
        <PlanFinderSection onRecommend={handleQuizRecommend} />
        <PlansSection activeCategory={plansCategory} onCategoryChange={setPlansCategory} />
        <AdvisorSection />
        <PlanningStepsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <footer className="footer">
        <p>
          © 2026 AIA — ประกันชีวิต · สุขภาพ · อุบัติเหตุ · ลงทุน ปกป้องทุกช่วงชีวิต 🛡️
        </p>
        <p>
          <a href="#contact" className="footer__link">
            ติดต่อเรา
          </a>
        </p>
        <p className="footer__disclaimer">
          เว็บไซต์นี้จัดทำเพื่อการสาธิต ไม่ใช่เว็บไซต์อย่างเป็นทางการของ AIA
        </p>
      </footer>
      <MobileActionBar />
    </div>
  )
}

export default App
