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
  'h-10 w-full border border-gray-200 bg-white px-3 text-base text-gray-700 outline-none focus:border-green-600 sm:h-[34px] sm:text-[11px] lg:h-[26px]'

function Required() {
  return <span className="text-red-500"> *</span>
}

function PasswordField({ label }: { label: string }) {
  const [show, setShow] = useState(false)
  return (
    <div>
      <label className={labelCls}>{label}</label>
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
          {show ? <Eye className="h-4 w-4 lg:h-3.5 lg:w-3.5" /> : <EyeOff className="h-4 w-4 lg:h-3.5 lg:w-3.5" />}
        </button>
      </div>
    </div>
  )
}

export default function AccountDetails() {
  const [active, setActive] = useState('Account Details')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: send form data to your API
  }

  return (
    <div className={`${container} overflow-x-hidden py-5 lg:py-5`}>
      <div className="grid gap-5 lg:grid-cols-[200px_1fr] lg:gap-4">
        {/* ---------- Sidebar (tabs on phone/tablet, list on desktop) ---------- */}
        <aside className="min-w-0 self-start lg:bg-gray-50">
          <h3 className="pb-2 text-sm font-bold text-gray-900 lg:px-3 lg:py-2.5">My Account</h3>

          <nav
            className="flex overflow-x-auto border-b border-gray-200 [scrollbar-width:none] lg:block lg:overflow-visible lg:border-b-0 [&::-webkit-scrollbar]:hidden"
          >
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

        {/* ---------- Form ---------- */}
        <form onSubmit={handleSubmit} className="min-w-0 lg:max-w-[560px]">
          <h3 className="text-sm font-medium text-gray-900 sm:text-xs">Personal Information</h3>

          <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 lg:gap-y-5">
            <div>
              <label className={labelCls}>
                First Name
                <Required />
              </label>
              <input type="text" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>
                Last Name
                <Required />
              </label>
              <input type="text" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>
                Email address
                <Required />
              </label>
              <input type="email" className={inputCls} />
            </div>

            <div>
              <label className={labelCls}>
                Phone Number
                <Required />
              </label>
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
            </div>

            <div>
              <label className={labelCls}>
                Username
                <Required />
              </label>
              <input type="text" className={inputCls} />
            </div>

            <div>
              <span className={labelCls}>Photo</span>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-50 text-green-600 ring-1 ring-gray-200 sm:h-8 sm:w-8">
                  <ImageIcon className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
                </div>
                <button
                  type="button"
                  className="bg-green-600 px-6 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-green-700 sm:py-1.5 sm:text-[11px]"
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

          <h3 className="mt-7 text-sm font-medium text-gray-900 sm:text-xs">Password change</h3>

          {/* Full width on phones, half width (left column) on tablet/desktop like the design */}
          <div className="mt-3 grid grid-cols-1 gap-4 sm:w-[calc(50%-0.5rem)] lg:gap-5">
            <PasswordField label="Current password" />
            <PasswordField label="New password" />
            <PasswordField label="Confirm new password" />
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-green-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-700 sm:w-auto sm:py-2 sm:text-[11px]"
          >
            Save Change
          </button>
        </form>
      </div>
    </div>
  )
}