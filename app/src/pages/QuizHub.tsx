import { SUBJECTS } from '../data/quizzes'
import { useProgress } from '../lib/store'

export default function QuizHub() {
  const state = useProgress()
  const groups: Array<'Govt' | 'Tech'> = ['Govt', 'Tech']

  return (
    <div className="page">
      <header className="page-head">
        <h1>Quizzes</h1>
        <p className="muted">Short timed-friendly MCQ sets. Instant feedback, explanations, and XP for every correct answer.</p>
      </header>

      {groups.map((g) => (
        <section key={g} className="quiz-group">
          <h2>{g === 'Govt' ? '🏛️ Govt Exams' : '💻 FDE + AI'}</h2>
          <div className="quiz-grid">
            {SUBJECTS.filter((s) => s.group === g).map((s) => {
              const rec = state.quizzes[s.id]
              return (
                <a key={s.id} className="quiz-card" href={`#/quiz/${s.id}`}>
                  <div className="quiz-icon">{s.icon}</div>
                  <div className="quiz-info">
                    <h3>{s.label}</h3>
                    <p className="muted small">{s.questions.length} questions</p>
                    {rec ? (
                      <span className={'pill-score ' + (rec.best >= 70 ? 'good' : 'avg')}>Best {rec.best}%</span>
                    ) : (
                      <span className="pill-score new">New</span>
                    )}
                  </div>
                  <span className="quiz-go">→</span>
                </a>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
