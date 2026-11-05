import { Link } from 'react-router-dom'

const container = 'mx-auto max-w-7xl px-4 sm:px-10 lg:px-20 xl:px-28'

const blogPosts = [
  {
    id: 1,
    title: 'Cactus & Succulent Care Tips',
    date: 'September 12',
    readTime: 'Read in 6 minutes',
    description: 'Cacti are succulents are easy care plants for any home or patio.',
    image: '/assets/b1.png',
  },
  {
    id: 2,
    title: 'Top 10 Succulents for Your Home',
    date: 'September 13',
    readTime: 'Read in 2 minutes',
    description: 'Best in hanging baskets. Prefers medium to high light.',
    image: '/assets/b2.png',
  },
  {
    id: 3,
    title: 'Cacti & Succulent Care Tips',
    date: 'September 15',
    readTime: 'Read in 3 minutes',
    description: 'Cacti and succulents thrive in containers and because most are..',
    image: '/assets/b3.png',
  },
  {
    id: 4,
    title: 'Best Houseplants Room By Room',
    date: 'September 15',
    readTime: 'Read in 2 minutes',
    description: 'The benefits of houseplants',
    image: '/assets/b4.png',
  },
]

export default function Blog() {
  return (
    <main className={`${container} py-12`}>
      {/* Breadcrumb */}
      <nav className="text-[11px] text-gray-600" aria-label="Breadcrumb">
        <Link to="/" className="font-semibold text-gray-900 hover:text-green-600">
          Home
        </Link>{' '}
        / <span>Blog</span>
      </nav>

      {/* Page Title */}
      <div className="mt-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Blog Posts</h1>
        <p className="mt-2 text-sm text-gray-600">
          We are an online plant shop offering a wide range of cheap and trendy plants.
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="group overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg"
          >
            {/* Image */}
            <div className="h-48 overflow-hidden bg-green-50">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="flex items-center gap-2 text-[10px] text-gray-500">
                <span>{post.date}</span>
                <span>|</span>
                <span>{post.readTime}</span>
              </div>

              <h3 className="mt-2 text-sm font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                {post.title}
              </h3>

              <p className="mt-2 text-[11px] leading-relaxed text-gray-600">
                {post.description}
              </p>

              <button className="mt-3 text-xs font-semibold text-green-600 hover:text-green-700 transition-colors">
                Read More
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
