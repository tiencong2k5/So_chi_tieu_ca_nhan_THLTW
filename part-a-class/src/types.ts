export const categories = ['Ăn uống', 'Đi lại', 'Học tập', 'Giải trí'] as const

export type Category = (typeof categories)[number]

export type Expense = {
  id: number
  description: string
  amount: number
  category: Category
  date: string
}

export type NewExpense = Omit<Expense, 'id'>

export const today = () => {
  const date = new Date()
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount)
