import { Calendar, User } from 'lucide-react'

function PostCard({ post }) {
  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-md transition-shadow">
      <div className="relative h-44 w-full overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          <span className="inline-flex items-center gap-1"><User size={14} /> {post.author}</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-indigo-600">
          {post.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-600">{post.excerpt}</p>
        {post.tags && (
          <div className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}

export default PostCard
