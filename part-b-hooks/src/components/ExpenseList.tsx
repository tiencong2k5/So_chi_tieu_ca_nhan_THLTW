import { categories, formatMoney, type Expense } from '../types'

type Props = { expenses: Expense[]; onDelete: (id: string) => Promise<void> }

export default function ExpenseList({ expenses, onDelete }: Props) {
  if (expenses.length === 0) {
    return <div className="empty-state"><span aria-hidden="true">✦</span><p>Chưa có khoản chi phù hợp.</p></div>
  }

  return (
    <ul className="expense-list">
      {expenses.map((expense) => {
        const categoryIndex = categories.indexOf(expense.category)
        return (
          <li className="expense-item" key={expense.id}>
            <span className={`category-mark category-${categoryIndex}`} aria-hidden="true">
              {['☕', '↗', '▤', '♫'][categoryIndex]}
            </span>
            <div className="expense-description">
              <strong>{expense.description}</strong>
              <span>{expense.category} <span className="dot">·</span> {new Date(`${expense.date}T00:00:00`).toLocaleDateString('vi-VN')}</span>
            </div>
            <strong className="expense-amount">−{formatMoney(expense.amount)}</strong>
            <button
              aria-label={`Xóa khoản chi ${expense.description}`}
              className="delete-button"
              onClick={() => {
                if (window.confirm(`Bạn có chắc muốn xóa khoản chi "${expense.description}"?`)) {
                  void onDelete(expense.id)
                }
              }}
              type="button"
            >
              Xóa
            </button>
          </li>
        )
      })}
    </ul>
  )
}
