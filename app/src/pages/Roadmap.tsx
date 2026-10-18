import { useCurriculum } from '../lib/hooks'
import { useProgress } from '../lib/store'
import { Bar } from '../components/Metrics'

export default function Roadmap() {
  const { weeks, error } = useCurriculum()
  const state = useProgress()

  if (error) return <div className="card">⚠️ {error}</div>
  if (!weeks) return <div className="loading">Loading roadmap…</div>

  return (
    <div className="page">
      <header className="page-head">
        <h1>60-Day Roadmap</h1>
        <p className="muted">
          Weeks 1–9, 60 days, 4 blocks per day. Open any day to see its tasks, tick them off, and earn XP.
        </p>
      </header>

      {weeks.map((w) => {
        const done = w.days.filter((d) => state.days[d.n]).length
        return (
          <section key={w.n} className="week-block">
            <div className="week-head">
              <div>
                <h2>
                  Week {w.n} <span className="muted">· Days {w.from}–{w.to}</span>
                </h2>
                <p className="muted">{w.title}</p>
              </div>
              <div className="week-progress">
                <span>
                  {done}/{w.days.length}
                </span>
                <Bar value={w.days.length ? done / w.days.length : 0} tone="primary" />
              </div>
            </div>

            <div className="day-grid">
              {w.days.map((d) => {
                const complete = !!state.days[d.n]
                const ticked = d.tasks.filter((t) => state.tasks[`d${d.n}${t.block.toLowerCase()}`]).length
                return (
                  <a key={d.n} href={`#/day/${d.n}`} className={'day-card' + (state.days[d.n] ? ' win' : '')}>
                    <div className="day-card-top">
                      <span className="day-num">Day {d.n}</span>
                      {state.days[d.n] && <span className="tick">✓</span>}
                    </div>
                    <h3>{d.title}</h3>
                    <div className="day-meta">
                      <span>{d.tasks.length} tasks</span>
                      <span>·</span>
                      <span>{d.tasks.filter((t) => t.block === 'B1' || t.block === 'B3').length} govt</span>
                      <span>·</span>
                      <span>{d.tasks.filter((t) => t.block === 'B2' || t.block === 'B4').length} tech</span>
                    </div>
                    <Bar
                      value={d.tasks.length ? d.tasks.filter((t) => state.tasks[`d${d.n}${t.block.toLowerCase()}`]).length / d.tasks.length : 0}
                      tone={state.days[d.n] ? 'accent' : 'primary'}
                    />
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </div>
  )
}
