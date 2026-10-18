import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { SUBJECTS } from '../data/quizzes'
import { recordQuiz } from '../lib/store'

export default function QuizRunner() {
  const { id } = useParams()
  const navigate = useNavigate()
  const subject = SUBJECTS.find((s) => s.id === id)

  const questions = useMemo(() => {
    if (!subject) return []
    return [...subject.questions].sort(() => Math.random() - 0.5).slice(0, 10)
  }, [subject])

  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [correct, setCorrect] = useState(0)
  const [finished, setFinished] = useState(false)

  if (!subject) return <div className="card">Quiz not found. <a href="#/quiz">Back</a></div>

  const q = questions[i]
  const total = questions.length
  const scorePct = Math.round((correct / total) * 100)

  function choose(idx: number) {
    if (locked) return
    setPicked(idx)
    setLocked(true)
    if (idx === q.answer) setCorrect((c) => c + 1)
  }

  function nextQ() {
    if (!subject) return
    if (i + 1 >= total) {
      const finalCorrect = correct
      const pct = Math.round((finalCorrect / total) * 100)
      recordQuiz(subject.id, pct, finalCorrect * 10)
      setFinished(true)
      return
    }
    setI((v) => v + 1)
    setPicked(null)
    setLocked(false)
  }

  function restart() {
    setI(0)
    setPicked(null)
    setLocked(false)
    setCorrect(0)
    setFinished(false)
  }

  if (finished) {
    const passed = scorePct >= 70
    return (
      <div className="page quiz-runner">
        <div className="card result-card">
          <div className={'result-emoji ' + (passed ? 'good' : '')}>{passed ? '🎉' : '💪'}</div>
          <h1>{scorePct}%</h1>
          <p className="muted">
            You got {correct} / {total} correct in {subject.label}.
          </p>
          <p className="pill arrow-xp">+{correct * 10} XP earned</p>
          <div className="file-buttons center">
            <button className="btn btn-primary" onClick={restart}>↻ Retry</button>
            <a className="btn btn-ghost" href="#/quiz">Other quizzes</a>
            <a className="btn btn-ghost" href="#/progress">See progress</a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page quiz-runner">
      <button className="back-link" onClick={() => navigate('/quiz')}>← All quizzes</button>
      <div className="quiz-top">
        <span className="chip">{subject.icon} {subject.label}</span>
        <span className="muted">Question {i + 1} / {total}</span>
      </div>
      <div className="bar quiz-bar">
        <div className="bar-fill tone-primary" style={{ width: `${((i + (locked ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <section className="card q-card">
        <h2 className="q-text">{q.q}</h2>
        <div className="options">
          {q.options.map((opt, idx) => {
            let cls = 'option'
            if (locked) {
              if (idx === q.answer) cls += ' correct'
              else if (idx === picked) cls += ' wrong'
            } else if (idx === picked) cls += ' picked'
            return (
              <button key={idx} className={cls} onClick={() => choose(idx)} disabled={locked}>
                <span className="opt-key">{String.fromCharCode(65 + idx)}</span>
                <span>{opt}</span>
              </button>
            )
          })}
        </div>

        {locked && (
          <div className={'explain ' + (picked === q.answer ? 'ok' : 'no')}>
            {picked === q.answer ? '✅ Correct!' : '❌ Not quite.'} <span className="muted">{q.why}</span>
          </div>
        )}

        {locked && (
          <div className="q-actions">
            <button className="btn btn-primary" onClick={nextQ}>
              {i + 1 >= total ? 'See result →' : 'Next question →'}
            </button>
          </div>
        )}
      </section>
    </div>
  )
}
