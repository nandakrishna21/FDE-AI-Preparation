# Tech Projects — From Zero to Portfolio

> Build in order. **Understand → code → debug → push.** Never just copy.
> Each project maps to a real skill and becomes part of your GitHub portfolio.

| # | Project | Stack | Difficulty | Time |
|---|---|---|---|---|
| 1 | Profile Card | HTML + CSS | Easy | 1–2 h |
| 2 | To-Do App | JS + DOM + localStorage | Easy | 2–3 h |
| 3 | Notes App | React + Vite + TS | Medium | 2–3 h |
| 4 | Fullstack Notes | React + Express + SQLite | Medium | 3–4 h |
| 5 | AI Chatbot | React + Express + OpenRouter | Medium | 2–3 h |
| 6 | DocuQ&A (RAG) | React + Express + RAG | Hard | 2–4 h |
| 7 | AI Todo Agent | React + Express + Agent | Hard | 2–3 h |

---

## Project 1 — Profile Card

**Goal:** HTML structure + CSS layout (Flexbox). **Stack:** HTML, CSS.

**Features**
- Photo, name, role, short bio, social links
- Centered card using Flexbox
- Responsive and clean

**Steps**
1. Create folder `01-profile-card/`
2. Add `index.html` + `style.css`
3. Use semantic tags: `header`, `main`, `footer`
4. Style with Flexbox, padding, `border-radius`, `box-shadow`

**Checkpoints**
- [ ] Runs in browser
- [ ] Looks centered & clean
- [ ] Pushed with a README

**Stretch:** hover effect on a button · CSS variables.

---

## Project 2 — To-Do App

**Goal:** JS logic, DOM events, persistence. **Stack:** HTML, CSS, JS.

**Features**
- Add / delete / complete tasks
- Filter: All · Active · Completed
- Save to `localStorage`
- Empty-state message

**Steps**
1. Create `02-js-todo/`
2. Build UI: input + button + list
3. Handle `submit` / `click` events
4. Keep tasks in an array; write a `render()` function
5. Save/load from `localStorage`

**Checkpoints**
- [ ] Add/remove works
- [ ] Toggle complete works
- [ ] Data survives refresh
- [ ] Code is clean, not spaghetti

**Stretch:** inline edit · pending-count badge.

---

## Project 3 — Notes App

**Goal:** React fundamentals + TypeScript. **Stack:** Vite + React + TS.

**Features**
- Add note (title + content)
- List + open + delete
- Save to `localStorage`
- Typed with interfaces

**Steps**
1. `npm create vite@latest 03-notes-app -- --template react-ts`
2. Define a `Note` interface
3. `useState` for notes + form
4. Add / delete handlers
5. `useEffect` to sync `localStorage`

**Checkpoints**
- [ ] `npm run build` has no TS errors
- [ ] Full CRUD works
- [ ] Types used properly
- [ ] README with setup

**Stretch:** search/filter · color tags.

---

## Project 4 — Fullstack Notes (First Real FDE Project)

**Goal:** Connect frontend ↔ backend + DB. **Stack:** React + Express + SQLite.

**Folder Structure**
```text
04-fullstack-notes/
├── client/   (Vite React TS)
└── server/   (Express API)
```

**Backend Steps**
1. `npm init -y` → install `express cors better-sqlite3 dotenv nodemon`
2. `db.js` + table `notes(id, title, content, created_at)`
4. Routes: `GET/POST/DELETE /api/notes`
5. `server.js` with middleware + CORS

**Frontend Steps**
1. Call `http://localhost:5000/api/notes` with `fetch`
3. Handle loading / empty states
4. Post new note / delete on click

**Checkpoints**
- [ ] API returns correct JSON
- [ ] Frontend shows data
- [ ] Add/Delete syncs
- [ ] `.gitignore` excludes `node_modules`, `.env`

**Stretch:** add PUT (edit) · validation.

---

## Project 5 — AI Chatbot

**Goal:** First AI app. LLM API + prompts. **Stack:** React + Express + OpenRouter.

**Features**
- Chat UI (user + bot bubbles)
- Send message → OpenRouter → show reply
- Keep chat history in state
- System prompt (friendly tutor)
- Loading state

**Steps (backend)**
1. Route `POST /api/chat`
2. Read `message` + `history`
3. Build messages array: system + history + user
4. Call OpenRouter with key from `.env`
5. Return `{ reply }`

**Checkpoints**
- [ ] Works with a valid key
- [ ] Errors handled gracefully
- [ ] Key never exposed in frontend
- [ ] README explains setup

**Security**
- [ ] `.env` in `.gitignore`
- [ ] Key only on the server

**Stretch:** typing indicator · clear chat.

---

## Project 6 — DocuQ&A (RAG Basics)

**Goal:** Understand RAG — chunk → context → answer. **Stack:** React + Express.

**Features**
- Upload `.txt` → extract text
- Split text into chunks
- Ask a question → send relevant chunks + question
- Answer grounded **only** in the file

**Simplified approach**
1. Start with `.txt` only
2. Split by `\n\n` or ~500-char chunks
3. Prompt: *"Answer ONLY from the context. If not found, say 'Not found in document'."*
4. Send context + question to the LLM

**Checkpoints**
- [ ] Upload works
- [ ] Answers come from the uploaded text
- [ ] Doesn't hallucinate outside the file

**Stretch:** support `.md` · show which chunk was used.

---

## Project 7 — Mini AI Todo Agent

**Goal:** Tool use / agent basics. **Stack:** React + Express + OpenRouter.

**Tools**
- `add_task(title)`
- `list_tasks()`
- `mark_done(id)`
- `clear_done()`

**How it works**
1. User: *"Add buy milk"*
2. Send message + tool list to LLM with strict instructions
3. LLM returns JSON: `{ "tool": "add_task", "args": { "title": "buy milk" } }`
4. Backend runs the tool on an in-memory list
5. Return result + updated tasks

**Checkpoints**
- [ ] Adds task from natural language
- [ ] Lists / completes on request
- [ ] Never invents tools
- [ ] JSON parsing is safe

---

## Milestones

| Milestone | Target | ✔ |
|---|---|---|
| **M1** | Projects 1–2 + first pushes | [ ] |
| **M2** | Project 3 (React + TS) | [ ] |
| **M3** | Project 4 (Fullstack) — first real FDE app | [ ] |
| **M4** | Project 5 (AI Chatbot) | [ ] |
| **M5** | Projects 6–7 + portfolio polish | [ ] |

> **Golden rule:** a working small project beats a half-finished big one. Ship, then improve.
