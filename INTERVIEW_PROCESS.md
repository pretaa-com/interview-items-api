# Interview Process Guide

This document provides instructions for interviewers conducting the technical interview using this repository.

---

## Overview

This interview has two parts:
1. **Fix a backend API bug** (typo in response key) — *acclimation only*. Get the candidate into the codebase and to a working frontend quickly. **This is not the main evaluation.** Be lenient; if needed, guide them to the solution so they can move on.
2. **Implement the `sameStructureAs` algorithm** — *the real assessment*. This is where you evaluate problem-solving, recursion, and code quality.

**Goal:** Spend minimal time on the typo fix so the candidate can focus on the algorithm. They will work in a branch, commit their progress, and submit via pull request.

---

## Pre-Interview Setup

### 1. Repository Preparation

- Ensure the repository is cloned and ready
- Verify both backend and frontend can run (`npm install` in each directory)
- Test that the frontend shows an error initially (before fixes)
- Confirm all tests are in place

### 2. Share Repository Access

- Provide the candidate with:
  - Repository URL (or access to clone)
  - Instructions to clone and set up locally
  - Any necessary credentials or access tokens

---

## Interview Flow

### Step 1: Initial Setup (5 minutes)

**Instruct the candidate to:**
**Important:** Do **not** provide the candidate with explicit command-line instructions for these steps. This is crucial for assessing their ability to interface with git and their familiarity with standard git workflows.

1. Clone the repository
2. Create a new branch: `git checkout -b candidate/[their-name]`
3. Create an empty commit to timestamp the start:
   ```bash
   git commit --allow-empty -m "Interview start: [timestamp]"
   ```
4. Push the branch: `git push -u origin candidate/[their-name]`

**Purpose:** This creates a clear timestamp of when they started and establishes their branch.

---

### Step 2: Problem Discovery + typo fix (max 10–15 minutes total)

🚨 **This step is acclimation, not the main evaluation.** Get them to the backend algorithm ASAP. 🚨

- **Keep it short:** Do **not** spend more than 10–15 minutes on the frontend error + typo fix combined.
- **Be collaborative:** Encourage open discussion. If they haven’t found the issue (wrong response key) within that window, **guide them directly to the solution** (e.g. point them to the backend route or the typo). Don’t let them spin—the goal is to have them start the algorithm with enough time.
- **No penalty:** The real assessment is `sameStructureAs`. Don’t penalize candidates if React/frontend debugging isn’t their strength; it’s fine if fixing the backend route is collaborative.

**Expected behavior (if they get there on their own):**
- Candidate runs backend and frontend, opens the app, sees an error (e.g. "Cannot read property 'map' of undefined").
- They investigate (console, network tab) and discover the backend returns `itmes` instead of `items`.

**If they’re stuck:** Use light prompts first ("What does the browser console show?" / "What does the API return in the network tab?"). If they’re still stuck as you approach the time limit, point them to `backend/src/routes/items.ts` and the typo so they can fix it and move on.

---

### Step 3: Typo fix (part of Step 2 window — keep brief)

Once the candidate knows the issue (wrong key in the backend response), the fix is straightforward: change `itmes` to `items` in `backend/src/routes/items.ts`. Frontend should then show "Structure match: Yes" and the items list.

- **Keep it brief.** If they need a nudge ("the key name in the JSON is misspelled"), give it. The goal is to have the app working so they can start the algorithm.
- **Optional:** You may suggest they commit this fix before moving on (e.g. `git add backend/src/routes/items.ts` and `git commit -m "Fix typo: itmes -> items"`).

---

### Step 4: Implement `sameStructureAs` (30-45 minutes)

**Expected solution:**
- Candidate examines `backend/src/sameStructureAs.ts` (currently returns `false`)
- Candidate reads the README and test cases
- Candidate implements a recursive algorithm that:
  - Checks if `other` is an array
  - Compares lengths
  - Recursively compares nested arrays
  - Treats all non-arrays (numbers, strings, objects) as equivalent for structure purposes

