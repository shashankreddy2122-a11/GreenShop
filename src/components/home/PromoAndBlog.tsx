import { ArrowRight } from 'lucide-react'

const promos = [
  {
    title: 'SUMMER CACTUS\n& SUCCULENTS',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
    image: '/assets/p5.png', // e.g. '/images/promo-1.png'
  },
  {
    title: 'STYLING TRENDS\n& MUCH MORE',
    text: 'We are an online plant shop offering a wide range of cheap and trendy plants',
    image: '/assets/p3.png', // e.g. '/images/promo-2.png'
  },
]

const posts = [
  {
    date: 'September 12',
    read: 'Read in 6 minutes',
    title: 'Cactus & Succulent Care Tips',
    text: 'Cacti are succulents are easy care plants for any home or patio.',
    image: '/assets/b1.png', // e.g. '/images/blog-1.jpg'
  },
  {
    date: 'September 13',
    read: 'Read in 2 minutes',
    title: 'Top 10 Succulents for Your Home',
    text: 'Best in hanging baskets. Prefers medium to high light.',
    image: '/assets/b2.png',
  },
  {
    date: 'September 15',
    read: 'Read in 3 minutes',
    title: 'Cacti & Succulent Care Tips',
    text: 'Cacti and succulents thrive in containers and because most are..',
    image: '/assets/b3.png',
  },
  {
    date: 'September 15',
    read: 'Read in 2 minutes',
    title: 'Best Houseplants Room By Room',
    text: 'The benefits of houseplants are endless. In addition to..',
    image: '/assets/b4.png',
  },
]

export default function PromoAndBlog() {
  return (
    <>
      {/* ---------- Promo banners ---------- */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        {promos.map((p, i) => (
          <div
            key={i}
            className="relative flex items-center justify-between overflow-hidden bg-gray-50 px-6 py-8"
          >
            {/* decorative green arc, bottom-left */}
            <span className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full border-2 border-green-500" />

            <div className="relative flex h-36 w-36 items-center justify-center text-7xl">
              {p.image ? (
                <img src={p.image} alt="" className="h-full w-full object-contain" />
              ) : (
                '🪴'
              )}
            </div>

            <div className="relative max-w-[16rem] text-right">
              <h3 className="whitespace-pre-line text-sm font-extrabold leading-snug text-gray-900">
                {p.title}
              </h3>
              <p className="mt-3 text-[11px] leading-relaxed text-gray-500">{p.text}</p>
              <button className="mt-4 inline-flex items-center gap-1.5 rounded bg-green-600 px-8 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-green-700">
                Find More <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* ---------- Blog posts ---------- */}
      <section className="mt-20">
        <h2 className="text-center text-2xl font-bold text-gray-900">Our Blog Posts</h2>
        <p className="mt-1 text-center text-xs text-gray-500">
          We are an online plant shop offering a wide range of cheap and trendy plants.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post, i) => (
            <article key={i} className="group bg-gray-50">
              <div className="flex aspect-[4/3] items-center justify-center bg-gray-100 text-6xl">
                {post.image ? (
                  <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                ) : (
                  '🌿'
                )}
              </div>

              <div className="p-3">
                <p className="text-[10px] text-green-600">
                  {post.date} <span className="mx-1 text-gray-400">|</span> {post.read}
                </p>
                <h3 className="mt-1 text-sm font-bold leading-snug text-gray-900">{post.title}</h3>
                <p className="mt-2 text-[11px] leading-relaxed text-gray-500">{post.text}</p>
                <a
                  href="#"
                  className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-gray-900 transition-colors group-hover:text-green-600"
                >
                  Read More <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}