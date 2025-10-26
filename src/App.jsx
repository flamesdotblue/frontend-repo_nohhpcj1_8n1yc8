import Navbar from './components/Navbar'
import FeaturedPost from './components/FeaturedPost'
import PostList from './components/PostList'
import Footer from './components/Footer'
import AuthSection from './components/AuthSection'
import CreatePostSection from './components/CreatePostSection'
import ThemeToggle from './components/ThemeToggle'

function App() {
  const featuredPost = {
    id: 1,
    title: 'Building a Modern Blog with React and Tailwind CSS',
    excerpt:
      'Learn how to design a clean, responsive blog layout using React components and Tailwind utility classes. We will cover layout, typography, and component structure.',
    image:
      'https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1600&auto=format&fit=crop',
    date: 'Oct 26, 2025',
    author: 'Alex Carter',
    tags: ['react', 'tailwind', 'design'],
  }

  const posts = [
    {
      id: 2,
      title: 'State Management Patterns in React',
      excerpt:
        'From Context to Redux and Zustand — understand when to pick each, with practical examples and trade‑offs.',
      image:
        'https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1200&auto=format&fit=crop',
      date: 'Oct 21, 2025',
      author: 'Jamie Lee',
      tags: ['react', 'state'],
    },
    {
      id: 3,
      title: 'CSS Architecture: Utility‑first done right',
      excerpt:
        'How to keep styles scalable and maintainable using utility classes, composition, and design tokens.',
      image:
        'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop',
      date: 'Oct 18, 2025',
      author: 'Morgan Shaw',
      tags: ['css', 'tailwind'],
    },
    {
      id: 4,
      title: 'Ship Faster with Component‑Driven Development',
      excerpt:
        'Adopt a component library mindset and build features quickly without sacrificing quality.',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      date: 'Oct 12, 2025',
      author: 'Riley Nguyen',
      tags: ['ui', 'devtools'],
    },
    {
      id: 5,
      title: 'Writing for Developers: Clear, Helpful, Human',
      excerpt:
        'Craft content that educates and inspires. Tips for structure, tone, and visuals that resonate.',
      image:
        'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop',
      date: 'Oct 5, 2025',
      author: 'Avery Kim',
      tags: ['writing', 'content'],
    },
    {
      id: 6,
      title: 'APIs 101: Designing Friendly Interfaces',
      excerpt:
        'Principles and patterns that make APIs a joy to use — versioning, errors, and docs included.',
      image:
        'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
      date: 'Sep 29, 2025',
      author: 'Sam Patel',
      tags: ['api', 'backend'],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-gray-50 text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-black dark:text-gray-100">
      <ThemeToggle />
      <Navbar />

      <main className="mx-auto max-w-6xl space-y-12 px-4 py-10 sm:px-6 lg:px-8">
        <FeaturedPost post={featuredPost} />
        <PostList posts={posts} />
        <CreatePostSection />
        <AuthSection />
      </main>

      <Footer />
    </div>
  )
}

export default App
