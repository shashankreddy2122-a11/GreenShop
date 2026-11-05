import { useState } from 'react'
import {
  User,
  MapPin,
  ShoppingCart,
  Heart,
  LineChart,
  Download,
  AlertTriangle,
  LogOut,
  Eye,
  EyeOff,
  ChevronDown,
  Image as ImageIcon,
} from 'lucide-react'

const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

const menu = [
  { label: 'Account Details', Icon: User },
  { label: 'Address', Icon: MapPin },
  { label: 'Orders', Icon: ShoppingCart },
  { label: 'Wishlist', Icon: Heart },
  { label: 'Reports', Icon: LineChart },
  { label: 'Downloads', Icon: Download },
  { label: 'Support', Icon: AlertTriangle },
]

// Phones: bigger text + height (easy to tap, no iOS zoom). Tablet/desktop: compact like the design
const labelCls = 'mb-1.5 block text-xs text-gray-700 sm:text-[11px]'
const inputCls =
  'h-10 w-full border border-gray-200 bg-white px-3 text-base text-gray-700 outline-none placeholder:text-gray-400 focus:border-green-600 sm:h-[34px] sm:text-[11px] lg:h-[26px]'
const headingCls = 'text-sm font-medium text-gray-900 sm:text-xs'
const greenBtn =
  'bg-green-600 font-semibold text-white transition-colors hover:bg-green-700'

/* ---------------- Small shared pieces ---------------- */

function Required() {
  return <span className="text-red-500"> *</span>
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className={labelCls}>
        {label}
        {required && <Required />}
      </label>
      {children}
    </div>
  )
}

function Select({
  placeholder,
  options,
}: {
  placeholder: string
  options: string[]
}) {
  const [value, setValue] = useState('')
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={`${inputCls} appearance-none pr-8 ${value ? '' : 'text-gray-400'}`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o} className="text-gray-700">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500 sm:h-3 sm:w-3" />
    </div>
  )
}

function PhoneField() {
  return (
    <div className="flex gap-1.5">
      <div className="relative w-[72px] shrink-0 sm:w-[56px]">
        <select
          className={`${inputCls} appearance-none px-2 pr-6`}
          defaultValue="+966"
        >
          <option>+966</option>
          <option>+91</option>
          <option>+1</option>
          <option>+44</option>
          <option>+88</option>
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-600 sm:h-3 sm:w-3" />
      </div>
      <input type="tel" className={`${inputCls} min-w-0 flex-1`} />
    </div>
  )
}

function PasswordField({ label }: { label: string }) {
  const [show, setShow] = useState(false)
  return (
    <Field label={label}>
      <div className="relative">
        <input
          type={show ? 'text' : 'password'}
          className={`${inputCls} pr-10`}
          autoComplete="off"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-gray-500 hover:text-green-600"
        >
          {show ? (
            <Eye className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
          ) : (
            <EyeOff className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
          )}
        </button>
      </div>
    </Field>
  )
}

/* ---------------- Page 1: Account Details ---------------- */

function AccountDetailsPanel() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="min-w-0 lg:max-w-[560px]"
    >
      <h3 className={headingCls}>Personal Information</h3>

      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:gap-y-5">
        <Field label="First Name" required>
          <input type="text" className={inputCls} />
        </Field>
        <Field label="Last Name" required>
          <input type="text" className={inputCls} />
        </Field>
        <Field label="Email address" required>
          <input type="email" className={inputCls} />
        </Field>
        <Field label="Phone Number" required>
          <PhoneField />
        </Field>
        <Field label="Username" required>
          <input type="text" className={inputCls} />
        </Field>

        <div>
          <span className={labelCls}>Photo</span>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-green-600 ring-1 ring-gray-200 sm:h-8 sm:w-8">
              <ImageIcon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            </div>
            <button
              type="button"
              className={`${greenBtn} px-6 py-2.5 text-xs sm:py-1.5 sm:text-[11px]`}
            >
              Change
            </button>
            <button
              type="button"
              className="py-2 text-xs text-gray-700 hover:text-green-600 sm:py-0 sm:text-[11px]"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <h3 className={`mt-7 ${headingCls}`}>Password change</h3>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:w-[calc(50%-0.5rem)] lg:gap-5">
        <PasswordField label="Current password" />
        <PasswordField label="New password" />
        <PasswordField label="Confirm new password" />
      </div>

      <button
        type="submit"
        className={`${greenBtn} mt-8 w-full px-4 py-3 text-sm sm:w-auto sm:py-2 sm:text-[11px]`}
      >
        Save Change
      </button>
    </form>
  )
}

/* ---------------- Page 2: Address ---------------- */

