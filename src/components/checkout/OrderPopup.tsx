import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { money } from '../pricing/pricing'
import type { Product } from '../pricing/product'

export type PlacedOrder = {
  number: string
  date: string
  total: number
  shipping: number
  paymentLabel: string
  lines: { product: Product; qty: number }[]
}

type Props = {
  order: PlacedOrder
  onClose: () => void
  onTrack: () => void
}

function ThankYouEnvelope() {
  return (
    <svg
      viewBox="0 0 64 64"
      className="h-20 w-20 text-green-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 26 L32 8 L56 26 V56 H8 Z" fill="white" />
      <rect x="16" y="16" width="32" height="22" fill="white" />
      <text x="32" y="25" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" stroke="none">
        THANK
      </text>
      <text x="32" y="33" textAnchor="middle" fontSize="6" fontWeight="700" fill="currentColor" stroke="none">
        YOU
      </text>
      <path d="M8 26 L32 44 L56 26 V56 H8 Z" fill="#f0faf3" />
    </svg>
  )
}

export default function OrderPopup({ order, onClose, onTrack }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock page scroll, focus the popup, close on Escape, keep Tab inside the popup
  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]')
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [onClose])

  const meta = [
    { label: 'Order Number', value: order.number },
    { label: 'Date', value: order.date },
    {
      label: 'Total',
      value: order.total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    },
    { label: 'Payment Method', value: order.paymentLabel },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(e) => {
        // Click on the dark background closes the popup
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-popup-title"
        className="relative max-h-[92vh] w-full max-w-md overflow-y-auto bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="relative flex flex-col items-center bg-green-50 px-6 pb-4 pt-6">
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 text-green-600 transition-colors hover:text-green-800"
          >
            <X className="h-5 w-5" />
          </button>
          <ThankYouEnvelope />
          <h2 id="order-popup-title" className="mt-2 text-xs text-gray-700">
            Your order has been received
          </h2>
        </div>

        {/* Order meta */}
        <dl className="grid grid-cols-2 gap-y-4 border-b border-gray-100 px-6 py-4 sm:grid-cols-4">
          {meta.map((m, i) => (
            <div
              key={m.label}
              className={`sm:px-3 ${i > 0 ? 'sm:border-l sm:border-gray-200' : 'sm:pl-0'}`}
            >
              <dt className="text-[10px] text-gray-500">{m.label}</dt>
              <dd className="mt-1 text-[11px] font-bold text-gray-900">{m.value}</dd>
            </div>
          ))}
        </dl>

        {/* Order details */}
        <div className="px-6 pt-4">
          <h3 className="text-[11px] font-bold text-gray-900">Order Details</h3>

          <div className="mt-2 grid grid-cols-[1fr_3rem_5rem] border-b border-gray-100 pb-2 text-[11px] text-gray-900">
            <span>Products</span>
            <span className="text-center">Qty</span>
            <span className="text-right">Subtotal</span>
          </div>

          <ul className="mt-3 space-y-2">
            {order.lines.map(({ product, qty }) => (
              <li
                key={product.id}
                className="grid grid-cols-[1fr_3rem_5rem] items-center bg-gray-50 px-2 py-2 text-xs text-gray-700"
              >
                <span className="flex min-w-0 items-center gap-3">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-white text-2xl">
                    {product.image ? (
                      <img src={product.image} alt="" className="h-full w-full object-contain" />
                    ) : (
                      '🪴'
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-bold text-gray-900">{product.name}</span>
                    <span className="block text-[10px] text-gray-400">
                      SKU: {1995751877960 + product.id}
                    </span>
                  </span>
                </span>
                <span className="text-center text-[10px] text-gray-500">(x {qty})</span>
                <span className="text-right font-bold text-green-600">
                  {money(product.price * qty)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="mt-4 space-y-3 border-b border-gray-100 pb-4 text-xs text-gray-700">
            <div className="flex justify-end gap-10">
              <dt>Shiping</dt>
              <dd className="w-20 text-right font-bold text-gray-900">{money(order.shipping)}</dd>
            </div>
            <div className="flex justify-end gap-10 text-sm font-bold text-gray-900">
              <dt>Total</dt>
              <dd className="w-20 text-right text-green-600">{money(order.total)}</dd>
            </div>
          </dl>

          <p className="mt-4 text-center text-[11px] leading-relaxed text-gray-500">
            Your order is currently being processed. You will receive an order confirmation email
            shortly with the expected delivery date for your items.
          </p>
        </div>

        <div className="px-6 pb-8 pt-6 text-center">
          <button
            onClick={onTrack}
            className="rounded bg-green-600 px-8 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-green-700"
          >
            Track your order
          </button>
        </div>
      </div>
    </div>
  )
}