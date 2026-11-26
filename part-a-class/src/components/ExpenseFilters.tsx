import { Component } from 'react'
import { categories, type Category } from '../types'

type Props = {
  selectedCategory: Category | 'Tất cả'
  onCategoryChange: (category: Category | 'Tất cả') => void
  onSearchChange: (value: string) => void
}

export default class ExpenseFilters extends Component<Props, { searchInput: string }> {
  private searchTimeout: number | undefined

  state = { searchInput: '' }

  componentWillUnmount() {
    if (this.searchTimeout !== undefined) window.clearTimeout(this.searchTimeout)
  }

  private handleSearchChange = (value: string) => {
    this.setState({ searchInput: value })
    if (this.searchTimeout !== undefined) window.clearTimeout(this.searchTimeout)
    this.searchTimeout = window.setTimeout(() => this.props.onSearchChange(value.trim()), 300)
  }

  render() {
    return (
      <>
        <label className="search-field">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Tìm khoản chi"
            placeholder="Tìm theo nội dung..."
            value={this.state.searchInput}
            onChange={(event) => this.handleSearchChange(event.target.value)}
          />
        </label>
        <div className="category-filters" aria-label="Lọc theo loại chi">
          {(['Tất cả', ...categories] as const).map((category) => (
            <button
              aria-pressed={this.props.selectedCategory === category}
              className={this.props.selectedCategory === category ? 'filter-chip active' : 'filter-chip'}
              key={category}
              onClick={() => this.props.onCategoryChange(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>
      </>
    )
  }
}
