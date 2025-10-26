import { ArrowRight, Calendar, User } from 'lucide-react'

function FeaturedPost({ post }) {
  if (!post) return null

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-1">
      <div className="relative isolate overflow-hidden rounded-2xl bg-white">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 w-max">
              Featured
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              {post.title}
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              {post.excerpt}
            </p>
            <div className="mt-5 flex items-center gap-4 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1"><Calendar size={16} /> {post.date}</span>
              <span className="inline-flex items-center gap-1"><User size={16} /> {post.author}</span>
            </div>
            <div className="mt-6">
              <a href="#read" className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
                Read article <ArrowRight size={16} />
              </a>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-full">
            <img
              src={post.image}
              alt={post.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturedPost
