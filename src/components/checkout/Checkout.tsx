import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { products } from '../pricing/product'
import { useCart } from '../cart/CartContext'
import { COUPONS, SHIPPING, money } from '../pricing/pricing'
import OrderPopup, { type PlacedOrder } from './OrderPopup'
import type { Product } from '../pricing/product'

// Same container as the other pages
const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

const STATES: Record<string, string[]> = {
  'United States': ['California', 'Florida', 'New York', 'Texas', 'Washington'],
  India: ['Delhi', 'Karnataka', 'Kerala', 'Maharashtra', 'Tamil Nadu'],
  'Saudi Arabia': ['Eastern Province', 'Makkah', 'Riyadh'],
  'United Kingdom': ['England', 'Northern Ireland', 'Scotland', 'Wales'],
  Canada: ['Alberta', 'British Columbia', 'Ontario', 'Quebec'],
  Australia: ['New South Wales', 'Queensland', 'Victoria', 'Western Australia'],
}
const COUNTRIES = Object.keys(STATES)
const PHONE_CODES = ['+966', '+1', '+44', '+61', '+88', '+91']


type FormState = {
  firstName: string
  lastName: string
  country: string
  city: string
  street: string
  street2: string
  state: string
  zip: string
  email: string
  phoneCode: string
  phone: string
  notes: string
  sFirstName: string
  sLastName: string
  sStreet: string
  sCity: string
  sZip: string
}

const emptyForm: FormState = {
  firstName: '',
  lastName: '',
  country: '',
  city: '',
  street: '',
  street2: '',
  state: '',
  zip: '',
  email: '',
  phoneCode: '+966',
  phone: '',
  notes: '',
  sFirstName: '',
  sLastName: '',
  sStreet: '',
  sCity: '',
  sZip: '',
}

const inputClass =
  'w-full border border-gray-200 bg-white px-3 py-2.5 text-[11px] text-gray-700 outline-none focus:border-green-600 aria-[invalid=true]:border-red-500 disabled:bg-gray-50 disabled:text-gray-400'

function Field({
  id,
  label,
  required,
  error,
  className = '',
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-[11px] text-gray-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-[10px] text-red-500">
          {error}
        </p>
      )}
    </div>
  )
}

function SelectBox({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${inputClass} appearance-none pr-8`}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" />
    </div>
  )
}

const paymentOptions = [
  { value: 'paypal', label: 'PayPal / cards' },
  { value: 'bank', label: 'Direct bank transfer' },
  { value: 'cod', label: 'Cash on delivery' },
] as const

type Payment = (typeof paymentOptions)[number]['value']

export default function Checkout() {
  const location = useLocation()
  const { items, clearCart } = useCart()

  const [form, setForm] = useState<FormState>(emptyForm)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [shipDifferent, setShipDifferent] = useState(false)
  const [payment, setPayment] = useState<Payment>('cod')
  const [placed, setPlaced] = useState<PlacedOrder | null>(null)

  // Discount carried over from the Cart page
  const [discountRate, setDiscountRate] = useState<number>(
    (location.state as { discountRate?: number } | null)?.discountRate ?? 0
  )
  const [showCoupon, setShowCoupon] = useState(false)
  const [code, setCode] = useState('')
  const [couponMessage, setCouponMessage] = useState('')

  const lines = items
    .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
    .filter((l): l is typeof l & { product: NonNullable<typeof l.product> } => !!l.product)

  const subtotal = lines.reduce((sum, l) => sum + l.product.price * l.qty, 0)
  const discount = subtotal * discountRate
  const shipping = lines.length ? SHIPPING : 0
  const total = subtotal - discount + shipping

  const clearError = (name: string) =>
    setErrors((prev) => {
      const next = { ...prev }
      delete next[name]
      return next
    })

  // Props shared by every text input / select / textarea
  const bind = (name: keyof FormState) => ({
    id: name,
    value: form[name],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      setForm((f) => ({ ...f, [name]: e.target.value }))
      clearError(name)
    },
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  const applyCoupon = () => {
    const rate = COUPONS[code.trim().toUpperCase()]
    if (rate) {
      setDiscountRate(rate)
      setCouponMessage(`Coupon applied: ${rate * 100}% off`)
    } else {
      setCouponMessage("That code isn't valid. Check it and try again.")
    }
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim())) {
      e.email = 'Enter a valid email, like name@example.com'
    }
    if (form.phone.trim() && !/^\d{6,15}$/.test(form.phone.replace(/[\s-]/g, ''))) {
      e.phone = 'Enter 6 to 15 digits'
    }
    return e
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const found = validate()
    setErrors(found)
    if (Object.keys(found).length > 0) {
      // Jump to the first field that needs fixing
      requestAnimationFrame(() =>
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
      )
      return
    }
    setPlaced({
      number: `GS-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      total,
      shipping,
      paymentLabel: paymentOptions.find((o) => o.value === payment)?.label || payment,
      lines: lines.map((l) => ({ product: l.product as Product, qty: l.qty })),
    })
    clearCart()
    window.scrollTo(0, 0)
  }

  const states = form.country ? STATES[form.country] ?? [] : []

  return (
    <main className={`${container} pb-8 pt-4`}>
      {/* ---------- Breadcrumb ---------- */}
      <nav className="text-[11px] text-gray-600" aria-label="Breadcrumb">
        <Link to="/" className="font-semibold text-gray-900 hover:text-green-600">
          Home
        </Link>{' '}
        /{' '}
        <Link to="/shop" className="hover:text-green-600">
          Shop
        </Link>{' '}
        / <span>Checkout</span>
      </nav>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="mt-6 grid gap-10 lg:grid-cols-[1fr_22rem]"
      >
        {/* ---------- Billing address ---------- */}
        <section>
          <h2 className="text-sm font-bold text-gray-900">Billing Address</h2>

          <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <Field id="firstName" label="First Name" error={errors.firstName}>
              <input {...bind('firstName')} autoComplete="given-name" className={inputClass} />
            </Field>
            <Field id="lastName" label="Last Name" error={errors.lastName}>
              <input {...bind('lastName')} autoComplete="family-name" className={inputClass} />
            </Field>

            <Field id="country" label="Country / Region" error={errors.country}>
              <SelectBox
                {...bind('country')}
                onChange={(e) => {
                  setForm((f) => ({ ...f, country: e.target.value, state: '' }))
                  clearError('country')
                  clearError('state')
                }}
              >
                <option value="">Select a country / region</option>
                {COUNTRIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </SelectBox>
            </Field>
            <Field id="city" label="Town / City" error={errors.city}>
              <input {...bind('city')} autoComplete="address-level2" className={inputClass} />
            </Field>

            <Field id="street" label="Street Address" error={errors.street}>
              <input
                {...bind('street')}
                placeholder="House number and street name"
                autoComplete="address-line1"
                className={inputClass}
              />
            </Field>
            <Field id="street2" label="Apartment, suite, unit (optional)" className="sm:pt-0">
              <input
                {...bind('street2')}
                placeholder="Apartment, suite, unit, etc. (optional)"
                autoComplete="address-line2"
                className={inputClass}
              />
            </Field>

            <Field id="state" label="State" error={errors.state}>
              <SelectBox {...bind('state')} disabled={!form.country}>
                <option value="">Select a state</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </SelectBox>
            </Field>
            <Field id="zip" label="Zip" error={errors.zip}>
              <input {...bind('zip')} autoComplete="postal-code" className={inputClass} />
            </Field>

            <Field id="email" label="Email address" error={errors.email}>
              <input {...bind('email')} type="email" autoComplete="email" className={inputClass} />
            </Field>
            <Field id="phone" label="Phone Number" error={errors.phone}>
              <div className="flex gap-2">
                <div className="w-24 shrink-0">
                  <SelectBox
                    aria-label="Country calling code"
                    value={form.phoneCode}
                    onChange={(e) => setForm((f) => ({ ...f, phoneCode: e.target.value }))}
                  >
                    {PHONE_CODES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </SelectBox>
                </div>
                <input
                  {...bind('phone')}
                  type="tel"
                  autoComplete="tel-national"
                  className={inputClass}
                />
              </div>
            </Field>
          </div>

          {/* Ship to a different address */}
          <label className="mt-6 flex cursor-pointer items-center gap-2 text-[11px] font-medium text-gray-800">
            <input
              type="checkbox"
              checked={shipDifferent}
              onChange={(e) => setShipDifferent(e.target.checked)}
              className="h-3.5 w-3.5 accent-green-600"
            />
            Ship to a different address?
          </label>

          {shipDifferent && (
            <div className="mt-4 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <Field id="sFirstName" label="First Name" error={errors.sFirstName}>
                <input {...bind('sFirstName')} className={inputClass} />
              </Field>
              <Field id="sLastName" label="Last Name">
                <input {...bind('sLastName')} className={inputClass} />
              </Field>
              <Field id="sStreet" label="Street Address" error={errors.sStreet}>
                <input {...bind('sStreet')} className={inputClass} />
              </Field>
              <Field id="sCity" label="Town / City" error={errors.sCity}>
                <input {...bind('sCity')} className={inputClass} />
              </Field>
              <Field id="sZip" label="Zip" error={errors.sZip}>
                <input {...bind('sZip')} className={inputClass} />
              </Field>
            </div>
          )}

          <Field id="notes" label="Order notes (optional)" className="mt-8 sm:max-w-[48%]">
            <textarea {...bind('notes')} rows={7} className={`${inputClass} resize-none`} />
          </Field>
        </section>

        {/* ---------- Your order ---------- */}
        <aside>
          <h2 className="text-sm font-bold text-gray-900">Your Order</h2>

          <div className="mt-4 flex justify-between border-b border-gray-100 pb-2 text-xs font-bold text-gray-900">
            <span>Products</span>
            <span>Subtotal</span>
          </div>

          <ul className="mt-3 space-y-2">
            {lines.map(({ product, qty }) => (
              <li
                key={product.id}
                className="flex items-center gap-3 bg-gray-50 px-2 py-2 text-xs text-gray-700"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-white text-xl">
                  {product.image ? (
                    <img src={product.image} alt="" className="h-full w-full object-contain" />
                  ) : (
                    '🪴'
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-gray-900">{product.name}</span>
                  <span className="block text-[10px] text-gray-400">
                    SKU: {1995751877960 + product.id}
                  </span>
                </span>
                <span className="text-[10px] text-gray-500">(x {qty})</span>
                <span className="w-16 text-right font-bold text-green-600">
                  {money(product.price * qty)}
                </span>
              </li>
            ))}
          </ul>

          {/* Coupon */}
          <p className="mt-4 text-right text-[11px] text-gray-600">
            Have a coupon code?{' '}
            <button
              type="button"
              onClick={() => setShowCoupon((s) => !s)}
              className="font-medium text-green-600 hover:underline"
            >
              Click here
            </button>
          </p>
          {showCoupon && (
            <div className="mt-2">
              <div className="flex">
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      applyCoupon()
                    }
                  }}
                  placeholder="Enter coupon code here..."
                  aria-label="Coupon code"
                  className="min-w-0 flex-1 border border-green-600 px-2 py-2 text-[11px] text-gray-700 outline-none"
                />
                <button
                  type="button"
                  onClick={applyCoupon}
                  className="bg-green-600 px-5 text-[11px] font-semibold text-white hover:bg-green-700"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <p
                  className={`mt-1 text-[11px] ${
                    couponMessage.startsWith('Coupon applied') ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {couponMessage}
                </p>
              )}
            </div>
          )}

          <dl className="mt-4 space-y-3 text-xs text-gray-700">
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
                <dt>Shiping</dt>
                <dd className="font-bold text-gray-900">{money(shipping)}</dd>
              </div>
              <a
                href="#"
                className="mt-1 block text-right text-[10px] text-green-600 hover:underline"
              >
                View shipping charge
              </a>
            </div>
            <div className="flex justify-between border-t border-green-600/40 pt-3 text-sm font-bold text-gray-900">
              <dt>Total</dt>
              <dd className="text-green-600">{money(total)}</dd>
            </div>
          </dl>

          {/* Payment method */}
          <fieldset className="mt-8">
            <legend className="text-xs font-bold text-gray-900">Payment Method</legend>
            <div className="mt-3 space-y-3">
              {paymentOptions.map((o) => (
                <label
                  key={o.value}
                  className={`flex cursor-pointer items-center gap-2 border px-3 py-3 text-[11px] text-gray-700 transition-colors ${
                    payment === o.value ? 'border-green-600' : 'border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={o.value}
                    checked={payment === o.value}
                    onChange={() => setPayment(o.value)}
                    className="h-3.5 w-3.5 accent-green-600"
                  />
                  {o.value === 'paypal' ? (
                    <span className="flex items-center gap-3 text-[11px] font-extrabold italic">
                      <span className="text-blue-800">
                        Pay<span className="text-sky-500">Pal</span>
                      </span>
                      <span className="flex">
                        <span className="-mr-1.5 h-4 w-4 rounded-full bg-red-500" />
                        <span className="h-4 w-4 rounded-full bg-orange-400 opacity-90" />
                      </span>
                      <span className="text-blue-900">VISA</span>
                      <span className="rounded-sm bg-sky-600 px-1 text-[8px] not-italic text-white">
                        AMEX
                      </span>
                    </span>
                  ) : (
                    o.label
                  )}
                </label>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            className="mt-8 w-full rounded bg-green-600 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-green-700"
          >
            Place Order
          </button>
        </aside>
      </form>

      {/* Order Popup */}
      {placed && (
        <OrderPopup
          order={placed}
          onClose={() => setPlaced(null)}
          onTrack={() => {
            setPlaced(null)
            window.location.href = '/shop'
          }}
        />
      )}
    </main>
  )
}