import { Component } from 'react'
import { categories, formatMoney, type Expense } from '../types'

type Props = { expenses: Expense[] }

export default class ExpenseSummary extends Component<Props> {
  render() {
    return (
      <section className="category-summary">
        <div className="summary-intro"><span className="eyebrow">NHÌN LẠI MỘT CHÚT</span><h2>Chi tiêu theo loại</h2></div>
        {categories.map((category, index) => {
          const amount = this.props.expenses
            .filter((expense) => expense.category === category)
            .reduce((sum, expense) => sum + expense.amount, 0)
          return (
            <div className="summary-item" key={category}>
              <span className={`summary-dot summary-dot-${index}`} />
              <span>{category}</span>
              <strong>{formatMoney(amount)}</strong>
            </div>
          )
        })}
      </section>
    )
  }
}
