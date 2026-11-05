import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart, Search, ChevronDown, ChevronRight } from 'lucide-react'
import PromoAndBlog from './PromoAndBlog'

type Product = {
  id: number
  name: string
  price: number
  oldPrice?: number
  discount?: string
  image: string // e.g. '/images/barberton-daisy.png'
  tab: 'new' | 'sale' | 'all'
}

const categories = [
  { name: 'House Plants', count: 33 },
  { name: 'Potter Plants', count: 12 },
  { name: 'Seeds', count: 65 },
  { name: 'Small Plants', count: 39 },
  { name: 'Big Plants', count: 23 },
  { name: 'Succulents', count: 17 },
  { name: 'Terrariums', count: 19 },
  { name: 'Gardening', count: 13 },
  { name: 'Accessories', count: 18 },
]

const sizes = [
  { name: 'Small', count: 119 },
  { name: 'Medium', count: 86 },
  { name: 'Large', count: 78 },
]

const products: Product[] = [
  { id: 1, name: 'Barberton Daisy', price: 119, image: '/assets/p1.png', tab: 'new' },
  { id: 2, name: 'Angel Wing Begonia', price: 169, image: '/assets/p2.png', tab: 'new' },
  { id: 3, name: 'African Violet', price: 199, oldPrice: 229, discount: '13% OFF', image: '/assets/p3.png', tab: 'sale' },
  { id: 4, name: 'Beach Spider Lily', price: 129, image: '/assets/h1.png', tab: 'all' },
  { id: 5, name: 'Blushing Bromeliad', price: 139, image: '/assets/p5.png', tab: 'all' },
  { id: 6, name: 'Aluminum Plant', price: 179, image: '/assets/p6.png', tab: 'new' },
  { id: 7, name: "Bird's Nest Fern", price: 99, image: '/assets/p7.png', tab: 'all' },
  { id: 8, name: 'Broadleaf Lady Palm', price: 59, image: '/assets/p8.png', tab: 'sale' },
  { id: 9, name: 'Chinese Evergreen', price: 39, image: '/assets/p9.png', tab: 'all' },
]

const tabs = [
  { key: 'all', label: 'All Plants' },
  { key: 'new', label: 'New Arrivals' },
  { key: 'sale', label: 'Sale' },
] as const

