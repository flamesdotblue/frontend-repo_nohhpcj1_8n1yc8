import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState('system')
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'system'
    setTheme(saved)
  }, [])

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const dark = theme === 'dark' || (theme === 'system' && prefersDark)
    setIsDark(dark)
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [theme])

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
    setTheme(next)
    localStorage.setItem('theme', next)
  }

  return (
    <button
      aria-label={`Switch theme (current: ${theme})`}
      onClick={cycleTheme}
      className="fixed right-4 top-4 z-50 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3 py-2 text-sm text-gray-700 shadow-sm backdrop-blur hover:bg-white dark:border-gray-700 dark:bg-gray-900/90 dark:text-gray-200 dark:hover:bg-gray-900"
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
      <span className="hidden sm:inline">{theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'}</span>
    </button>
  )
}
