import { Component } from 'react'
import AppHeader from './components/AppHeader'
import ExpenseFilters from './components/ExpenseFilters'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import WelcomeBanner from './components/WelcomeBanner'
import { formatMoney, today, type Category, type Expense, type NewExpense } from './types'
import './App.css'

type AppState = {
  expenses: Expense[]
  selectedCategory: Category | 'Tất cả'
  searchTerm: string
}

const sampleExpenses: Expense[] = [
  { id: 1, description: 'Bữa trưa văn phòng', amount: 65000, category: 'Ăn uống', date: today() },
  { id: 2, description: 'Vé xe buýt tháng', amount: 200000, category: 'Đi lại', date: today() },
  { id: 3, description: 'Sách thiết kế', amount: 145000, category: 'Học tập', date: today() },
  { id: 4, description: 'Vé xem phim', amount: 90000, category: 'Giải trí', date: today() },
]

export default class App extends Component<Record<string, never>, AppState> {
  private nextId = sampleExpenses.length + 1

  state: AppState = {
    expenses: sampleExpenses,
    selectedCategory: 'Tất cả',
    searchTerm: '',
  }

  componentDidMount() {
    this.updateDocumentTitle()
  }

  componentDidUpdate() {
    this.updateDocumentTitle()
  }

  private updateDocumentTitle = () => {
    const total = this.state.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    document.title = `Đã chi ${formatMoney(total)} | Sổ chi tiêu`
  }

  private addExpense = (expense: NewExpense) => {
    this.setState((state) => ({
      expenses: [{ ...expense, id: this.nextId++ }, ...state.expenses],
    }))
  }

  private deleteExpense = (id: number) => {
    this.setState((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    }))
  }

  private setCategory = (selectedCategory: Category | 'Tất cả') => {
    this.setState({ selectedCategory })
  }

  private setSearchTerm = (searchTerm: string) => {
    this.setState({ searchTerm })
  }

  render() {
    const filteredExpenses = this.state.expenses.filter((expense) => {
      const matchesCategory =
        this.state.selectedCategory === 'Tất cả' || expense.category === this.state.selectedCategory
      return matchesCategory && expense.description.toLocaleLowerCase('vi').includes(this.state.searchTerm.toLocaleLowerCase('vi'))
    })
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

    return (
      <main className="app-shell">
        <AppHeader />
        <WelcomeBanner />
        <section className="dashboard">
          <ExpenseForm onAdd={this.addExpense} />
          <div className="ledger">
            <div className="ledger-heading">
              <div><span className="eyebrow">NHẬT KÝ CỦA BẠN</span><h2>Khoản chi gần đây</h2></div>
              <span className="expense-count">{filteredExpenses.length} khoản</span>
            </div>
            <ExpenseFilters
              selectedCategory={this.state.selectedCategory}
              onCategoryChange={this.setCategory}
              onSearchChange={this.setSearchTerm}
            />
            <ExpenseList expenses={filteredExpenses} onDelete={this.deleteExpense} />
            <div className="total-row"><span>Tổng chi đang hiển thị</span><strong>{formatMoney(total)}</strong></div>
          </div>
        </section>
        <ExpenseSummary expenses={this.state.expenses} />
        <footer className="footer-note">Được ghi lại cẩn thận, để bạn sống thoải mái hơn. <span>✳</span></footer>
      </main>
    )
  }
}