**What to observe:**
- Do they read the tests first to understand requirements?
- Do they understand the structure-only comparison (values don't matter)?
- Do they handle edge cases (empty arrays, deep nesting, mixed types)?
- Do they test incrementally?
- Code quality: readability, comments, error handling

**Common pitfalls to watch for:**
- Comparing values instead of structure
- Not handling non-array `other` parameter
- Not recursing properly through nested arrays
- Special-casing numbers instead of treating all non-arrays the same

**Guidance if stuck:**
- "What does the first test case tell you about the requirements?"
- "How would you check if two arrays have the same structure?"
- "What happens if one element is an array and the other isn't?"

---

### Step 5: Verification (5-10 minutes)

**Instruct the candidate to:**

1. Run backend tests: `cd backend && npm test`
   - All tests should pass (29 tests total)
2. Test in the UI:
   - Same structure request should show items and "Structure match: Yes"
   - Try a different structure request (e.g., modify `ItemsPage.tsx` temporarily) to see "Structure does not match"
3. Verify edge cases work correctly

**What to observe:**
- Do they run all tests?
- Do they verify the UI works?
- Do they test edge cases?

---

### Step 6: Final Submission (5 minutes)

**Instruct the candidate to:**

1. **Commit all changes:**
   ```bash
   git add .
   git commit -m "Complete implementation: fix typo and implement sameStructureAs"
   ```

2. **Run the environment detection script:**
   ```bash
   npm run detect
   ```
   
   This will:
   - Detect OS, IDE, and AI tooling
   - Generate `interview-metadata.json`
   - Display results in the terminal

3. **Commit the metadata file:**
   ```bash
   git add interview-metadata.json
   git commit -m "Add environment detection metadata"
   ```

4. **Push all commits:**
   ```bash
   git push
   ```

5. **Open a Pull Request:**
   - Create a PR from their branch to main/master
   - Title: "Interview Submission: [Candidate Name]"
   - Include any notes about their approach or challenges

---

## Post-Interview Review

### 1. Review the Code

**Primary focus: `sameStructureAs` implementation**
- ✅ `sameStructureAs` passes all 29 tests
- ✅ Code quality (readability, comments, structure)
- ✅ Edge cases handled (empty arrays, deep nesting, mixed types)
- ✅ No hardcoded or test-specific logic

**Secondary (acclimation):** Typo fix (`itmes` → `items`) should be present; do not weight this heavily in evaluation.

### 2. Review the Environment Detection

**Check `interview-metadata.json` for:**
- **IDE used:** VS Code, Cursor, IntelliJ, etc.
- **AI tooling detected:**
  - `.cursor/` directory → Cursor AI
  - `.cursorrules` → Cursor rules
  - `.github/copilot/` → GitHub Copilot
  - Other indicators
- **Interview-assist / cheat software:** The script checks for known tools that market themselves for use during technical interviews (e.g. Interview Coder, Leetcode Wizard, CodingVeil, LeetPilot, Cluely, CodingInterviewAI). It looks for installed apps (macOS/Windows) and running processes. A hit indicates possible use; review evidence (install path or process line) in the JSON.
- **Git history:** Commit messages, timing, commit count

**Note:** Detection is not exhaustive. Some tools may not be detectable or may use different names. Use this as one data point, not definitive proof.

### 3. Review Git History

**Look for:**
- Initial empty commit (start timestamp)
- Logical commit progression
- Commit messages quality
- Final commit with all changes

### 4. Evaluate the Solution

**Weight the evaluation on the `sameStructureAs` implementation.** The typo fix is acclimation; do not downgrade for needing help there or for weak frontend debugging.

**Scoring considerations (focused on the algorithm):**

**Excellent (4/4):**
- All 29 tests pass
- Clean, readable recursive implementation
- Handles all edge cases (empty arrays, deep nesting, mixed types)
- Good code organization and appropriate comments
- No test-specific hacks

**Good (3/4):**
- All tests pass
- Correct algorithm but could be cleaner
- Most edge cases handled; minor code quality issues

**Fair (2/4):**
- Most tests pass (may miss some edge cases)
- Algorithm works but has structural or clarity issues
- Some hardcoded cases or test-specific logic

**Needs Improvement (1/4):**
- Many tests fail
- Wrong algorithm approach or significant bugs
- Missing core functionality or very poor code quality

---

## Common Issues & Solutions

### Issue: Candidate doesn't see frontend error or can't find the typo

**Possible causes:**
- Backend not running, wrong port/proxy, or browser cache
- They’re not used to frontend debugging (console/network tab)

**Solution:** Give brief prompts (console, network tab, "what key does the API return?"). If they’re still stuck as you approach the 10–15 minute mark, **guide them to the solution** (e.g. point to the backend route or the typo) so they can fix it and start the algorithm. Do not extend this phase; protecting time for `sameStructureAs` is the priority.

### Issue: Tests pass but UI doesn't work

**Possible causes:**
- Typo not fixed
- Frontend not rebuilt
- Caching issues

**Solution:** Verify `items` key in backend response, restart frontend dev server.

### Issue: Some tests fail but solution seems correct

**Possible causes:**
- Edge case not handled (empty arrays, deep nesting)
- Type checking too strict (comparing values instead of structure)
- Off-by-one errors in recursion

**Solution:** Review failing tests, check algorithm logic, verify recursion handles all cases.

### Issue: Environment detection script fails

**Possible causes:**
- Node.js not installed
- Script permissions issue
- Git not initialized

**Solution:** Ensure Node.js 18+ is installed, run `chmod +x scripts/detect-environment.js` if needed, verify git is initialized.

---

## Time Management

**Recommended timeline:**
- **Setup:** ~5 minutes
- **Problem discovery + typo fix (combined):** **max 10–15 minutes** — then guide them if needed so they move on
- **Implement `sameStructureAs`:** **30–45 minutes** (bulk of the interview)
- **Verification:** 5–10 minutes
- **Submission:** ~5 minutes

**Total:** ~60–85 minutes

**Priorities:**
- **Protect time for the algorithm.** If the candidate is still on the frontend/typo after ~15 minutes, guide them to the solution and transition to Step 4.
- If they’re behind later: typo fixed but algorithm incomplete → focus on a working solution (even if not all tests pass). The algorithm is what you’re evaluating.

---

## Questions to Ask (Optional)

During or after the interview, you may ask:

1. **"Walk me through your approach to solving this."**
   - Understand their thought process
   - See if they considered edge cases upfront

2. **"What was the most challenging part?"**
   - Identify areas they struggled with
   - Gauge problem-solving skills

3. **"How would you test this in production?"**
   - Understanding of testing strategies
   - Consideration of real-world scenarios

4. **"What would you improve if you had more time?"**
   - Self-awareness
   - Understanding of code quality

---

## Notes for Interviewers

- **Be lenient on the frontend/typo:** That part is for acclimation. Get the candidate to the backend algorithm quickly; guide them if they’re stuck so the main evaluation has enough time.
- **Be supportive:** This is a learning opportunity, not just an assessment. Allow questions and clarification.
- **Observe process:** For the algorithm, how they reason, test, and iterate is often as important as the final solution.
- **Use detection data wisely:** Environment detection is one signal, not definitive proof of tool usage.
- **Focus on problem-solving:** A candidate who asks good questions and iterates on the algorithm may be stronger than one who gets it right immediately.

---

## Troubleshooting the Detection Script

If `npm run detect` fails:

1. **Check Node.js version:** `node --version` (should be 18+)
2. **Check script exists:** `ls scripts/detect-environment.js`
3. **Check permissions:** `chmod +x scripts/detect-environment.js`
4. **Run directly:** `node scripts/detect-environment.js`
5. **Check output:** Results should be in `interview-metadata.json` in the repo root

The script will still generate output even if some detections fail (they'll be marked as "Unknown").

---

## Appendix: Detection Script Details

The `detect-environment.js` script checks for:

**OS Detection:**
- macOS (via `sw_vers`)
- Linux (via `/etc/os-release` or `uname`)
- Windows (via `systeminfo`)

**IDE Detection:**
- VS Code (`.vscode/`)
- Cursor (`.cursor/`, `.cursorrules`)
- IntelliJ/WebStorm (`.idea/`)
- Sublime Text (`.sublime-project`)
- Vim/Neovim (`.vimrc`, `.nvim/`)
- Editor from `$EDITOR` env var

**AI Tooling Detection:**
- Cursor AI (`.cursor/`, `.cursorrules`)
- GitHub Copilot (`.github/copilot/`)
- Cursor rules (`.cursor/rules/`, `AGENTS.md`)
- Cursor command in PATH
- AI-related npm packages
- Git config AI indicators

**Interview-assist / cheat software detection:**
The script looks for software that is marketed for use during technical coding interviews. It checks:
- **macOS:** `/Applications` and `~/Applications` for app names (e.g. Interview Coder, Leetcode Wizard, CodingVeil, LeetPilot, Cluely, CodingInterviewAI).
- **Windows:** `Program Files`, `Program Files (x86)`, and `%LOCALAPPDATA%` for matching folder names; `tasklist` for running processes.
- **All platforms:** Running processes (`ps aux` on Unix, `tasklist` on Windows) for process names matching these tools.

Detection is best-effort; tool names and install paths may change. Results are written to `interview-metadata.json` under `interviewCheatSoftware`.

**Git Info:**
- Current branch
- Commit count
- Uncommitted changes
- Remote URL

The script outputs a JSON file (`interview-metadata.json`) that can be reviewed alongside the code submission.
