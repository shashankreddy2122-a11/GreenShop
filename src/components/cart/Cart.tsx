import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { products } from '../pricing/product'
import { useCart } from './CartContext'
import { COUPONS, SHIPPING, money } from '../pricing/pricing'

// Same container as the other pages
const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

export default function Cart() {
  const { items, setQty, removeItem } = useCart()
  const [code, setCode] = useState('')
  const [discountRate, setDiscountRate] = useState(0)
  const [couponMessage, setCouponMessage] = useState('')
  const [relatedPage, setRelatedPage] = useState(0)

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
    .filter((l): l is typeof l & { product: NonNullable<typeof l.product> } => !!l.product)

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const discount = subtotal * discountRate
  const shipping = lines.length ? SHIPPING : 0
  const total = subtotal - discount + shipping

  const applyCoupon = () => {
    const rate = COUPONS[code.trim().toUpperCase()]
    if (rate) {
      setDiscountRate(rate)
      setCouponMessage(`Coupon applied: ${rate * 100}% off`)
    } else {
      setDiscountRate(0)
      setCouponMessage("That code isn't valid. Check it and try again.")
    }
  }

  // "You may be interested in": plants that are not in the cart yet
  const inCart = new Set(lines.map((l) => l.id))
  const suggestions = products.filter((p) => !inCart.has(p.id))
  const pool = suggestions.length >= 5 ? suggestions : products
  const relatedPages = Math.max(1, Math.min(3, pool.length - 4))
  const related = pool.slice(relatedPage, relatedPage + 5)

  return (
    <main className={`${container} pb-8 pt-4`}>
      {/* ---------- Breadcrumb ---------- */}
      <nav className="flex items-center gap-2 text-sm text-gray-600" aria-label="Breadcrumb">
        <Link to="/" className="flex items-center gap-1 hover:text-green-600">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>{' '}
        / <span className="font-semibold text-gray-900">Shopping Cart</span>
      </nav>

      {lines.length === 0 ? (
        <section className="py-20 text-center">
          <h1 className="text-xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-gray-500">Add a plant to see it here.</p>
          <Link
            to="/shop"
            className="mt-6 inline-block rounded bg-green-600 px-6 py-2 text-xs font-semibold text-white hover:bg-green-700"
          >
            Browse plants
          </Link>
        </section>
      ) : (
        <div className="mt-8 flex flex-col gap-10 md:flex-row">
          {/* ---------- Cart items ---------- */}
          <section className="flex-1">
            <div className="overflow-x-auto">
              <div className="min-w-[34rem]">
                <div className="grid grid-cols-[2.4fr_1fr_1.2fr_1fr_2rem] border-b border-gray-100 pb-2 text-xs font-bold text-gray-900">
                  <span>Products</span>
                  <span>Price</span>
                  <span>Quantity</span>
                  <span>Total</span>
                  <span />
                </div>

                <ul className="mt-3 space-y-2">
                  {lines.map(({ product, qty }) => (
                    <li
                      key={product.id}
                      className="grid grid-cols-[2.4fr_1fr_1.2fr_1fr_2rem] items-center bg-gray-50 px-2 py-2 text-xs text-gray-700"
                    >
                      <Link to={`/shop/${product.id}`} className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-xl">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt=""
                              className="h-full w-full object-contain"
                            />
                          ) : (
                            '🪴'
                          )}
                        </span>
                        <span>
                          <span className="block font-bold text-gray-900">{product.name}</span>
                          <span className="block text-[10px] text-gray-400">
                            SKU: {1995751877960 + product.id}
                          </span>
                        </span>
                      </Link>

                      <span>{money(product.price)}</span>

                      <span className="flex items-center gap-2">
                        <button
                          aria-label={`Decrease quantity of ${product.name}`}
                          onClick={() => setQty(product.id, qty - 1)}
                          disabled={qty <= 1}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="w-4 text-center text-gray-900">{qty}</span>
                        <button
                          aria-label={`Increase quantity of ${product.name}`}
                          onClick={() => setQty(product.id, qty + 1)}
                          className="flex h-4 w-4 items-center justify-center rounded-full bg-green-600 text-white hover:bg-green-700"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </span>

                      <span className="font-bold text-green-600">{money(product.price * qty)}</span>

                      <button
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => removeItem(product.id)}
                        className="text-gray-400 transition-colors hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ---------- Sidebar with cart totals ---------- */}
          <aside className="w-full shrink-0 bg-gray-50 p-6 md:w-64">
            <h2 className="text-lg font-bold text-gray-900">Cart Totals</h2>

            <p className="mt-3 text-sm text-gray-600">Coupon Apply</p>
            <div className="mt-1 flex">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter coupon code here..."
                aria-label="Coupon code"
                className="min-w-0 flex-1 border border-green-600 px-2 py-2 text-sm text-gray-700 outline-none"
              />
              <button
                onClick={applyCoupon}
                className="bg-green-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                Apply
              </button>
            </div>
            {couponMessage && (
              <p
                className={`mt-2 text-sm ${
                  discountRate ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {couponMessage}
              </p>
            )}

            <dl className="mt-5 space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd className="font-bold text-gray-900">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Coupon Discount</dt>
                <dd>(-) {discount.toFixed(2)}</dd>
              </div>
              <div>
                <div className="flex justify-between">
                  <dt>Shipping</dt>
                  <dd className="font-bold text-gray-900">{money(shipping)}</dd>
                </div>
                <a
                  href="#"
                  className="mt-1 block text-right text-xs text-green-600 hover:underline"
                >
                  View shipping charge
                </a>
              </div>
              <div className="flex justify-between pt-2 text-base font-bold text-gray-900">
                <dt>Total</dt>
                <dd className="text-green-600">{money(total)}</dd>
              </div>
            </dl>

            <Link
  to="/checkout"
  state={{ discountRate }}
  className="mt-5 block w-full rounded bg-green-600 py-2.5 text-center text-[11px] font-semibold text-white transition-colors hover:bg-green-700"
>
  Proceed To Checkout
</Link>
            <Link
              to="/shop"
              className="mt-3 block text-center text-sm text-green-600 hover:underline"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}

      {/* ---------- You may be interested in ---------- */}
      <section className="mt-16">
        <h2 className="border-b border-gray-100 pb-2 text-xs font-bold text-green-600">
          You may be interested in
        </h2>

        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {related.map((p) => (
            <Link key={p.id} to={`/shop/${p.id}`} className="group block">
              <div className="flex aspect-square items-center justify-center bg-gray-50 text-6xl">
                {p.image ? (
                  <img src={p.image} alt={p.name} className="h-full w-full object-contain p-4" />
                ) : (
                  '🪴'
                )}
              </div>
              <h4 className="mt-3 text-xs text-gray-800 group-hover:text-green-600">{p.name}</h4>
              <p className="text-xs font-bold text-green-600">${p.price}.00</p>
            </Link>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-1.5">
          {Array.from({ length: relatedPages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Suggestions page ${i + 1}`}
              onClick={() => setRelatedPage(i)}
              className={`h-2 w-2 rounded-full border border-green-600 ${
                relatedPage === i ? 'bg-green-600' : 'bg-white'
              }`}
            />
          ))}
        </div>
      </section>
    </main>
  )
}