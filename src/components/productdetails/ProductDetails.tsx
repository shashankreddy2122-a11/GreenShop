import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import {
  Search,
  Minus,
  Plus,
  Heart,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  ArrowLeft,
} from 'lucide-react'
import { products, type Product } from '../pricing/product'

// Same container as Home.tsx and Footer.tsx
const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

const sizes = ['S', 'M', 'L', 'XL']

const shortDescription =
  'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground.'

const longText =
  'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam fringilla augue nec est tristique auctor. Donec non est at libero vulputate rutrum. Morbi ornare lectus quis justo gravida semper. Nulla tellus mi, vulputate adipiscing cursus eu, suscipit id nulla.'

const longText2 =
  'Pellentesque aliquet, sem eget laoreet ultrices, ipsum metus feugiat sem, quis fermentum turpis eros eget velit. Donec ac tempus ante. Fusce ultricies massa massa. Fusce aliquam, purus eget sagittis vulputate, sapien libero hendrerit est, sed commodo augue nisi non neque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tempor, lorem et placerat vestibulum, metus nisi posuere nisl, in accumsan elit odio quis mi. Cras neque metus, consequat et blandit et, luctus a nunc.'

const sections = [
  {
    title: 'Living Room:',
    text: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
  {
    title: 'Dining Room:',
    text: 'The benefits of houseplants are endless. In addition to cleaning the air of harmful toxins, they can help to improve your mood, reduce stress and provide you with better sleep. Fill every room of your home with houseplants and their restorative qualities will improve your life.',
  },
  {
    title: 'Office:',
    text: 'The ceramic cylinder planters come with a wooden stand to help elevate your plants off the ground. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  },
]

const reviews = [
  { name: 'Anna K.', rating: 5, text: 'Arrived well packed and healthy. It looks great on my desk.' },
  { name: 'Marcus T.', rating: 4, text: 'Lovely plant and easy to care for. The pot is a bit smaller than I expected.' },
  { name: 'Priya S.', rating: 5, text: 'Fast delivery and the leaves were fresh. Would buy again.' },
]

function Stars({ value }: { value: number }) {
  return (
    <span className="flex">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`h-4 w-4 ${
            n <= value ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </span>
  )
}

function ProductView({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState(0)
  const [size, setSize] = useState('S')
  const [qty, setQty] = useState(1)
  const [tab, setTab] = useState<'description' | 'reviews'>('description')
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const [relatedPage, setRelatedPage] = useState(0)

  const others = products.filter((p) => p.id !== product.id)
  const relatedPages = Math.max(1, Math.min(3, others.length - 4))
  const related = others.slice(relatedPage, relatedPage + 5)

  const thumbs = [0, 1, 2, 3] // swap for 4 different image paths when you have them
  const { addItem } = useCart()
const navigate = useNavigate()

const handleAdd = () => {
  addItem(product.id, qty)
  setAdded(true)
  setTimeout(() => setAdded(false), 1800)
}

const handleBuyNow = () => {
  addItem(product.id, qty)
  navigate('/cart')
}

  return (
    <main className={`${container} pb-8 pt-4`}>
      {/* ---------- Breadcrumb ---------- */}
      <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link to="/" className="flex items-center gap-1 font-semibold text-gray-900 hover:text-green-600">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>{' '}
        /{' '}
        <Link to="/shop" className="hover:text-green-600">
          Shop
        </Link>
      </nav>

      {/* ---------- Top: gallery + info ---------- */}
      <section className="mt-8 grid gap-10 lg:grid-cols-2 items-start">
        {/* Gallery */}
        <div className="flex gap-6">
          <div className="flex w-20 shrink-0 flex-col gap-4">
            {thumbs.map((t) => (
              <button
                key={t}
                onClick={() => setActiveImg(t)}
                aria-label={`Image ${t + 1}`}
                className={`flex aspect-square items-center justify-center bg-gray-50 text-3xl ${
                  activeImg === t ? 'border border-green-600' : 'border border-transparent'
                }`}
              >
                {product.image ? (
                  <img src={product.image} alt="" className="h-full w-full object-contain p-1" />
                ) : (
                  '🪴'
                )}
              </button>
            ))}
          </div>

          <div className="relative flex aspect-square flex-1 items-center justify-center bg-gray-50 text-[10rem]">
            <Search className="absolute right-4 top-4 h-5 w-5 text-gray-600" />
            {product.image ? (
              <img src={product.image} alt={product.name} className="h-full w-full object-contain p-6" />
            ) : (
              '🪴'
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-2xl font-bold text-green-600">${product.price}.00</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Stars value={4} />
              <span>19 Customer Review</span>
            </div>
          </div>

          <h3 className="mt-6 text-sm font-bold text-gray-900">Short Description:</h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">{shortDescription}</p>

          <h3 className="mt-6 text-sm font-bold text-gray-900">Size:</h3>
          <div className="mt-3 flex gap-3">
            {sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                aria-pressed={size === s}
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-sm transition-colors ${
                  size === s
                    ? 'border-green-600 font-bold text-green-600'
                    : 'border-gray-300 text-gray-600 hover:border-green-600'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Quantity + buttons */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3">
              <button
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-base text-gray-900">{qty}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

           <button
  onClick={handleBuyNow}
  className="rounded bg-green-600 px-7 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-green-700"
>
  BUY NOW
</button>
            <button
              onClick={handleAdd}
              className="rounded border border-green-600 px-8 py-3 text-sm font-semibold text-green-600 transition-colors hover:bg-green-50"
            >
              {added ? 'ADDED ✓' : 'ADD TO CART'}
            </button>
            <button
              aria-label="Add to wishlist"
              aria-pressed={liked}
              onClick={() => setLiked((l) => !l)}
              className="flex h-10 w-10 items-center justify-center rounded border border-green-600 text-green-600 hover:bg-green-50"
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-green-600' : ''}`} />
            </button>
          </div>

          {/* Meta */}
          <dl className="mt-6 space-y-2 text-sm text-gray-500">
            <div>
              <dt className="inline">SKU: </dt>
              <dd className="inline">{1995751877960 + product.id}</dd>
            </div>
            <div>
              <dt className="inline">Categories: </dt>
              <dd className="inline">{product.category}</dd>
            </div>
            <div>
              <dt className="inline">Tags: </dt>
              <dd className="inline">Home, Garden, Plants</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center gap-3 text-sm font-bold text-gray-900">
            Share this products:
            {[
              { name: 'Facebook', Icon: Facebook },
              { name: 'Twitter', Icon: Twitter },
              { name: 'LinkedIn', Icon: Linkedin },
              { name: 'Email', Icon: Mail },
            ].map(({ name, Icon }) => (
              <a
                key={name}
                href="#"
                aria-label={`Share on ${name}`}
                className="text-gray-700 transition-colors hover:text-green-600"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Tabs ---------- */}
      <section className="mt-16">
        <div className="flex gap-8 border-b border-gray-100 text-sm">
          <button
            onClick={() => setTab('description')}
            className={`border-b-2 pb-2 transition-colors hover:text-green-600 ${
              tab === 'description'
                ? 'border-green-600 font-bold text-green-600'
                : 'border-transparent text-gray-800'
            }`}
          >
            Product Description
          </button>
          <button
            onClick={() => setTab('reviews')}
            className={`border-b-2 pb-2 transition-colors hover:text-green-600 ${
              tab === 'reviews'
                ? 'border-green-600 font-bold text-green-600'
                : 'border-transparent text-gray-800'
            }`}
          >
            Reviews (19)
          </button>
        </div>

        {tab === 'description' ? (
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-gray-600">
            <p>{longText}</p>
            <p>{longText2}</p>
            {sections.map((s) => (
              <div key={s.title}>
                <h4 className="font-bold text-gray-900">{s.title}</h4>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-6 space-y-6">
            {reviews.map((r) => (
              <li key={r.name} className="text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{r.name}</span>
                  <Stars value={r.rating} />
                </div>
                <p className="mt-1">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* ---------- Related products ---------- */}
      <section className="mt-16">
        <h2 className="border-b border-gray-100 pb-3 text-sm font-bold text-green-600">
          Related Products
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
          {related.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="group block">
              <div className="flex aspect-square items-center justify-center bg-gray-50 text-7xl">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4" />
                ) : (
                  '🪴'
                )}
              </div>
              <h4 className="mt-4 text-sm text-gray-800 group-hover:text-green-600">{p.name}</h4>
              <p className="text-sm font-bold text-green-600">${p.price}.00</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: relatedPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Related products page ${i + 1}`}
              onClick={() => setRelatedPage(i)}
              className={`h-3 w-3 rounded-full border ${
                relatedPage === i ? 'border-green-600 bg-green-600' : 'border-green-600 bg-white'
              }`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default function ProductDetail() {
  const { id } = useParams()
  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return (
      <main className={`${container} py-24 text-center`}>
        <h1 className="text-3xl font-bold text-gray-900">We couldn't find that plant</h1>
        <p className="mt-3 text-base text-gray-500">It may have been removed or the link is wrong.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded bg-green-600 px-8 py-3 text-sm font-semibold text-white hover:bg-green-700"
        >
          Back to shop
        </Link>
      </main>
    )
  }

  // key resets the page state (size, quantity, tab) when you open another product
  return <ProductView key={product.id} product={product} />
}