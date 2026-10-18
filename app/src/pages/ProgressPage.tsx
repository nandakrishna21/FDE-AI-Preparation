import { useCurriculum } from '../lib/hooks'
import { flatten } from '../lib/curriculum'
import { useProgress, levelInfo, resetAll } from '../lib/store'
import { Ring, Bar } from '../components/Metrics'
import { EXERCISES } from '../data/exercises'
import { SUBJECTS } from '../data/quizzes'

export default function ProgressPage() {
  const { weeks } = useCurriculum()
  const state = useProgress()
  const lvl = levelInfo(state.xp)

  if (!weeks) return <div className="loading">Loading progress…</div>

  const all = flatten(weeks)
  const doneDays = all.filter((d) => state.days[d.n]).length
  const overall = all.length ? doneDays / all.length : 0
  const solvedEx = EXERCISES.filter((e) => state.exercises[e.id]).length

  const badges = [
    { id: 'first', label: 'First Step', emoji: '👣', earned: doneDays >= 1, desc: 'Complete Day 1' },
    { id: 'week1', label: 'Week 1 Done', emoji: '🚀', earned: doneDays >= 7, desc: 'Finish 7 days' },
    { id: 'half', label: 'Halfway', emoji: '⛰️', earned: doneDays >= 30, desc: 'Complete 30 days' },
    { id: 'finish', label: 'Finisher', emoji: '🏆', earned: doneDays >= 60, desc: 'Complete all 60 days' },
    { id: 'coder', label: 'Coder', emoji: '💻', earned: solvedEx >= 3, desc: 'Solve 3 exercises' },
    { id: 'quizzer', label: 'Quizzer', emoji: '🧠', earned: Object.keys(state.quizzes).length >= 3, desc: 'Take 3 quizzes' },
    { id: 'scholar', label: 'Scholar', emoji: '🎯', earned: Object.values(state.quizzes).some((q) => q.best >= 80), desc: 'Score 80%+ on a quiz' },
    { id: 'streak', label: 'Consistent', emoji: '🔥', earned: state.streak.count >= 3, desc: '3-day streak' },
  ]

  return (
    <div className="page">
      <header className="page-head">
        <h1>Your Progress</h1>
        <p className="muted">Everything you tick off is saved in this browser automatically.</p>
      </header>

      <div className="grid-2 align-center">
        <section className="card center">
          <Ring value={overall} label={`${doneDays}/${all.length}`} sub="Days done" size={150} />
          <p className="muted">Overall completion</p>
        </section>
        <section className="stat-row stat-col">
          <div className="stat"><span className="stat-num">⭐ {state.xp}</span><span className="stat-label">XP</span></div>
          <div className="stat"><span className="stat-num">📈 Lv {lvl.level}</span><span className="stat-label">Level</span></div>
          <div className="stat"><span className="stat-num">🔥 {state.streak.count}</span><span className="stat-label">Streak</span></div>
          <div className="stat"><span className="stat-num">💻 {solvedEx}/{EXERCISES.length}</span><span className="stat-label">Exercises</span></div>
        </section>
      </div>

      <section className="card">
        <h2>Week-by-week</h2>
        <div className="week-bars">
          {weeks.map((w) => {
            const done = w.days.filter((d) => state.days[d.n]).length
            return (
              <div key={w.n} className="week-bar-row">
                <span className="wb-label">W{w.n} · {w.title}</span>
                <Bar value={w.days.length ? done / w.days.length : 0} tone={done === w.days.length ? 'accent' : 'primary'} />
                <span className="wb-count">{done}/{w.days.length}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h2>Quiz mastery</h2>
        <div className="week-bars">
          {SUBJECTS.map((s) => {
            const rec = state.quizzes[s.id]
            return (
              <div key={s.id} className="week-bar-row">
                <span className="wb-label">{s.icon} {s.label}</span>
                <Bar value={(rec?.best ?? 0) / 100} tone="tech" />
                <span className="wb-count">{rec ? rec.best + '%' : '—'}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <h2>Badges</h2>
        <div className="badge-grid">
          {badges.map((b) => (
            <div key={b.id} className={'badge-card ' + (b.earned ? 'earned' : 'locked')}>
              <span className="badge-emoji">{b.emoji}</span>
              <strong>{b.label}</strong>
              <span className="muted small">{b.desc}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="card danger-zone">
        <h2>Reset</h2>
        <p className="muted">Clears all local progress (days, XP, quizzes, code). This cannot be undone.</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            if (confirm('Reset ALL progress? This cannot be undone.')) resetAll()
          }}
        >
          Reset all progress
        </button>
      </section>
    </div>
  )
}
