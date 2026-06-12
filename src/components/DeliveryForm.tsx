import { motion } from 'framer-motion'
import type { DeliveryAddress } from '../types/order'

type Props = {
  value: DeliveryAddress
  onChange: (value: DeliveryAddress) => void
  errors: Partial<Record<keyof DeliveryAddress, string>>
}

export function DeliveryForm({ value, onChange, errors }: Props) {
  const update = (field: keyof DeliveryAddress, text: string) => {
    onChange({ ...value, [field]: text })
  }

  return (
    <motion.div
      className="delivery-form"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <h3>📍 ที่อยู่จัดส่ง</h3>

      <label className="delivery-form__field">
        <span>ชื่อผู้รับ</span>
        <input
          type="text"
          placeholder="เช่น คุณสมชาย"
          value={value.name}
          onChange={(e) => update('name', e.target.value)}
          className={errors.name ? 'delivery-form__input--error' : ''}
        />
        {errors.name && <em>{errors.name}</em>}
      </label>

      <label className="delivery-form__field">
        <span>เบอร์โทร</span>
        <input
          type="tel"
          placeholder="08x-xxx-xxxx"
          value={value.phone}
          onChange={(e) => update('phone', e.target.value)}
          className={errors.phone ? 'delivery-form__input--error' : ''}
        />
        {errors.phone && <em>{errors.phone}</em>}
      </label>

      <label className="delivery-form__field">
        <span>ที่อยู่</span>
        <textarea
          rows={3}
          placeholder="บ้านเลขที่ ซอย ถนน แขวง/ตำบล เขต/อำเภอ จังหวัด รหัสไปรษณีย์"
          value={value.address}
          onChange={(e) => update('address', e.target.value)}
          className={errors.address ? 'delivery-form__input--error' : ''}
        />
        {errors.address && <em>{errors.address}</em>}
      </label>

      <label className="delivery-form__field">
        <span>หมายเหตุ (ไม่บังคับ)</span>
        <input
          type="text"
          placeholder="เช่น ปล่อยไว้หน้าประตู"
          value={value.note}
          onChange={(e) => update('note', e.target.value)}
        />
      </label>
    </motion.div>
  )
}
