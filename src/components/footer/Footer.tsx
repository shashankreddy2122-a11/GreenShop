import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from 'lucide-react'

// Same container as Home.tsx, so the left and right alignment match exactly
const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

// Desktop: original 4-column grid. Mobile: compact, tighter gaps
const grid4 = 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4'

const features = [
  { image: '/assets/f1.png', title: 'Garden Care' },
  { image: '/assets/f2.png', title: 'Plant Renovation' },
  { image: '/assets/f3.png', title: 'Watering Garden' },
]

const featureText =
  'We are an online plant shop offering a wide range of cheap and trendy plants.'

const columns = [
  {
    title: 'My Account',
    links: ['My Account', 'Our stores', 'Contact us', 'Career', 'Specials'],
  },
  {
    title: 'Help & Guide',
    links: ['Help Center', 'How to Buy', 'Shipping & Delivery', 'Product Policy', 'How to Return'],
  },
  {
    title: 'Categories',
    links: ['House Plants', 'Potter Plants', 'Seeds', 'Small Plants', 'Accessories'],
  },
]

const socials = [
  { name: 'Facebook', Icon: Facebook },
  { name: 'Instagram', Icon: Instagram },
  { name: 'Twitter', Icon: Twitter },
  { name: 'LinkedIn', Icon: Linkedin },
  { name: 'YouTube', Icon: Youtube },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setJoined(true)
    setEmail('')
  }

  return (
    <footer className="mt-10 overflow-x-hidden bg-gray-50 lg:mt-20">
      {/* ---------- Features + newsletter ---------- */}
      <div className={container}>
        <div className={`${grid4} py-5 lg:py-8`}>
          {features.map((f, i) => (
            <div
              key={f.title}
              // Mobile: small icon beside the text. Desktop: original stacked layout
              className={`flex items-start gap-3 lg:block lg:pr-6 ${
                i < 2 ? 'lg:border-r lg:border-gray-200' : ''
              }`}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-100 lg:h-14 lg:w-14">
                <img
                  src={f.image}
                  alt={f.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 lg:mt-3 lg:text-sm">{f.title}</h4>
                <p className="mt-1 max-w-[13rem] text-[10px] leading-relaxed text-gray-500 lg:mt-2 lg:text-[11px]">
                  {featureText}
                </p>
              </div>
            </div>
          ))}

          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-xs font-bold text-gray-900 lg:text-sm">
              Would you like to join newsletters?
            </h4>
            <form onSubmit={handleJoin} className="mt-2 flex lg:mt-3">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setJoined(false)
                }}
                placeholder="enter your email address..."
                aria-label="Email address"
                className="min-w-0 flex-1 border border-gray-200 bg-white px-3 py-2 text-[11px] text-gray-700 outline-none focus:border-green-600"
              />
              <button
                type="submit"
                className="shrink-0 bg-green-600 px-5 text-xs font-semibold text-white transition-colors hover:bg-green-700 lg:px-6"
              >
                Join
              </button>
            </form>
            {joined ? (
              <p className="mt-2 text-[11px] font-medium text-green-600 lg:mt-3">
                Thanks for joining! Check your inbox for a welcome email.
              </p>
            ) : (
              <p className="mt-2 text-[10px] leading-relaxed text-gray-500 lg:mt-3 lg:text-[11px]">
                We usually post offers and challenges in newsletter. We're your online houseplant
                destination. We offer a wide range of houseplants and accessories shipped directly
                from our (green)house to yours!
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ---------- Green contact bar (same 4 columns) ---------- */}
      <div className="bg-green-100">
        <div className={container}>
          <div
            className={`${grid4} items-center gap-y-2 py-3 text-[11px] text-gray-700 lg:gap-y-8 lg:py-4`}
          >
            <div className="flex items-center gap-2 text-green-600 sm:col-span-2 lg:col-span-1">
              <img src="/assets/l.png" alt="GreenShop Logo" className="h-5 w-5 lg:h-6 lg:w-6" />
              <span className="text-sm font-extrabold tracking-wide lg:text-base">GREENSHOP</span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-green-600" />
              <span>
                70 West Buckingham Ave.
                <br />
                Farmingdale, NY 11735
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 shrink-0 text-green-600" />
              <a href="mailto:contact@greenshop.com" className="break-all">
                contact@greenshop.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-3.5 w-3.5 shrink-0 text-green-600" />
              <a href="tel:+88001911717490">+88 01911 717 490</a>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Link columns ---------- */}
      <div className={container}>
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 py-5 sm:gap-x-8 lg:grid-cols-4 lg:gap-y-8 lg:py-8">
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold text-gray-900 lg:text-sm">{col.title}</h4>
              <ul className="mt-2 space-y-1.5 lg:mt-3 lg:space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    {l === 'My Account' ? (
                      <Link
                        to="/account"
                        className="text-[11px] text-gray-600 transition-colors hover:text-green-600"
                      >
                        {l}
                      </Link>
                    ) : (
                      <a
                        href="#"
                        className="text-[11px] text-gray-600 transition-colors hover:text-green-600"
                      >
                        {l}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 sm:col-span-1">
            <h4 className="text-xs font-bold text-gray-900 lg:text-sm">Social Media</h4>
            <div className="mt-2 flex flex-wrap gap-2 lg:mt-3">
              {socials.map(({ name, Icon }) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="flex h-6 w-6 items-center justify-center border border-green-200 text-green-600 transition-colors hover:bg-green-600 hover:text-white"
                >
                  <Icon className="h-3 w-3" />
                </a>
              ))}
            </div>

            <h4 className="mt-4 text-xs font-bold text-gray-900 lg:mt-6 lg:text-sm">We accept</h4>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-extrabold italic lg:mt-3">
              <span className="text-blue-800">Pay<span className="text-sky-500">Pal</span></span>
              <span className="flex">
                <span className="-mr-1.5 h-4 w-4 rounded-full bg-red-500" />
                <span className="h-4 w-4 rounded-full bg-orange-400 opacity-90" />
              </span>
              <span className="text-blue-900">VISA</span>
              <span className="rounded-sm bg-sky-600 px-1 text-[8px] not-italic text-white">
                AMEX
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Copyright ---------- */}
      <div className="border-t border-gray-200">
        <p className={`${container} py-2 text-center text-[10px] text-gray-600 lg:py-3 lg:text-[11px]`}>
          © 2021 GreenShop. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}