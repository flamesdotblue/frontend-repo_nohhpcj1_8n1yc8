import { useMemo } from 'react'

function normalizeUrl(url) {
  if (!url) return ''
  try {
    const u = new URL(url)
    return u.toString()
  } catch {
    return ''
  }
}

export default function CodeEmbedPreview({ url }) {
  const embedUrl = useMemo(() => normalizeUrl(url), [url])

  if (!embedUrl) {
    return (
      <div className="flex h-40 w-full items-center justify-center rounded-lg border border-dashed border-gray-300 text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
        Paste a valid CodeSandbox, StackBlitz, or GitHub URL to preview.
      </div>
    )
  }

  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
      <iframe
        src={embedUrl}
        title="Code Embed"
        className="h-full w-full"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr;"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      />
    </div>
  )
}
