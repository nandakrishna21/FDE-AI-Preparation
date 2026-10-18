import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import { useTheme } from './lib/theme'
import { useProgress, levelInfo } from './lib/store'
import Dashboard from './pages/Dashboard'
import Roadmap from './pages/Roadmap'
import Lesson from './pages/Lesson'
import QuizHub from './pages/QuizHub'
import QuizRunner from './pages/QuizRunner'
import Practice from './pages/Practice'
import ProgressPage from './pages/ProgressPage'
import Library from './pages/Library'

const LINKS = [
  { to: '/', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/roadmap', label: 'Roadmap', icon: '🗺️' },
  { to: '/quiz', label: 'Quizzes', icon: '❓' },
  { to: '/practice', label: 'Practice', icon: '💻' },
  { to: '/progress', label: 'Progress', icon: '📈' },
  { to: '/library', label: 'Library', icon: '📚' },
]

export default function App() {
  const { theme, toggle } = useTheme()
  const state = useProgress()
  const lvl = levelInfo(state.xp)

  return (
    <div className="app">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-badge">🎓</span>
          <span className="brand-text">
            FDE + AI <em>+ Govt</em>
          </span>
        </NavLink>

        <nav className="main-nav">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}>
              <span className="nav-ico">{l.icon}</span>
              <span className="nav-label">{l.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="topbar-right">
          <div className="pill" title="Experience points">
            <span>⭐</span> {state.xp} XP
          </div>
          <div className="level-pill" title={`Level ${lvl.level}`}>Lv {lvl.level}</div>
          <div className="pill streak" title="Day streak">
            🔥 {state.streak.count}
          </div>
          <button className="icon-btn" onClick={toggle} aria-label="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/day/:n" element={<Lesson />} />
          <Route path="/quiz" element={<QuizHub />} />
          <Route path="/quiz/:id" element={<QuizRunner />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:file" element={<Library />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="footer">
        <span>Code daily · Solve daily · Fix errors same day · Push to GitHub daily</span>
      </footer>
    </div>
  )
}
