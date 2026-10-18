# TECH_PROJECTS.md

# TECH PROJECTS: FDE + AI (From Zero -> Portfolio)

Build in this exact order. Focus on **understand -> code -> debug -> push**. Don't just copy.

**Repo Naming:** `fde-ai-govt-mentor-projects` folder or separate repos. Keep all on GitHub.

---

## PROJECT 1: PROFILE CARD (HTML + CSS)

**Goal:** Get comfortable with HTML structure, CSS styling, Flexbox.

**Time:** 1–2 hours | **Difficulty:** ★☆☆

### Tech
- HTML5, CSS3

### Features
- Photo, Name, Role, Social links
- Centered card using Flexbox
- Clean, minimal UI

### Steps
1. Create `01-profile-card/`
2. `index.html`, `style.css`
3. Use semantic tags (`header`, `main`, `footer`)
4. Style with flexbox, padding, border-radius, box-shadow
5. Make it responsive (basic)

### Checkpoints
- [ ] Code runs in browser
- [ ] Looks centered & clean
- [ ] Pushed to GitHub with README

### Stretch
- [ ] Add hover effect on button
- [ ] Use CSS variables

---

## PROJECT 2: TO-DO APP (JS + DOM + localStorage)

**Goal:** Master JS logic, DOM events, data persistence.

**Time:** 2–3 hours | **Difficulty:** ★☆☆

### Tech
- HTML, CSS, JavaScript

### Features
- Add/Delete/Mark Complete tasks
- Filter: All/Active/Completed
- Persist using `localStorage`
- Empty state message

### Steps
1. Create `02-js-todo/`
2. Build UI: input + button + list
3. Handle events (`click`, `submit`)
4. Use arrays + `render()`
5. Save/load from localStorage
6. Add basic validation

### Checkpoints
- [ ] Add/remove works
- [ ] Toggle complete works
- [ ] Refresh doesn't lose data
- [ ] Clean JS (no clutter)

### Stretch
- [ ] Edit task inline
- [ ] Count pending tasks

---

## PROJECT 3: NOTES APP (React + Vite + TypeScript)

**Goal:** Learn React fundamentals + TypeScript basics.

**Time:** 2–3 hours | **Difficulty:** ★★☆

### Tech
- Vite + React + TypeScript + CSS

### Features
- Add new note (title + content)
- View list + full note
- Delete note
- Save to `localStorage`
- Type-safe with interfaces

### Steps
1. `npm create vite@latest 03-notes-app -- --template react-ts`
2. Define `Note` interface
3. `useState` for notes & form
4. Add, delete handlers
5. useEffect to sync localStorage
6. Basic CSS styling

### Checkpoints
- [ ] No TypeScript errors (`npm run build` clean)
- [ ] CRUD fully working
- [ ] Types used properly
- [ ] README with setup

### Stretch
- [ ] Search/filter notes
- [ ] Color tags

---

## PROJECT 4: FULLSTACK NOTES API + UI (React + Express + SQLite)

**Goal:** Connect frontend to backend. First true fullstack app.

**Time:** 3–4 hours | **Difficulty:** ★★☆

### Tech
- Frontend: React + Vite + TS + `fetch`
- Backend: Node.js + Express + `better-sqlite3` or `sqlite3`
- DB: SQLite

### Features
- REST API: GET/POST/DELETE notes
- React UI calls API
- SQLite table `notes(id, title, content, created_at)`
- CORS setup
- `.env` for PORT

### Folder Structure
```
04-fullstack-notes/
├── client/  (Vite React TS)
└── server/  (Express API)
```

### Backend Steps
1. `npm init -y`, install `express cors better-sqlite3 dotenv nodemon`
2. Create `db.js` + schema
3. Routes: `/api/notes` (GET, POST, DELETE)
4. `server.js` with middleware
5. Test with browser/fetch logic

### Frontend Steps
1. Call `http://localhost:5000/api/notes` with `fetch`
2. Handle loading/empty states
3. Post new note
4. Delete on click

### Checkpoints
- [ ] API returns JSON correctly
- [ ] Frontend shows data
- [ ] Add/Delete syncs
- [ ] Both run together (separately)
- [ ] `.gitignore` has `node_modules`, `.env`

### Stretch
- [ ] Add PUT (edit)
- [ ] Simple validation

---

