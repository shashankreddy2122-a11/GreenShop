import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Search, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react'
import { products } from '../pricing/product'

// Same container as Home.tsx, Footer.tsx and ProductDetail.tsx
const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

const categoryNames = [
  'House Plants',
  'Potter Plants',
  'Seeds',
  'Small Plants',
  'Big Plants',
  'Succulents',
  'Terrariums',
  'Gardening',
  'Accessories',
]

const tabs = [
  { key: 'all', label: 'All Plants' },
  { key: 'new', label: 'New Arrivals' },
  { key: 'sale', label: 'Sale' },
] as const

const sortOptions = [
  { value: 'default', label: 'Default sorting' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
]

const MIN = 39
const MAX = 1250
const PAGE_SIZE = 6

export default function Shop() {
  const [category, setCategory] = useState<string>('All')
  const [tab, setTab] = useState<'all' | 'new' | 'sale'>('all')
  const [sort, setSort] = useState('default')
  const [minPrice, setMinPrice] = useState(MIN)
  const [maxPrice, setMaxPrice] = useState(MAX)
  const [applied, setApplied] = useState({ min: MIN, max: MAX })
  const [page, setPage] = useState(1)

  const countFor = (name: string) => products.filter((p) => p.category === name).length

  const filtered = products
    .filter(
      (p) =>
        (category === 'All' || p.category === category) &&
        (tab === 'all' || p.tab === tab) &&
        p.price >= applied.min &&
        p.price <= applied.max
    )
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'name') return a.name.localeCompare(b.name)
      return a.id - b.id
    })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  const resetPage = () => setPage(1)

  return (
    <main className={`${container} pb-8 pt-4`}>
      {/* ---------- Breadcrumb ---------- */}
      <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link to="/" className="flex items-center gap-1 hover:text-green-600">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>{' '}
        / <span className="font-semibold text-gray-900">Shop</span>
      </nav>

      <div className="mt-8 flex flex-col gap-10 md:flex-row">
        {/* ---------- Sidebar ---------- */}
        <aside className="w-full shrink-0 bg-gray-50 p-6 md:w-64">
          <h3 className="text-lg font-bold text-gray-900">Categories</h3>
          <ul className="mt-3 space-y-3">
            <li>
              <button
                onClick={() => {
                  setCategory('All')
                  resetPage()
                }}
                className={`flex w-full justify-between text-sm transition-colors hover:text-green-600 ${
                  category === 'All' ? 'font-bold text-green-600' : 'text-gray-700'
                }`}
              >
                <span>All Plants</span>
                <span>({products.length})</span>
              </button>
            </li>
            {categoryNames.map((name) => (
              <li key={name}>
                <button
                  onClick={() => {
                    setCategory(name)
                    resetPage()
                  }}
                  className={`flex w-full justify-between text-sm transition-colors hover:text-green-600 ${
                    category === name ? 'font-bold text-green-600' : 'text-gray-700'
                  }`}
                >
                  <span>{name}</span>
                  <span>({countFor(name)})</span>
                </button>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-bold text-gray-900">Price Range</h3>
          <div className="relative mt-4 h-5">
            <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded bg-gray-200" />
            <div
              className="absolute top-1/2 h-1 -translate-y-1/2 rounded bg-green-600"
              style={{
                left: `${((minPrice - MIN) / (MAX - MIN)) * 100}%`,
                right: `${100 - ((maxPrice - MIN) / (MAX - MIN)) * 100}%`,
              }}
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={minPrice}
              onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 10))}
              className="pointer-events-none absolute w-full appearance-none bg-transparent accent-green-600 [&::-webkit-slider-thumb]:pointer-events-auto"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 10))}
              className="pointer-events-none absolute w-full appearance-none bg-transparent accent-green-600 [&::-webkit-slider-thumb]:pointer-events-auto"
              aria-label="Maximum price"
            />
          </div>
          <p className="mt-2 text-sm text-gray-700">
            Price:{' '}
            <span className="font-bold text-green-600">
              ${minPrice} – ${maxPrice}
            </span>
          </p>
          <button
            onClick={() => {
              setApplied({ min: minPrice, max: maxPrice })
              resetPage()
            }}
            className="mt-3 rounded bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Filter
          </button>

          {/* Super sale banner */}
          <div className="-mx-6 -mb-6 mt-8 bg-green-50 px-6 py-8 text-center">
            <img
              src="/assets/s.png"
              alt="Super sale"
              className="mx-auto max-w-full object-contain"
            />
          </div>
        </aside>

        {/* ---------- Products ---------- */}
        <section className="flex-1">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-3 text-sm">
            <div className="flex gap-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setTab(t.key)
                    resetPage()
                  }}
                  className={`border-b-2 pb-2 transition-colors hover:text-green-600 ${
                    tab === t.key
                      ? 'border-green-600 font-bold text-green-600'
                      : 'border-transparent text-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-2 text-gray-600">
              Sort by:
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value)
                  resetPage()
                }}
                className="bg-transparent text-gray-900 outline-none"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {visible.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-base text-gray-500">
                No plants match these filters. Try another category or a wider price range.
              </p>
              <button
                onClick={() => {
                  setCategory('All')
                  setTab('all')
                  setMinPrice(MIN)
                  setMaxPrice(MAX)
                  setApplied({ min: MIN, max: MAX })
                  resetPage()
                }}
                className="mt-4 rounded bg-green-600 px-6 py-2 text-sm font-semibold text-white hover:bg-green-700"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-3">
              {visible.map((p) => (
                // Clicking a card opens the product details page
                <Link key={p.id} to={`/shop/${p.id}`} className="group block">
                  <div className="relative flex aspect-square items-center justify-center bg-gray-50">
                    {p.discount && (
                      <span className="absolute left-0 top-3 bg-green-600 px-3 py-1 text-xs font-semibold text-white">
                        {p.discount}
                      </span>
                    )}
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4" />
                    ) : (
                      <span className="text-8xl">🪴</span>
                    )}

                    {/* Hover actions (stay on the page when clicked) */}
                    <div className="absolute bottom-3 flex gap-4 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        aria-label="Add to cart"
                        onClick={(e) => e.preventDefault()}
                        className="hover:text-green-600"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                      <button
                        aria-label="Add to wishlist"
                        onClick={(e) => e.preventDefault()}
                        className="hover:text-green-600"
                      >
                        <Heart className="h-5 w-5" />
                      </button>
                      <button
                        aria-label="Quick view"
                        onClick={(e) => e.preventDefault()}
                        className="hover:text-green-600"
                      >
                        <Search className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <h4 className="mt-4 text-sm text-gray-800 group-hover:text-green-600">{p.name}</h4>
                  <p className="text-sm font-bold text-green-600">
                    ${p.price}.00
                    {p.oldPrice && (
                      <span className="ml-3 font-normal text-gray-400 line-through">
                        ${p.oldPrice}.00
                      </span>
                    )}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* ---------- Pagination ---------- */}
          {totalPages > 1 && (
            <nav className="mt-16 flex justify-end gap-3" aria-label="Pagination">
              <button
                aria-label="Previous page"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600 disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-9 w-9 rounded border text-sm transition-colors ${
                    currentPage === n
                      ? 'border-green-600 bg-green-600 font-bold text-white'
                      : 'border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                aria-label="Next page"
                disabled={currentPage === totalPages}
                onClick={() => setPage(currentPage + 1)}
                className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600 disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:text-gray-700"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </nav>
          )}
        </section>
      </div>
    </main>
  )
}