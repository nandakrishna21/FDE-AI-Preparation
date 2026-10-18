export type Task = { block: string; text: string }
export type Day = { n: number; title: string; week: number; tasks: Task[] }
export type Week = { n: number; title: string; from: number; to: number; days: Day[] }

let cache: Week[] | null = null
let loadingPromise: Promise<Week[]> | null = null
let pending: Promise<Week[]> | null = null

export function parseCurriculum(text: string): Week[] {
  const weeks: Week[] = []
  let week: Week | null = null
  let day: Day | null = null

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()

    const wm = line.match(/^#\s*Week\s+(\d+)\s*\(Days\s+(\d+)\s*[–-]\s*(\d+)\)\s*[—–-]?\s*(.*)$/)
    if (wm) {
      week = { n: +wm[1], title: (wm[4] || '').trim() || `Week ${wm[1]}`, from: +wm[2], to: +wm[3], days: [] }
      weeks.push(week)
      day = null
      continue
    }

    const dm = line.match(/^###\s*Day\s*(\d+)\s*(?:[—–-]\s*(.*))?$/)
    if (dm) {
      day = { n: +dm[1], title: (dm[2] || '').trim() || `Day ${dm[1]}`, week: week?.n ?? 0, tasks: [] }
      if (week) week.days.push(day)
      continue
    }

    const tm = line.match(/^\|\s*(B[1-4])\s*\|\s*(.+?)\s*\|\s*(?:\[[ xX]\])?\s*\|/)
    if (tm && day) {
      day.tasks.push({ block: tm[1], text: tm[2].replace(/\s*\|\s*$/, '').trim() })
    }
  }

  return weeks
}

export async function loadCurriculum(): Promise<Week[]> {
  if (cache) return cache
  if (!loadingPromise) {
    loadingPromise = (async () => {
      const res = await fetch('mentor-files/60_DAY_PLAN.md')
      if (!res.ok) throw new Error('Could not load 60_DAY_PLAN.md (' + res.status + ')')
      cache = parseCurriculum((await res.text()).replace(/^\uFEFF/, ''))
      return cache
    })()
  }
  return loadingPromise
}

export function flatten(weeks: Week[]): Day[] {
  return weeks.flatMap((w) => w.days)
}

export function findDay(weeks: Week[], n: number): Day | undefined {
  return flatten(weeks).find((d) => d.n === n)
}

export const BLOCK_TIMES: Record<string, { time: string; track: 'govt' | 'tech'; label: string }> = {
  B1: { time: '05:00–08:00', track: 'govt', label: 'Govt Learning' },
  B2: { time: '09:00–12:00', track: 'tech', label: 'Tech Learning + Code' },
  B3: { time: '13:00–15:00', track: 'govt', label: 'Govt Practice + CA' },
  B4: { time: '16:00–18:00', track: 'tech', label: 'Tech Build + Revision' },
}