## PROJECT 5: AI CHATBOT (React + Express + OpenRouter)

**Goal:** First AI-powered app. Learn API keys, prompts, streaming basics.

**Time:** 2–3 hours | **Difficulty:** ★★☆

### Tech
- Frontend: React + TS
- Backend: Express + `fetch`/`axios`
- API: [OpenRouter](https://www.openrouter.ai/)

### Features
- Chat UI (user + bot bubbles)
- Send message to OpenRouter
- Show response
- Keep history in state
- System prompt for friendly tutor
- Loading state

### Backend Steps
1. Route `POST /api/chat`
2. Read `message`, `history` from body
3. Build messages array (system + history + user)
4. Call OpenRouter API with key from `.env`
5. Return `{ reply: ... }`

### Frontend Steps
1. Input + Send + Messages list
2. `useState` for messages, loading
3. `fetch` to backend
4. Auto-scroll to bottom
5. Disable input while loading

### Checkpoints
- [ ] Works with valid key
- [ ] Handles errors gracefully
- [ ] No key exposed in frontend
- [ ] Clean UI
- [ ] README: how to run + get key

### Security
- [ ] `.env` in `.gitignore`
- [ ] Key only in server
- [ ] Never commit `.env`

### Stretch
- [ ] Show model name
- [ ] Clear chat
- [ ] Typing indicator

---

## PROJECT 6: DOCUQ&A – RAG BASICS (Upload + Ask)

**Goal:** Understand RAG idea: chunk -> context -> answer.

**Time:** 2–4 hours | **Difficulty:** ★★★☆

### Tech
- React + Express
- OpenRouter for embeddings + answer (keep simple)
- `multer` for file upload
- `pdf-parse` or plain text (start with `.txt`)

### Features
- Upload `.txt` file
- Extract text -> split into chunks (simple: by newline/size)
- Store chunks in memory (or array)
- Ask question -> send relevant chunks + question to LLM
- Return answer grounded in file

### Simplified Approach (BEGINNER-FRIENDLY)
1. Upload text only first (`.txt`)
2. Split by `\n\n` or 400–600 char chunks
3. On "Ask", build prompt: "Answer ONLY from context. If not found say 'Not found in document'"
4. Send context + question to OpenRouter
5. Show answer

### Steps
1. Backend: `multer` upload -> read file
2. Chunking function
3. `POST /api/upload`, `POST /api/ask`
4. Frontend: upload form + Q&A box

### Checkpoints
- [ ] Upload works
- [ ] Asks from uploaded text
- [ ] Doesn't hallucinate outside file
- [ ] Handles empty query

### Stretch
- [ ] Support `.md` too
- [ ] Show sources (which chunk used) – simple

---

## PROJECT 7: MINI AI TODO ASSISTANT (AGENT BASICS)

**Goal:** Learn "tool use" idea. Agent routes to tools based on user intent.

**Time:** 2–3 hours | **Difficulty:** ★★★☆

### Tech
- React + Express + OpenRouter

### Tools (Simple)
- `add_task(title)`
- `list_tasks()`
- `mark_done(id)`
- `clear_done()`

### How it works
1. User says: "Add buy milk"
2. Send user message + available tools list to LLM with strict instruction
3. LLM returns **JSON**: `{ "tool": "add_task", "args": {"title": "buy milk"} }`
4. Backend executes that tool on in-memory array
5. Return result + updated tasks

### Steps
1. In-memory `tasks = []` with ids
2. Define tool schema in prompt
3. `POST /api/agent` -> classify -> run tool -> respond
4. Frontend: chat + tasks panel

### Checkpoints
- [ ] Adds task from natural language
- [ ] Lists when asked
- [ ] Marks done
- [ ] Doesn't invent tools
- [ ] JSON parsing safe

### Stretch
- [ ] Show reasoning (optional)
- [ ] Handle multi-step? Keep single tool first

---

## MILESTONES

| Milestone | Target | Done? |
|---|---|---|
| **M1** | Project 1–2 done + GitHub updated | [ ] |
| **M2** | Project 3 done (React+TS) | [ ] |
| **M3** | Project 4 done (Fullstack) – MAJOR | [ ] |
| **M4** | Project 5 done (AI Chatbot) | [ ] |
| **M5** | Project 6–7 done + Portfolio polished | [ ] |

**ADVICE:** Build slow. Debug yourself first. Push after every project.

