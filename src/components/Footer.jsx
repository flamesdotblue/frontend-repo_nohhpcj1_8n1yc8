function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} FluxBlog. All rights reserved.</p>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <a href="#privacy" className="hover:text-gray-900">Privacy</a>
            <a href="#terms" className="hover:text-gray-900">Terms</a>
            <a href="#contact" className="hover:text-gray-900">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
