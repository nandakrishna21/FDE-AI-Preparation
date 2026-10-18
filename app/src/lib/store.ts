import { useSyncExternalStore } from 'react'

export type QuizRecord = { best: number; last: number; attempts: number; total: number }

export type ProgressState = {
  tasks: Record<string, boolean>
  days: Record<number, boolean>
  exercises: Record<string, boolean>
  quizzes: Record<string, QuizRecord>
  xp: number
  streak: { count: number; last: string }
  name: string
}

const KEY = 'fde-hub-state-v1'

const EMPTY: ProgressState = {
  tasks: {},
  days: {},
  exercises: {},
  quizzes: {},
  xp: 0,
  streak: { count: 0, last: '' },
  name: '',
}

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY, streak: { ...EMPTY.streak } }
    const parsed = JSON.parse(raw)
    return { ...EMPTY, ...parsed, streak: { ...EMPTY.streak, ...(parsed.streak || {}) } }
  } catch {
    return { ...EMPTY, streak: { ...EMPTY.streak } }
  }
}

let state: ProgressState = load()
const listeners = new Set<() => void>()

function emit(patch: Partial<ProgressState>) {
  state = { ...state, ...patch }
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* ignore quota/private-mode errors */
  }
  listeners.forEach((l) => l())
}

export function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function yesterdayKey(): string {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function bumpedStreak(): { count: number; last: string } {
  const t = todayKey()
  if (state.streak.last === t) return state.streak
  const count = state.streak.last === yesterdayKey() ? state.streak.count + 1 : 1
  return { count, last: t }
}

export function addXp(amount: number) {
  emit({ xp: Math.max(0, state.xp + amount), streak: bumpedStreak() })
}

export function toggleTask(key: string, xp = 5) {
  const on = !state.tasks[key]
  emit({
    tasks: { ...state.tasks, [key]: on },
    xp: Math.max(0, state.xp + (on ? xp : -xp)),
    streak: on ? bumpedStreak() : state.streak,
  })
}

export function toggleDay(day: number, xp = 20) {
  const on = !state.days[day]
  emit({
    days: { ...state.days, [day]: on },
    xp: Math.max(0, state.xp + (on ? xp : -xp)),
    streak: on ? bumpedStreak() : state.streak,
  })
}

export function toggleExercise(id: string, xp = 20) {
  const on = !state.exercises[id]
  emit({
    exercises: { ...state.exercises, [id]: on },
    xp: Math.max(0, state.xp + (on ? xp : -xp)),
    streak: on ? bumpedStreak() : state.streak,
  })
}

export function recordQuiz(subject: string, scorePct: number, gainedXp: number) {
  const prev = state.quizzes[subject] || { best: 0, last: 0, attempts: 0, total: 0 }
  const rec: QuizRecord = {
    best: Math.max(prev.best, scorePct),
    last: scorePct,
    attempts: prev.attempts + 1,
    total: prev.total,
  }
  emit({
    quizzes: { ...state.quizzes, [subject]: rec },
    xp: state.xp + gainedXp,
    streak: bumpedStreak(),
  })
}

export function setName(name: string) {
  emit({ name })
}

export function resetAll() {
  state = { ...EMPTY, streak: { ...EMPTY.streak } }
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

export function levelInfo(xp: number) {
  const per = 100
  const level = Math.floor(xp / per) + 1
  return { level, into: xp % per, per, pct: (xp % per) / per }
}

export function getState(): ProgressState {
  return state
}

export function useProgress(): ProgressState {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
    () => state,
  )
}
