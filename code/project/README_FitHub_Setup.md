# FitHub – Frontend + Flask Backend Setup

This package was prepared from your uploaded archive and reorganized **without changing your existing code**, only moving files into a standard structure.

## Structure
```
fithub_project/
├─ frontend/    # your Vite + React app (moved files only)
└─ backend/     # Flask API skeleton
```

## How to run (development)

### 1) Backend (Flask)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python app.py  # http://127.0.0.1:5000
```

Test: open http://127.0.0.1:5000/api/health → should return a JSON status.

### 2) Frontend (Vite)
```bash
cd frontend
npm install
npm run dev   # http://localhost:8080
```

> If your frontend starts making API calls, use paths like `/api/...` (e.g., `/api/auth/login`).
> To forward those to Flask during development, add this (manually) to your existing `vite.config.ts`:

```ts
server: {
  port: 8080,
  proxy: {
    "/api": {
      target: "http://127.0.0.1:5000",
      changeOrigin: true,
    },
  },
},
```

## Notes
- Your original files have been placed under `frontend/src`. Pages were grouped into:
  - `src/pages/member/`
  - `src/pages/trainer/`
  - `src/pages/` (Index/Auth/NotFound)
  - roots like `main.tsx`, `App.tsx`, `index.css` remain under `src/`
- If any file name had a duplicate on move, a `_dup` suffix was added to avoid overwriting.
- We did **not** edit your code; only moved files into the standard layout. You can continue editing as usual.