function AddressPanel() {
  const [sameAsBilling, setSameAsBilling] = useState(false)

  return (
    <div className="min-w-0">
      {/* ----- Billing address ----- */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className={headingCls}>Billing Address</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-gray-500">
              The following addresses will be used on the checkout page by default.
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 text-xs font-semibold text-green-600 hover:text-green-700 sm:text-[11px]"
          >
            Add
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:gap-x-5 lg:gap-y-5">
          <Field label="First Name" required>
            <input type="text" className={inputCls} />
          </Field>
          <Field label="Last Name" required>
            <input type="text" className={inputCls} />
          </Field>

          <Field label="Country / Region" required>
            <Select
              placeholder="Select a country / region"
              options={['India', 'United States', 'United Kingdom', 'Saudi Arabia', 'Bangladesh']}
            />
          </Field>
          <Field label="Town / City" required>
            <input type="text" className={inputCls} />
          </Field>

          {/* Street address: two inputs, second one has no label */}
          <Field label="Street Address" required>
            <input
              type="text"
              placeholder="House number and street name"
              className={inputCls}
            />
          </Field>
          <div>
            <span className={`${labelCls} hidden sm:block`}>&nbsp;</span>
            <input
              type="text"
              placeholder="Appartment, suite, unit, etc. (optional)"
              className={inputCls}
            />
          </div>

          <Field label="State" required>
            <Select
              placeholder="Select a state"
              options={['Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi', 'Kerala']}
            />
          </Field>
          <Field label="Zip" required>
            <input type="text" inputMode="numeric" className={inputCls} />
          </Field>

          <Field label="Email address" required>
            <input type="email" className={inputCls} />
          </Field>
          <Field label="Phone Number" required>
            <PhoneField />
          </Field>
        </div>

        <button
          type="submit"
          className={`${greenBtn} mt-7 w-full px-4 py-3 text-sm sm:w-auto sm:py-2 sm:text-[11px]`}
        >
          Save Address
        </button>
      </form>

      {/* ----- Shipping address ----- */}
      <section className="mt-10 lg:mt-12">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <h3 className={headingCls}>Shipping Address</h3>

          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => setSameAsBilling((v) => !v)}
              aria-pressed={sameAsBilling}
              className="flex items-center gap-2 text-xs text-gray-700 sm:text-[11px]"
            >
              <span
                className={`flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
                  sameAsBilling ? 'border-green-600' : 'border-green-600/70'
                }`}
              >
                {sameAsBilling && (
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                )}
              </span>
              Same as billing address
            </button>
            <button
              type="button"
              className="text-xs font-semibold text-green-600 hover:text-green-700 sm:text-[11px]"
            >
              Add
            </button>
          </div>
        </div>

        <p className="mt-1 text-[11px] text-gray-500">
          {sameAsBilling
            ? 'Your shipping address is the same as your billing address.'
            : 'You have not set up this type of address yet.'}
        </p>
      </section>
    </div>
  )
}

/* ---------------- Page shell: sidebar + active panel ---------------- */

export default function Account() {
  const [active, setActive] = useState('Account Details')

  return (
    <div className={`${container} overflow-x-hidden py-5`}>
      <div className="grid gap-5 lg:grid-cols-[200px_1fr] lg:gap-8">
        {/* Sidebar: swipeable tabs on phone/tablet, vertical list on desktop */}
        <aside className="min-w-0 self-start lg:bg-gray-50">
          <h3 className="pb-2 text-sm font-bold text-gray-900 lg:px-3 lg:py-2.5">
            My Account
          </h3>

          <nav className="flex overflow-x-auto border-b border-gray-200 [scrollbar-width:none] lg:block lg:overflow-visible lg:border-b-0 [&::-webkit-scrollbar]:hidden">
            {menu.map(({ label, Icon }) => {
              const isActive = active === label
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setActive(label)}
                  className={`flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-3 py-2.5 text-left text-xs transition-colors sm:text-[11px] lg:w-full lg:gap-2.5 lg:border-b-0 lg:border-l-[3px] ${
                    isActive
                      ? 'border-green-600 font-semibold text-green-600 lg:bg-white'
                      : 'border-transparent text-gray-600 hover:text-green-600'
                  }`}
                >
                  <Icon className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
                  {label}
                </button>
              )
            })}

            <div className="hidden lg:block lg:border-t lg:border-gray-200" />

            <button
              type="button"
              className="flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 border-transparent px-3 py-2.5 text-xs font-semibold text-green-600 sm:text-[11px] lg:w-full lg:gap-2.5 lg:border-b-0 lg:border-l-[3px] lg:py-3"
            >
              <LogOut className="h-4 w-4 lg:h-3.5 lg:w-3.5" />
              Logout
            </button>
          </nav>
        </aside>

        {/* Content: changes when a sidebar item is clicked */}
        <main className="min-w-0">
          {active === 'Account Details' && <AccountDetailsPanel />}
          {active === 'Address' && <AddressPanel />}

          {/* Other menu items don't have a page yet */}
          {active !== 'Account Details' && active !== 'Address' && (
            <p className="text-xs text-gray-500">{active} page coming soon.</p>
          )}
        </main>
      </div>
    </div>
  )
}