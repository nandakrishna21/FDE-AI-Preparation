import { useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCurriculum } from '../lib/hooks'
import { BLOCK_TIMES, Day } from '../lib/curriculum'
import { useProgress, toggleTask, toggleDay } from '../lib/store'
import { Bar } from '../components/Metrics'

export default function Lesson() {
  const { n } = useParams()
  const navigate = useNavigate()
  const { days, weeks, error } = useCurriculum()
  const state = useProgress()
  const dayN = Number(n)

  const day: Day | undefined = useMemo(() => days.find((d) => d.n === dayN), [days, dayN])
  const idx = days.findIndex((d) => d.n === dayN)
  const prev = idx > 0 ? days[idx - 1] : undefined
  const next = idx >= 0 && idx < days.length - 1 ? days[idx + 1] : undefined

  if (error) return <div className="card">⚠️ {error}</div>
  if (!weeks) return <div className="loading">Loading lesson…</div>
  if (!day) return <div className="card">Day {n} not found. <a href="#/roadmap">Back to roadmap</a></div>

  const doneCount = day.tasks.filter((t) => state.tasks[`d${day.n}${t.block.toLowerCase()}`]).length
  const complete = !!state.days[day.n]

  const studyFiles =
    day.tasks.length === 0
      ? []
      : [
          { file: '60_DAY_PLAN.md', label: '📅 Full 60-Day Plan' },
          { file: 'TECH_PROJECTS.md', label: '💻 Tech Projects' },
          { file: 'RESOURCE_HUB.md', label: '🔗 Resource Hub' },
          { file: 'FREE_RESOURCES.md', label: '🎓 Free Video + Sites' },
          { file: 'GOVT_SYLLABUS_SUMMARY.md', label: '🏛️ Govt Syllabus' },
        ]

  return (
    <div className="page lesson">
      <button className="back-link" onClick={() => navigate('/roadmap')}>
        ← Back to roadmap
      </button>

      <header className="page-head">
        <div className="chips">
          <span className="chip">Week {day.week}</span>
          <span className="chip">Day {day.n}</span>
          {complete && <span className="chip chip-win">✅ Completed</span>}
        </div>
        <h1>Day {day.n} — {day.title}</h1>
        <div className="lesson-progress">
          <span>{doneCount}/{day.tasks.length} tasks</span>
          <Bar value={day.tasks.length ? doneCount / day.tasks.length : 0} />
        </div>
      </header>

      <section className="card">
        <h2>Today's tasks</h2>
        <div className="task-list">
          {day.tasks.map((t, i) => {
            const key = `d${day.n}${t.block.toLowerCase()}`
            const on = !!state.tasks[key]
            const meta = BLOCK_TIMES[t.block]
            return (
              <label className={'task ' + (on ? 'on ' : '') + 'track-' + (meta?.track ?? 'tech')} key={key + i}>
                <input type="checkbox" checked={on} onChange={() => toggleTask(key)} />
                <span className="task-body">
                  <span className="task-meta">
                    <b>{t.block}</b> · {meta?.time} · <em>{meta?.label}</em>
                  </span>
                  <span className="task-text">{t.text.replace(/\*\*/g, '')}</span>
                </span>
              </label>
            )
          })}
          {day.tasks.length === 0 && <p className="muted">No parsed tasks for this day.</p>}
        </div>

        <div className="lesson-actions">
          <button className={'btn ' + (complete ? 'btn-ghost' : 'btn-primary')} onClick={() => toggleDay(day.n)}>
            {complete ? '↩ Mark as not done' : '✅ Mark day complete (+20 XP)'}
          </button>
        </div>
      </section>

      <div className="grid-2">
        <section className="card">
          <h2>Study materials</h2>
          <div className="file-buttons">
            {studyFiles.map((f) => (
              <a key={f.file} className="btn btn-ghost btn-sm" target="_blank" rel="noopener" href={`#/library/${f.file}`}>
                {f.label}
              </a>
            ))}
          </div>
        </section>

        <section className="card">
          <h2>Practice now</h2>
          <div className="file-buttons">
            <a className="btn btn-ghost btn-sm" href="#/quiz/quant">🔢 Quant quiz</a>
            <a className="btn btn-ghost btn-sm" href="#/quiz/reasoning">🧩 Reasoning quiz</a>
            <a className="btn btn-ghost btn-sm" href="#/quiz/javascript">🟨 JS quiz</a>
            <a className="btn btn-ghost btn-sm" href="#/practice">💻 Coding exercises</a>
          </div>
        </section>
      </div>

      <nav className="lesson-nav">
        {prev ? <a className="btn btn-ghost" href={`#/day/${prev.n}`}>← Day {prev.n}</a> : <span />}
        {next ? <a className="btn btn-primary" href={`#/day/${next.n}`}>Day {next.n} →</a> : <span />}
      </nav>
    </div>
  )
}
