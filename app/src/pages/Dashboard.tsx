import { useCurriculum } from '../lib/hooks'
import { flatten } from '../lib/curriculum'
import { useProgress, levelInfo } from '../lib/store'
import { Ring, Bar } from '../components/Metrics'

export default function Dashboard() {
  const { weeks, error, days } = useCurriculum()
  const state = useProgress()

  if (error) return <div className="card">⚠️ {error}</div>
  if (!weeks) return <div className="loading">Loading your roadmap…</div>

  const all = flatten(weeks)
  const doneDays = all.filter((d) => state.days[d.n]).length
  const pct = all.length ? doneDays / all.length : 0
  const nextDay = all.find((d) => !state.days[d.n])

  const govtTasks = all.flatMap((d) => d.tasks.filter((t) => t.block === 'B1' || t.block === 'B3'))
  const techTasks = all.flatMap((d) => d.tasks.filter((t) => t.block === 'B2' || t.block === 'B4'))
  const govtDone = all.filter((d) => state.days[d.n]).reduce((n, d) => n + d.tasks.filter((t) => t.block === 'B1' || t.block === 'B3').length, 0)
  const techDone = all.filter((d) => state.days[d.n]).reduce((n, d) => n + d.tasks.filter((t) => t.block === 'B2' || t.block === 'B4').length, 0)

  return (
    <div className="page">
      <section className="dash-hero">
        <div>
          <h1>Welcome back 👋</h1>
          <p className="muted">
            Your full learning system: <strong>Fullstack + AI</strong> combined with <strong>SSC CGL, Bank &amp; UPSC APFC</strong> prep — in one place.
          </p>
          <div className="hero-actions">
            {nextDay ? (
              <a className="btn btn-primary" href={`#/day/${nextDay.n}`}>▶ Continue Day {nextDay.n}</a>
            ) : (
              <span className="badge-win">🏆 All 60 days complete. Outstanding!</span>
            )}
            <a className="btn btn-ghost" href="#/quiz">Take a quiz</a>
            <a className="btn btn-ghost" href="#/practice">Practice code</a>
          </div>
        </div>
        <div className="dash-rings">
          <Ring value={pct} label={`${doneDays}/${all.length}`} sub="Days done" />
        </div>
      </section>

      <section className="stat-row">
        <div className="stat"><span className="stat-num">🔥 {state.streak.count}</span><span className="stat-label">Day streak</span></div>
        <div className="stat"><span className="stat-num">⭐ {state.xp}</span><span className="stat-label">Total XP</span></div>
        <div className="stat"><span className="stat-num">📈 Lv {Math.floor(state.xp / 100) + 1}</span><span className="stat-label">Level</span></div>
        <div className="stat"><span className="stat-num">✅ {doneDays}</span><span className="stat-label">Days completed</span></div>
      </section>

      <div className="grid-2">
        <section className="card">
          <h2>Track progress</h2>
          <div className="track-row">
            <span>🏛️ Govt (Quant · Reasoning · English · GK)</span>
            <Bar value={govtTasks.length ? govtDone / govtTasks.length : 0} tone="govt" />
          </div>
          <div className="track-row">
            <span>💻 Tech (Frontend · Backend · DB · AI)</span>
            <Bar value={techTasks.length ? techDone / techTasks.length : 0} tone="tech" />
          </div>
          <p className="muted small">Progress counts the checklist items you tick off each day.</p>
        </section>

        <section className="card">
          <h2>Recent quiz scores</h2>
          {Object.keys(state.quizzes).length === 0 && <p className="muted">No quizzes taken yet — start one from the Quizzes tab.</p>}
          <ul className="score-list">
            {Object.entries(state.quizzes).map(([id, r]) => (
              <li key={id}><span>{id}</span><span className="score-best">{r.best}%</span></li>
            ))}
          </ul>
          <a className="btn btn-ghost" href="#/quiz">Go to quiz hub →</a>
        </section>
      </div>

      <section className="card">
        <h2>Daily structure — repeat every day</h2>
        <div className="blocks">
          <div className="block b1"><b>B1 · 05:00–08:00</b><span>Govt Learning</span></div>
          <div className="block b2"><b>B2 · 09:00–12:00</b><span>Tech Learning + Coding</span></div>
          <div className="block b3"><b>B3 · 13:00–15:00</b><span>Govt Practice + Current Affairs</span></div>
          <div className="block b4"><b>B4 · 16:00–18:00</b><span>Tech Build + Revision</span></div>
        </div>
      </section>
    </div>
  )
}
