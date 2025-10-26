import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Input({ label, type = 'text', value, onChange, name, autoComplete }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm outline-none ring-0 focus:border-gray-400 focus:ring-0"
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </label>
  )
}

export default function AuthSection() {
  const [mode, setMode] = useState('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => data && setUser(data))
        .catch(() => {})
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/signup'
      const payload = mode === 'login' ? { email, password } : { name, email, password }
      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.detail || 'Something went wrong')
      }
      localStorage.setItem('token', data.access_token)
      const me = await fetch(`${API_BASE}/auth/me`, {
        headers: { Authorization: `Bearer ${data.access_token}` },
      }).then((r) => r.json())
      setUser(me)
      setPassword('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const onLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <section id="account" className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{user ? 'Your account' : 'Join the community'}</h2>
        {!user && (
          <div className="inline-flex rounded-md border border-gray-200 p-1 text-sm">
            <button
              className={`rounded px-3 py-1 ${mode === 'login' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
              onClick={() => setMode('login')}
            >
              Log in
            </button>
            <button
              className={`rounded px-3 py-1 ${mode === 'signup' ? 'bg-gray-900 text-white' : 'text-gray-700'}`}
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </div>
        )}
      </div>

      {user ? (
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Signed in as</p>
            <p className="font-medium">{user.name || user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
          >
            Log out
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {mode === 'signup' && (
            <Input label="Name" name="name" value={name} onChange={setName} autoComplete="name" />
          )}
          <Input label="Email" type="email" name="email" value={email} onChange={setEmail} autoComplete="email" />
          <Input
            label="Password"
            type="password"
            name="password"
            value={password}
            onChange={setPassword}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          />

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-black disabled:opacity-50"
          >
            {loading ? 'Please wait…' : mode === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>
      )}
    </section>
  )
}
