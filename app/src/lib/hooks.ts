import { useEffect, useState } from 'react'
import { loadCurriculum, Week, flatten } from './curriculum'

export function useCurriculum() {
  const [weeks, setWeeks] = useState<Week[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    loadCurriculum()
      .then((w) => alive && setWeeks(w))
      .catch((e) => alive && setError(String(e)))
    return () => {
      alive = false
    }
  }, [])

  return { weeks, error, days: weeks ? flatten(weeks) : [] }
}
