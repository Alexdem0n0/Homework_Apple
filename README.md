# 👻 Homework Tracker

A slim, offline‑first home‑screen app for tracking homework — by **subject**,
**class**, and **due date** — with **photos and files** attached to each entry.
No account, no backend, no ads: just add it to your phone's home screen and go.

Styled to be minimal on purpose: pure‑black background, faint white grid,
monochrome type, a ghost as the mark. Built with **React** (no build step —
it compiles right in the browser) as a single‑file **Progressive Web App
(PWA)**, so it installs like a real app and works fully offline once loaded.

> This started as a personal project to keep track of college homework, and
> is shared here in case it's useful to anyone else who wants something
> slimmer than a full task‑management app. Feel free to use it, fork it, or
> rip out whatever pieces are useful to you.

## ✨ Features

- **Add homework** with subject, class number/section (free text), due date, and notes
- **Attach photos and files** (camera or library) to any homework entry
- **On‑device OCR** — snap a photo of the board and the app transcribes it to
  text (English + Spanish), with one‑tap **Copy text** and **Download images**
- **Sorted by urgency** automatically — soonest‑due first, done items sink to the bottom
- **Per‑subject colors** — pick a color once and every homework for that subject
  shows in it
- **Real reminders** — adds an event to your phone's **Calendar app** (with
  alerts the day before and the morning it's due), working around the fact that
  browsers can't send background notifications on iOS
- **Calendar view** — a month grid of homework due dates, scoped to semesters you define
- **Weekly class schedule (horario)** — build a fixed weekly timetable
  (including weekends) and **download it as a compact image** to use as a
  home‑screen widget via an app like Widgetsmith
- **Search & filters** — To do / Done / All, plus text search across subjects/classes/notes
- **Backup & restore** — export all your data to one file, import it back (e.g. on a new phone)
- **100% local** — everything is stored on your device only; nothing is ever uploaded anywhere

## 🧱 Tech stack

- **React 18** (via CDN, `<script type="text/babel">` — no bundler, no `npm install`)
- **IndexedDB** for local storage of homework, attachments, semesters, and classes
- **[Tesseract.js](https://github.com/naptha/tesseract.js)** for on‑device OCR (loaded lazily, only when you use the transcribe feature)
- **Canvas 2D API** to render the schedule widget image
- **iCalendar (.ics)** generation for Calendar reminders
- A hand‑rolled **service worker** for offline caching (PWA)

There is no backend, no build pipeline, and no third‑party analytics.

## 📲 Getting started (just want to use it)

### 1. Open the app

Once GitHub Pages is enabled for this repo, the app is available at a URL like:

```
https://<owner>.github.io/Homework_Apple/
```

(Check the repo's **Settings → Pages** for the exact live link, or the
**About** section on the right side of the repo page.)

### 2. Install it on your phone

**iPhone (Safari):**
1. Open the link above in **Safari** (must be Safari, not Chrome or an in‑app browser).
2. Tap the **Share** button → **Add to Home Screen** → **Add**.
3. Open the new icon from your home screen — it launches full‑screen, like a native app.

**Android (Chrome):** open the link → menu (⋮) → **Add to Home screen**.

That's it — no App Store, no account, no install size limits.

## 🛠 Running it yourself / contributing

Because there's no build step, running it locally is just serving static files:

```bash
git clone https://github.com/<owner>/Homework_Apple.git
cd Homework_Apple
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Home‑screen install and
full offline support require `https://`, so use GitHub Pages or another
static host for that.)

**Project structure:**

| File | Purpose |
|------|---------|
| `index.html` | The entire app — layout, styling, and logic (all React components live in one file) |
| `manifest.webmanifest` | PWA manifest (name, icons, theme, display mode) |
| `sw.js` | Service worker for offline caching |
| `icons/` | Home‑screen app icons (the ghost mark) in the required sizes |

**Making changes:** everything is plain JSX inside a single `<script type="text/babel">`
block in `index.html`, transpiled in‑browser by Babel Standalone — edit it like
a normal React file, no build/watch process needed. Bump the `CACHE` version
string at the top of `sw.js` whenever you change `index.html`, so installed
copies pick up the update.

Issues and pull requests are welcome — this is a small personal project, so
please keep contributions focused (bug fixes, small feature additions) rather
than large rewrites.

## 🔒 Privacy — what's public vs. what's private

This repository is public, but **your homework data never is**:

- This repo contains only the **app's source code** — the UI, styling, and logic.
- Everything you enter into the app — homework, notes, due dates, photos,
  files, calendar, and schedule — is stored **locally on your own device**
  (in the browser's IndexedDB), and is never sent to any server.
- Every person who installs the app gets their own **empty, independent**
  local copy. There's no shared database — nobody else can ever see your data.
- The photo‑transcription (OCR) also runs **entirely on your device**; photos
  are never uploaded anywhere, even to transcribe them.
- Because your data lives only on your device, clearing your browser's site
  data (or deleting the home‑screen app) can erase it. Use **⬇︎ Backup (export)**
  regularly to save a `.json` file, and **⬆︎ Restore (import)** to bring it back.

## 🧭 Usage guide

- Tap **+** to add homework — subject is required; class, due date, notes, and
  attachments are optional.
- Tap **📷 Add photo** / **📎 Add file** to attach things; add several if you need to.
- On a saved homework with photos, tap **Transcribe** to run OCR, then
  **Copy all text** or **Download images**.
- Tap the checkbox to mark homework done; **Edit** or **Delete** as needed.
- Use **To do / Done / All** chips and the search box to filter.
- Tap **🔔 Remind me** on a homework (or **🔔 Add to Calendar** for all of them)
  to add reminders to your phone's Calendar app.
- Switch to the **Calendar** tab to see homework due dates on a month grid,
  scoped to semesters you define yourself.
- Switch to the **Schedule** tab to build your fixed weekly class timetable
  (weekdays and weekends), then tap **Download image** to get a widget‑ready PNG.

## ❓ FAQ

**Does this need internet?** Only the first time you open the link (and the
first time you use photo transcription, to download the OCR engine — a few
MB). After that, everything works fully offline.

**Is my data private?** Yes — see the [Privacy](#-privacy--whats-public-vs-whats-private)
section above. Nothing is uploaded, ever.

**Can I use it on Android?** Yes — open the link in Chrome and choose **Add to Home screen**.

**How do notifications work?** iOS doesn't allow web apps to send background
notifications on their own, so reminders go through the **Calendar app**
instead — tap **🔔 Remind me**, confirm adding the event, and your phone will
notify you the day before and the morning it's due, even with the app closed.

**Can I fork this for my own use?** Yes — it's MIT licensed. Fork it, reskin
it, strip out what you don't need.

## 📄 License

[MIT](./LICENSE) — free to use, modify, and share.
