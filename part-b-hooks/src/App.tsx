import { useEffect, useRef, useState } from 'react'
import AppHeader from './components/AppHeader'
import ExpenseFilters from './components/ExpenseFilters'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import WelcomeBanner from './components/WelcomeBanner'
import ThemeProvider from './context/ThemeProvider'
import useFetch from './hooks/useFetch'
import { formatMoney, type Category } from './types'
import './App.css'

function AppContent() {
  const { expenses, loading, error, addExpense, deleteExpense } = useFetch()
  const descriptionRef = useRef<HTMLInputElement>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Tất cả'>('Tất cả')
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setSearchTerm(searchInput.trim()), 300)
    return () => window.clearTimeout(timeoutId)
  }, [searchInput])

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  useEffect(() => {
    document.title = `Đã chi ${formatMoney(total)} | Sổ chi tiêu`
  }, [total])

  const filteredExpenses = expenses.filter((expense) => {
    const matchesCategory = selectedCategory === 'Tất cả' || expense.category === selectedCategory
    return matchesCategory && expense.description.toLocaleLowerCase('vi').includes(searchTerm.toLocaleLowerCase('vi'))
  })
  const visibleTotal = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <main className="app-shell">
      <AppHeader />
      <WelcomeBanner />
      <section className="dashboard">
        <ExpenseForm onAdd={addExpense} inputRef={descriptionRef} />
        <div className="ledger">
          <div className="ledger-heading">
            <div><span className="eyebrow">NHẬT KÝ CỦA BẠN</span><h2>Khoản chi gần đây</h2></div>
            <span className="expense-count">{loading ? 'Đang tải...' : `${filteredExpenses.length} khoản`}</span>
          </div>
          <ExpenseFilters
            selectedCategory={selectedCategory}
            searchInput={searchInput}
            onCategoryChange={setSelectedCategory}
            onSearchChange={setSearchInput}
          />
          {error && <div className="error-banner" role="alert">{error}</div>}
          {loading
            ? <div className="loading-state" role="status"><span className="spinner" /> Đang tải khoản chi...</div>
            : <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />}
          <div className="total-row"><span>Tổng chi đang hiển thị</span><strong>{formatMoney(visibleTotal)}</strong></div>
        </div>
      </section>
      <ExpenseSummary expenses={expenses} />
      <footer className="footer-note">Được ghi lại cẩn thận, để bạn sống thoải mái hơn. <span>✳</span></footer>
    </main>
  )
}

export default function App() {
  return <ThemeProvider><AppContent /></ThemeProvider>
}
