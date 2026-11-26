import { useState, type FormEvent, type RefObject } from 'react'
import { categories, today, type Category, type NewExpense } from '../types'

type Props = {
  onAdd: (expense: NewExpense) => Promise<boolean>
  inputRef: RefObject<HTMLInputElement | null>
}

export default function ExpenseForm({ onAdd, inputRef }: Props) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>(categories[0])
  const [date, setDate] = useState(today())
  const [validationError, setValidationError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmedDescription = description.trim()
    const numericAmount = Number(amount)
    if (!trimmedDescription || !Number.isFinite(numericAmount) || numericAmount <= 0 || !date) {
      setValidationError('Vui lòng nhập nội dung, số tiền hợp lệ và ngày chi.')
      return
    }

    setValidationError('')
    setSubmitting(true)
    const saved = await onAdd({ description: trimmedDescription, amount: numericAmount, category, date })
    setSubmitting(false)
    if (saved) {
      setDescription('')
      setAmount('')
      setCategory(categories[0])
      setDate(today())
      inputRef.current?.focus()
    }
  }

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div><span className="eyebrow">GHI CHÉP MỚI</span><h2>Thêm khoản chi</h2></div>
        <span className="form-icon" aria-hidden="true">＋</span>
      </div>
      <label>
        Nội dung
        <input
          ref={inputRef}
          required
          maxLength={100}
          placeholder="Ví dụ: Cà phê sáng"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <div className="form-row">
        <label>
          Số tiền (₫)
          <input
            required
            min="1"
            step="1"
            type="number"
            placeholder="50000"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <label>
          Loại chi
          <select value={category} onChange={(event) => setCategory(event.target.value as Category)}>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <label>
        Ngày chi
        <input required type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      </label>
      {validationError && <p className="form-error" role="alert">{validationError}</p>}
      <button className="primary-button" disabled={submitting} type="submit">
        {submitting ? 'Đang lưu...' : '＋ Thêm khoản chi'}
      </button>
    </form>
  )
}
