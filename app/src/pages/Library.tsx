import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MENTOR_FILES, loadMarkdown, MentorFile } from '../lib/markdown'

const GROUPS: MentorFile['group'][] = ['Plan', 'Govt', 'Tech', 'Trackers']

export default function Library() {
  const { file } = useParams()
  const activeFile = file || '60_DAY_PLAN.md'
  const [html, setHtml] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    setLoading(true)
    setError(null)
    loadMarkdown(activeFile)
      .then((h) => {
        if (alive) {
          setHtml(h)
          setLoading(false)
        }
      })
      .catch((e) => {
        if (alive) {
          setError(String(e))
          setLoading(false)
        }
      })
    return () => {
      alive = false
    }
  }, [activeFile])

  return (
    <div className="page">
      <header className="page-head">
        <h1>Library</h1>
        <p className="muted">Every mentor file, rendered right here — plans, syllabus, projects, trackers and resources.</p>
      </header>

      <div className="library-layout">
        <aside className="lib-side">
          {GROUPS.map((g) => (
            <div key={g} className="lib-group">
              <h3>{g}</h3>
              {MENTOR_FILES.filter((f) => f.group === g).map((f) => (
                <a key={f.file} href={`#/library/${f.file}`} className={'lib-item' + (f.file === activeFile ? ' active' : '')}>
                  <span className="lib-icon">{f.icon}</span>
                  <span>{f.label}</span>
                </a>
              ))}
            </div>
          ))}
        </aside>

        <section className="lib-main card">
          <div className="lib-file-name">{activeFile}</div>
          {loading && <p className="muted">Loading…</p>}
          {error && <p className="muted">⚠️ {error}</p>}
          {!loading && !error && <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />}
        </section>
      </div>
    </div>
  )
}
