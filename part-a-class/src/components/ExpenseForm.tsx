import { Component, type FormEvent } from 'react'
import { categories, today, type Category, type NewExpense } from '../types'

type Props = { onAdd: (expense: NewExpense) => void }
type State = {
  description: string
  amount: string
  category: Category
  date: string
  error: string
}

export default class ExpenseForm extends Component<Props, State> {
  state: State = {
    description: '',
    amount: '',
    category: categories[0],
    date: today(),
    error: '',
  }

  private handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const description = this.state.description.trim()
    const amount = Number(this.state.amount)
    if (!description || !Number.isFinite(amount) || amount <= 0 || !this.state.date) {
      this.setState({ error: 'Vui lòng nhập nội dung, số tiền hợp lệ và ngày chi.' })
      return
    }

    this.props.onAdd({ description, amount, category: this.state.category, date: this.state.date })
    this.setState({
      description: '',
      amount: '',
      category: categories[0],
      date: today(),
      error: '',
    })
  }

  render() {
    return (
      <form className="expense-form" onSubmit={this.handleSubmit}>
        <div className="form-heading">
          <div><span className="eyebrow">GHI CHÉP MỚI</span><h2>Thêm khoản chi</h2></div>
          <span className="form-icon" aria-hidden="true">＋</span>
        </div>
        <label>
          Nội dung
          <input
            required
            maxLength={100}
            placeholder="Ví dụ: Cà phê sáng"
            value={this.state.description}
            onChange={(event) => this.setState({ description: event.target.value })}
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
              value={this.state.amount}
              onChange={(event) => this.setState({ amount: event.target.value })}
            />
          </label>
          <label>
            Loại chi
            <select
              value={this.state.category}
              onChange={(event) => this.setState({ category: event.target.value as Category })}
            >
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
        </div>
        <label>
          Ngày chi
          <input
            required
            type="date"
            value={this.state.date}
            onChange={(event) => this.setState({ date: event.target.value })}
          />
        </label>
        {this.state.error && <p className="form-error" role="alert">{this.state.error}</p>}
        <button className="primary-button" type="submit">＋ Thêm khoản chi</button>
      </form>
    )
  }
}
