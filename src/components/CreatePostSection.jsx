import { useEffect, useState } from 'react'
import { ImagePlus, Link as LinkIcon, Hash, Heading, FileText } from 'lucide-react'
import CodeEmbedPreview from './CodeEmbedPreview'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
      {children}
    </label>
  )
}

export default function CreatePostSection() {
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const [codeUrl, setCodeUrl] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    setToken(localStorage.getItem('token') || '')
  }, [])

  const validate = () => {
    if (!title.trim()) return 'Title is required'
    if (!content.trim()) return 'Write something in the content'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMessage('')
    const v = validate()
    if (v) {
      setError(v)
      return
    }

    if (!token) {
      setError('Please log in to publish a post')
      return
    }

    // Respecting backend-first rule: only attempt if posts endpoint exists.
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          subtitle,
          image: imageUrl,
          tags: tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          content,
          code_url: codeUrl,
        }),
      })

      if (res.ok) {
        setMessage('Post published!')
        setTitle('')
        setSubtitle('')
        setImageUrl('')
        setTags('')
        setContent('')
        setCodeUrl('')
      } else {
        const data = await res.json().catch(() => null)
        throw new Error(data?.detail || 'Unable to publish. The posts API may not be available yet.')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section id="create" className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Create a post</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Add an image, content, and an optional code embed link.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title">
            <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <Heading size={16} className="text-gray-400" />
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400 dark:text-gray-100"
                placeholder="A great story begins…"
                required
              />
            </div>
          </Field>

          <Field label="Subtitle (optional)">
            <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <FileText size={16} className="text-gray-400" />
              <input
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400 dark:text-gray-100"
                placeholder="Add a short description"
              />
            </div>
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Cover image URL">
            <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <ImagePlus size={16} className="text-gray-400" />
              <input
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400 dark:text-gray-100"
                placeholder="https://…"
              />
            </div>
            <div className="mt-2 grid h-40 place-items-center overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gray-50 text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-800/40 dark:text-gray-400">
              {imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={imageUrl} alt="Cover" className="h-full w-full object-cover" />
              ) : (
                <div className="flex items-center gap-2"><ImagePlus size={16} /> Image preview</div>
              )}
            </div>
          </Field>

          <Field label="Tags (comma separated)">
            <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
              <Hash size={16} className="text-gray-400" />
              <input
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full bg-transparent outline-none placeholder:text-gray-400 dark:text-gray-100"
                placeholder="react, tailwind, fastapi"
              />
            </div>
          </Field>
        </div>

        <Field label="Content">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[160px] w-full rounded-md border border-gray-300 bg-white p-3 text-gray-900 outline-none ring-0 placeholder:text-gray-400 focus:border-gray-400 focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            placeholder="Write your post content here…"
          />
        </Field>

        <Field label="Code embed link (StackBlitz, CodeSandbox, etc.)">
          <div className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
            <LinkIcon size={16} className="text-gray-400" />
            <input
              value={codeUrl}
              onChange={(e) => setCodeUrl(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-gray-400 dark:text-gray-100"
              placeholder="https://stackblitz.com/edit/..."
            />
          </div>
          <div className="mt-3">
            <CodeEmbedPreview url={codeUrl} />
          </div>
        </Field>

        {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
        {message && <p className="text-sm text-green-600 dark:text-green-400">{message}</p>}

        <div className="flex items-center gap-3">
          <button
            type="submit"
            className="rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-black disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Publish post
          </button>
          {!token && <span className="text-sm text-gray-500 dark:text-gray-400">You must be logged in to publish.</span>}
        </div>
      </form>
    </section>
  )
}
