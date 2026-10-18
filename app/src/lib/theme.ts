import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

function read(): Theme {
  try {
    const t = localStorage.getItem('fde-theme')
    return t === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('fde-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}