const MIN = 39
const MAX = 1250

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('House Plants')
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'sale'>('all')
  const [minPrice, setMinPrice] = useState(MIN)
  const [maxPrice, setMaxPrice] = useState(MAX)
  const [applied, setApplied] = useState({ min: MIN, max: MAX })
  const [page, setPage] = useState(1)
  const [slide, setSlide] = useState(0)

  const visible = products.filter(
    (p) =>
      (activeTab === 'all' || p.tab === activeTab) &&
      p.price >= applied.min &&
      p.price <= applied.max
  )

  return (
    <main className="container mx-auto px-8 pb-16 sm:px-16 lg:px-24 xl:px-32">
      {/* ---------- Hero ---------- */}
      <section className="relative mt-4 flex items-center justify-between overflow-hidden bg-gray-50 py-16">
        <div className="max-w-md">
          <p className="text-sm font-medium tracking-wide text-gray-700">WELCOME TO GREENSHOP</p>
          <h1 className="mt-2 text-5xl font-black leading-tight text-gray-800 md:text-6xl lg:text-7xl">
            LET'S MAKE A BETTER <span className="text-green-600">PLANET</span>
          </h1>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-gray-500">
            We are an online plant shop offering a wide range of cheap and trendy plants. Use our
            plants to create an unique Urban Jungle. Order your favorite plants!
          </p>
          <button className="mt-5 rounded bg-green-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700">
            SHOP NOW
          </button>
        </div>

        {/* Hero image - replace with your plant image */}
        <div className="hidden h-72 w-96 md:flex">
          <img
            src="/assets/h1.png"
            alt="Hero plant image"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
          {[0, 1, 2].map((i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 w-1.5 rounded-full ${slide === i ? 'bg-green-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>
      </section>

      {/* ---------- Sidebar + Products ---------- */}
      <div className="mt-8 flex flex-col gap-8 md:flex-row">
        {/* Sidebar */}
        <aside className="w-full shrink-0 bg-gray-50 p-6 md:w-64">
          <h3 className="text-lg font-bold text-gray-900">Categories</h3>
          <ul className="mt-3 space-y-3">
            {categories.map((c) => (
              <li key={c.name}>
                <button
                  onClick={() => setActiveCategory(c.name)}
                  className={`flex w-full justify-between text-sm transition-colors hover:text-green-600 ${
                    activeCategory === c.name ? 'font-bold text-green-600' : 'text-gray-700'
                  }`}
                >
                  <span>{c.name}</span>
                  <span>({c.count})</span>
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
              setPage(1)
            }}
            className="mt-3 rounded bg-green-600 px-6 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
          >
            Filter
          </button>

          <h3 className="mt-8 text-lg font-bold text-gray-900">Size</h3>
          <ul className="mt-3 space-y-3">
            {sizes.map((s) => (
              <li key={s.name} className="flex justify-between text-sm text-gray-700">
                <span>{s.name}</span>
                <span>({s.count})</span>
              </li>
            ))}
          </ul>

          {/* Super sale banner */}
          <div className="-mx-6 -mb-6 mt-8 bg-green-50 px-6 py-8 text-center">
            <img
              src="/assets/s.png"
              alt="Super sale"
              className="mx-auto max-w-full object-contain"
            />
          </div>
        </aside>

        {/* Products */}
        <section className="flex-1">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3 text-sm">
            <div className="flex gap-6">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setActiveTab(t.key)
                    setPage(1)
                  }}
                  className={`border-b-2 pb-2 transition-colors hover:text-green-600 ${
                    activeTab === t.key
                      ? 'border-green-600 font-bold text-green-600'
                      : 'border-transparent text-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1 text-gray-600">
              Sort by: <span className="text-gray-900">Default sorting</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center text-gray-500">
              No plants match these filters. Try widening the price range.
            </p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-8 lg:grid-cols-3">
             {visible.map((p) => (
  <Link key={p.id} to={`/shop/${p.id}`} className="group block">
    <div className="relative flex aspect-square items-center justify-center bg-gray-50">
      {p.discount && (
        <span className="absolute left-0 top-3 bg-green-600 px-2 py-0.5 text-[10px] font-semibold text-white">
          {p.discount}
        </span>
      )}
      {p.image ? (
        <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4" />
      ) : (
        <span className="text-7xl">🪴</span>
      )}

      {/* Hover actions (stay on the page when clicked) */}
      <div className="absolute bottom-2 flex gap-3 text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          aria-label="Add to cart"
          onClick={(e) => e.preventDefault()}
          className="hover:text-green-600"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
        <button
          aria-label="Add to wishlist"
          onClick={(e) => e.preventDefault()}
          className="hover:text-green-600"
        >
          <Heart className="h-4 w-4" />
        </button>
        <button
          aria-label="Quick view"
          onClick={(e) => e.preventDefault()}
          className="hover:text-green-600"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
    <h4 className="mt-3 text-xs text-gray-800">{p.name}</h4>
    <p className="text-xs font-bold text-green-600">
      ${p.price}.00
      {p.oldPrice && (
        <span className="ml-3 font-normal text-gray-400 line-through">${p.oldPrice}.00</span>
      )}
    </p>
  </Link>
))}
            </div>
          )}

          {/* Pagination */}
          <nav className="mt-16 flex justify-end gap-3" aria-label="Pagination">
            {[1, 2, 3, 4].map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`h-9 w-9 rounded border text-sm transition-colors ${
                  page === n
                    ? 'border-green-600 bg-green-600 font-bold text-white'
                    : 'border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(p + 1, 4))}
              className="flex h-9 w-9 items-center justify-center rounded border border-gray-200 text-gray-700 hover:border-green-600 hover:text-green-600"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </section>
      </div>
      <PromoAndBlog />
    </main>
  )
}