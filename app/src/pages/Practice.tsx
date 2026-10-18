import { useEffect, useMemo, useState } from 'react'
import { EXERCISES } from '../data/exercises'
import { useProgress, toggleExercise } from '../lib/store'

function fnNameOf(starter: string): string {
  const m = starter.match(/function\s+(\w+)/)
  return m ? m[1] : 'solution'
}

type TestResult = { pass: boolean; show: string; got: string }

export default function Practice() {
  const state = useProgress()
  const [activeId, setActiveId] = useState(EXERCISES[0].id)
  const ex = useMemo(() => EXERCISES.find((e) => e.id === activeId)!, [activeId])
  const [code, setCode] = useState('')
  const [results, setResults] = useState<TestResult[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('fde-code-' + ex.id)
    setCode(saved ?? ex.starter)
    setResults(null)
    setError(null)
  }, [ex])

  function persist(next: string) {
    setCode(next)
    try {
      localStorage.setItem('fde-code-' + ex.id, next)
    } catch {
      /* ignore */
    }
  }

  function run() {
    setError(null)
    const name = fnNameOf(ex.starter)
    try {
      const fn = new Function(`${code}\n; return typeof ${name} === 'function' ? ${name} : null;`)() as
        | ((...a: unknown[]) => unknown)
        | null
      if (!fn) {
        setError(`Function "${name}" was not found. Keep the same function name as the starter.`)
        setResults(null)
        return
      }
      const res: TestResult[] = ex.tests.map((t) => {
        try {
          const got = fn(...t.args)
          const pass = JSON.stringify(got) === JSON.stringify(t.expected)
          return { pass, show: t.show, got: JSON.stringify(got) }
        } catch (err) {
          return { pass: false, show: t.show, got: 'threw: ' + String(err) }
        }
      })
      setResults(res)
    } catch (err) {
      setError('Could not run your code: ' + String(err))
      setResults(null)
    }
  }

  const allPass = !!results && results.length > 0 && results.every((r) => r.pass)
  const solved = !!state.exercises[ex.id]
  const solvedCount = EXERCISES.filter((e) => state.exercises[e.id]).length

  return (
    <div className="page practice">
      <header className="page-head">
        <h1>Coding Exercises</h1>
        <p className="muted">
          Write plain JavaScript, run hidden tests in your browser, earn XP. Solved {solvedCount}/{EXERCISES.length}.
        </p>
      </header>

      <div className="practice-layout">
        <aside className="ex-list">
          {EXERCISES.map((e) => (
            <button key={e.id} className={'ex-item' + (e.id === activeId ? ' active' : '')} onClick={() => setActiveId(e.id)}>
              <span className={'dot diff-' + e.difficulty.toLowerCase()} />
              <span className="ex-title">{e.title}</span>
              {state.exercises[e.id] && <span className="tick">✓</span>}
            </button>
          ))}
        </aside>

        <section className="card ex-panel">
          <div className="ex-head">
            <h2>{ex.title}</h2>
            <span className={'diff-badge diff-' + ex.difficulty.toLowerCase()}>{ex.difficulty}</span>
          </div>
          <p>{ex.prompt}</p>

          <textarea
            className="code-editor"
            spellCheck={false}
            value={code}
            onChange={(e) => persist(e.target.value)}
            rows={Math.max(8, code.split('\n').length + 1)}
          />

          <div className="file-buttons">
            <button className="btn btn-primary" onClick={run}>▶ Run tests</button>
            <button className="btn btn-ghost btn-sm" onClick={() => persist(ex.starter)}>↺ Reset code</button>
            <button className={'btn btn-sm ' + (solved ? 'btn-ghost' : 'btn-accent')} onClick={() => toggleExercise(ex.id)}>
              {solved ? '↩ Unmark solved' : '✔ Mark solved (+20 XP)'}
            </button>
          </div>

          <details className="hint">
            <summary>💡 Hint</summary>
            <p>{ex.hint}</p>
          </details>

          {error && <div className="explain no">{error}</div>}

          {results && (
            <div className="test-results">
              <h3>Test results</h3>
              {results.map((r, i) => (
                <div key={i} className={'test ' + (r.pass ? 'pass' : 'fail')}>
                  <span>{r.pass ? '✅' : '❌'} {r.show}</span>
                  {!r.pass && <span className="muted"> got {r.got}</span>}
                </div>
              ))}
              {allPass && (
                <div className="explain ok">
                  🎉 All tests pass! {solved ? '' : 'Mark it solved to bank your XP.'}
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
