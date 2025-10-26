import PostCard from './PostCard'

function PostList({ posts = [] }) {
  return (
    <section id="latest" className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Latest posts</h2>
          <p className="text-sm text-gray-600">Insights, tutorials, and stories from our team</p>
        </div>
        <a href="#all" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
          View all
        </a>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  )
}

export default PostList
