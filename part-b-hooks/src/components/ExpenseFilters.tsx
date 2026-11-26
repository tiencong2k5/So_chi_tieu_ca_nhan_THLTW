import { categories, type Category } from '../types'

type Props = {
  selectedCategory: Category | 'Tất cả'
  searchInput: string
  onCategoryChange: (category: Category | 'Tất cả') => void
  onSearchChange: (value: string) => void
}

export default function ExpenseFilters({
  selectedCategory,
  searchInput,
  onCategoryChange,
  onSearchChange,
}: Props) {
  return (
    <>
      <label className="search-field">
        <span aria-hidden="true">⌕</span>
        <input
          aria-label="Tìm khoản chi"
          placeholder="Tìm theo nội dung..."
          value={searchInput}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </label>
      <div className="category-filters" aria-label="Lọc theo loại chi">
        {(['Tất cả', ...categories] as const).map((category) => (
          <button
            aria-pressed={selectedCategory === category}
            className={selectedCategory === category ? 'filter-chip active' : 'filter-chip'}
            key={category}
            onClick={() => onCategoryChange(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </div>
    </>
  )
}
