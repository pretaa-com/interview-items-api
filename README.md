# Technical Interview: Items API & Structure Comparison

A small full-stack exercise: fix a backend response bug so the frontend works, and implement the array structure-comparison logic used by the API.

---

## Goal

1. **Fix the items API** so the frontend can display the list (the backend currently returns the wrong response key).
2. **Implement `sameStructureAs(thisArray, other)`** so that all unit tests pass and the API returns correct `sameStructure` values.

---

## What’s wrong

- The **frontend** errors when loading items (e.g. “Cannot read property 'map' of undefined”) because it expects a certain response shape.
- The **backend** has:
  - A bug in the JSON response (wrong key name).
  - An incomplete implementation of the structure-comparison used by the API.

---

## Tasks

1. **Fix the backend** so the items response uses the correct key, and the frontend can render the list.
2. **Complete `sameStructureAs(thisArray, other)`** in `backend/src/sameStructureAs.ts` so that:
   - All provided unit tests in `sameStructureAs.test.ts` pass.
   - The API returns correct `sameStructure` values for `POST /api/items`.

---

## Algorithm: same structure

Implement a function (or method) that returns **true** if and only if `other` is an array and has the **same nesting structure and same lengths of nested arrays** as `thisArray`. Element values do not matter; only the shapes of the arrays do.

- **Same structure:** same number of elements at each level, and each element is either both primitives (or non-arrays) or both arrays with the same structure recursively.
- **Not same structure:** different lengths at any level, or one is an array and the other isn’t, or structure/nesting differs.

### Examples

| `thisArray`     | `other`         | Result |
|-----------------|-----------------|--------|
| `[1, 1, 1]`     | `[2, 2, 2]`     | `true` |
| `[1, [1, 1]]`   | `[2, [2, 2]]`   | `true` |
| `[1, [1, 1]]`   | `[[2, 2], 2]`   | `false` (different nesting) |
| `[1, [1, 1]]`   | `[2, [2]]`      | `false` (different inner length) |
| `[[[], []]]`    | `[[[], []]]`    | `true` |
| `[[[], []]]`    | `[[1, 1]]`      | `false` (different structure) |
| `[1, [[[1]]]]`  | `[2, [[[2]]]]`  | `true` |
| `[]`            | `1`             | `false` (other not array) |
| `[]`            | `{}`            | `false` (other not array) |
| `[1, '[', ']']` | `['[', ']', 1]` | `true` (same lengths, no nested arrays) |
| `[1, 2]`        | `[[3], 3]`      | `false` (different structure) |

**Default (Node/Bun):** Implement the algorithm in `backend/src/sameStructureAs.ts` so the backend and full-stack flow work. You can use either a **standalone function** `sameStructureAs(thisArray, other)` (the route already uses this) or the **method** `Array.prototype.sameStructureAs(other)` and have the route call it as `a.sameStructureAs(b)`.

**Alternative algorithm tracks:** If you prefer to implement the same algorithm in another language (without changing the running API), use one of the templates in **`algorithm-templates/`**: Python, Kotlin, Java, C#, Go, Swift, and Rust. Each has a stub and the same 25 test cases; run that language’s tests locally. The main interview flow (fix API key, run backend + frontend) remains Node-based.

---

## How to run

### Backend

```bash
cd backend
npm install
npm run dev
```

Runs at **http://localhost:3001** by default.

- **Tests:** `npm test` (or `npm run test:watch` for watch mode).

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs at **http://localhost:5173**. It proxies `/api` to the backend when using the dev server.

- **Tests:** `npm test` (or `npm run test:watch`).

If the backend runs on a different host/port, set `VITE_API_BASE` (e.g. `VITE_API_BASE=http://localhost:3001`).

### Quick check

1. Start backend and frontend.
2. Open http://localhost:5173 — before your fix, the frontend will error (wrong response key).
3. After fixing the backend response key and implementing `sameStructureAs`, the list should render and show “Structure match: Yes” for the default request. Changing the request to a different-structure pair should yield “Structure does not match” and no list.

---

## API contract

**POST /api/items**

- **Request body:** `{ a: unknown[], b: unknown[] }`
- **Validation:** If `a` or `b` is not an array, responds with `400` and an error message.
- **Success (same structure):** `200` with body: `{ items: Item[], sameStructure: true }` (after you fix the typo).
- **Success (different structure):** `200` with body: `{ sameStructure: false }` (no `items`).

---

## Interview flow (for interviewers)

**📋 For detailed interview instructions, see [INTERVIEW_PROCESS.md](./INTERVIEW_PROCESS.md)**

Quick overview:
1. Candidate clones the repo and runs backend and frontend; sees the frontend error.
2. Candidate finds that the backend returns the wrong key and renames it to `items`; frontend loads.
3. Candidate sees `sameStructureAs` is stubbed; implements it; backend tests pass.
4. Candidate verifies in the UI:
   - Same-structure request shows the list and “Structure match: Yes”.
   - Different-structure request shows “Structure does not match” and no list.
5. Candidate runs `npm run detect` to generate environment metadata, commits all changes, and opens a PR.

---

## Repo layout

- **backend/** — Express + TypeScript, Vitest. Contains `sameStructureAs`, items route, and tests.
- **frontend/** — React (Vite) + TypeScript. Single page that calls the API and displays items and structure match status.
- **algorithm-templates/** — Optional algorithm tracks in Python, Kotlin, Java, C#, Go, Swift, and Rust (stub + tests per language). See `algorithm-templates/README.md` for how to run each.
- **scripts/** — Environment detection script (`detect-environment.js`) for interview metadata collection.

---

## For Interviewers

See **[INTERVIEW_PROCESS.md](./INTERVIEW_PROCESS.md)** for:
- Complete interview flow and instructions
- How to use the environment detection script
- Evaluation criteria and post-interview review process
- Troubleshooting guide
