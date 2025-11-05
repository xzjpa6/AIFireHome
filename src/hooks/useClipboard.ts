import { useState } from 'react'

export function useClipboard(timeout = 2000) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setError(null)
      if (timeout > 0) {
        setTimeout(() => setCopied(false), timeout)
      }
      return true
    } catch (e: any) {
      setError(e?.message || '复制失败，请手动复制')
      return false
    }
  }

  return { copied, error, copy }
}