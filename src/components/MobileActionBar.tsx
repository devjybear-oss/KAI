import { LINE_HREF, PHONE_HREF } from '../data/contact'

export function MobileActionBar() {
  return (
    <div className="mobile-bar" aria-label="ติดต่อด่วน">
      <a href={LINE_HREF} className="mobile-bar__btn mobile-bar__btn--line" target="_blank" rel="noreferrer">
        💬 LINE
      </a>
      <a href={PHONE_HREF} className="mobile-bar__btn mobile-bar__btn--phone">
        📞 โทร
      </a>
      <a href="#contact" className="mobile-bar__btn mobile-bar__btn--contact">
        ติดต่อ
      </a>
    </div>
  )
}
