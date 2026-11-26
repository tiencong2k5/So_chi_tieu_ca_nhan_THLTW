import { useCallback, useEffect, useState } from 'react'
import type { Expense, NewExpense } from '../types'

const API_URL = import.meta.env.VITE_MOCKAPI_URL?.trim().replace(/\/+$/, '') || '/api/expenses'

export default function useFetch() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadExpenses = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if (!response.ok) throw new Error(`Không thể tải dữ liệu (HTTP ${response.status}).`)
      const data: unknown = await response.json()
      if (!Array.isArray(data)) throw new Error('Dữ liệu MockAPI không đúng định dạng danh sách.')
      setExpenses(data.map((item: Expense) => ({ ...item, amount: Number(item.amount) })))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Đã xảy ra lỗi khi tải dữ liệu.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadExpenses()
    }, 0)
    return () => window.clearTimeout(timeoutId)
  }, [loadExpenses])

  const addExpense = async (expense: NewExpense) => {
    setError(null)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expense),
      })
      if (!response.ok) throw new Error(`Không thể thêm khoản chi (HTTP ${response.status}).`)
      const created: Expense = await response.json()
      setExpenses((current) => [{ ...created, amount: Number(created.amount) }, ...current])
      return true
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Đã xảy ra lỗi khi thêm khoản chi.')
      return false
    }
  }

  const deleteExpense = async (id: string) => {
    setError(null)
    try {
      const response = await fetch(`${API_URL}/${encodeURIComponent(id)}`, { method: 'DELETE' })
      if (!response.ok) throw new Error(`Không thể xóa khoản chi (HTTP ${response.status}).`)
      setExpenses((current) => current.filter((expense) => expense.id !== id))
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Đã xảy ra lỗi khi xóa khoản chi.')
    }
  }

  return { expenses, loading, error, addExpense, deleteExpense }
}
