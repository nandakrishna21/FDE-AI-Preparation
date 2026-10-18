import { marked } from 'marked'

marked.setOptions({ gfm: true, breaks: false })

export type MentorFile = { file: string; label: string; icon: string; group: 'Plan' | 'Govt' | 'Tech' | 'Trackers' }

export const MENTOR_FILES: MentorFile[] = [
  { file: 'MASTER_ROADMAP.md', label: 'Master Roadmap', icon: '🗺️', group: 'Plan' },
  { file: '60_DAY_PLAN.md', label: '60-Day Plan', icon: '📅', group: 'Plan' },
  { file: 'WEEK_01_PLAN.md', label: 'Week 01 Plan', icon: '🗓️', group: 'Plan' },
  { file: 'DAY_1_ACTION_PLAN.md', label: 'Day 1 Action Plan', icon: '▶️', group: 'Plan' },
  { file: 'DAILY_TASK_TEMPLATE.md', label: 'Daily Task Template', icon: '📋', group: 'Plan' },
  { file: 'GOVT_SYLLABUS_SUMMARY.md', label: 'Govt Syllabus Summary', icon: '🏛️', group: 'Govt' },
  { file: 'TECH_PROJECTS.md', label: 'Tech Projects', icon: '💻', group: 'Tech' },
  { file: 'RESOURCE_HUB.md', label: 'Resource Hub', icon: '🔗', group: 'Tech' },
  { file: 'FREE_RESOURCES.md', label: 'Free YouTube + Sites', icon: '🎓', group: 'Tech' },
  { file: 'PROGRESS_TRACKER.md', label: 'Progress Tracker', icon: '📈', group: 'Trackers' },
  { file: 'ERROR_NOTEBOOK.md', label: 'Error Notebook', icon: '❗', group: 'Trackers' },
  { file: 'WEAK_TOPICS.md', label: 'Weak Topics', icon: '🎯', group: 'Trackers' },
  { file: 'DAILY_LOG.md', label: 'Daily Log', icon: '📓', group: 'Trackers' },
  { file: 'STUDY_RULES.md', label: 'Study Rules', icon: '✅', group: 'Trackers' },
]

export async function loadMarkdown(file: string): Promise<string> {
  const res = await fetch('mentor-files/' + file + '?t=' + Date.now())
  if (!res.ok) throw new Error('File not found (' + res.status + ')')
  return marked.parse((await res.text()).replace(/^\uFEFF/, '')) as string
}
