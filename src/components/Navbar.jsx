import { Menu, Search } from 'lucide-react'

function Navbar() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-500" />
            <span className="text-xl font-bold tracking-tight text-gray-900">FluxBlog</span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#home" className="hover:text-gray-900">Home</a>
            <a href="#latest" className="hover:text-gray-900">Latest</a>
            <a href="#guides" className="hover:text-gray-900">Guides</a>
            <a href="#about" className="hover:text-gray-900">About</a>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <Search size={16} />
              <span>Search</span>
            </button>
            <button className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800">
              Subscribe
            </button>
            <button className="md:hidden inline-flex items-center rounded-md border border-gray-200 p-2 hover:bg-gray-50">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
