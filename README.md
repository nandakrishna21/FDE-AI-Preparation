# FDE + AI + Govt Exam Preparation

A complete 90-day mentor system for learning **Fullstack Development (FDE) + AI Engineering** from absolute zero while preparing for **SSC CGL, All Bank Exams & UPSC APFC**.

## 🚀 Live Website

**https://nandakrishna21.github.io/FDE-AI-Preparation/**

Deployed automatically from `app/` via GitHub Actions (`.github/workflows/deploy.yml`).

## 📁 What's Inside

### Interactive Learning App (`app/`)
A React + TypeScript + Vite single-page app:
- **Dashboard** — XP, level, streak, today's plan, quick actions
- **Roadmap** — all 9 weeks / 60 days at a glance
- **Lesson** — per-day tasks rendered from `60_DAY_PLAN.md`
- **Quiz** — MCQ practice for 8 subjects (Quant, Reasoning, English, GK, JS, React, Backend, AI)
- **Practice** — 10 runnable JS coding exercises with instant tests
- **Progress** — completion, XP, streak, per-subject quiz scores
- **Library** — all mentor markdown rendered in-app

Run it:

```bash
cd app
bun install
bun run dev      # local dev server
bun run build    # production build -> app/dist
```

### Legacy static site
`index.html`, `files.html`, `style.css`, `docs.css`, `app.js`, `files-app.js`, `theme.js` (kept for reference).

### Mentor Files (`mentor-files/`)
| File | Purpose |
|---|---|
| `MASTER_ROADMAP.md` | Big picture + 90-day plan |
| `RESOURCE_HUB.md` | All free links (Govt + FDE+AI) |
| `FREE_RESOURCES.md` | Free YouTube channels + websites per stack |
| `GOVT_SYLLABUS_SUMMARY.md` | Overlap syllabus for all 3 exams |
| `TECH_PROJECTS.md` | 7 projects with steps |
| `60_DAY_PLAN.md` | Day 1–60 full execution plan |
| `WEEK_01_PLAN.md` | Day 1–7 detailed tasks |
| `DAILY_TASK_TEMPLATE.md` | Reuse every day |
| `PROGRESS_TRACKER.md` | 90-day checklist + streak |
| `ERROR_NOTEBOOK.md` | Mistakes + fixes |
| `WEAK_TOPICS.md` | Priority list |
| `DAILY_LOG.md` | Daily reflection |
| `STUDY_RULES.md` | Consistency rules |
| `DAY_1_ACTION_PLAN.md` | Start now |

## 🎯 Goal

- **Govt Exams:** SSC CGL • All Bank Exams • UPSC APFC
- **Tech:** Vite + React + TypeScript + Node.js + Express + SQLite
- **AI:** Prompting • OpenRouter • RAG • Agents • MCP
- **Time:** 10 hours/day | Learning + Practicing both

## 🌐 Run Locally

```bash
# Option 1: Just open index.html in browser

# Option 2: Local server (Python)
python -m http.server 8000
# Then open http://localhost:8000
```

## 📌 Daily Rule

> **Code daily. Solve MCQs daily. Fix errors same day. Push to GitHub daily.**

---

*"Small steps daily > rare big steps"*
