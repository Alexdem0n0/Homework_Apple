# 📚 Homework Tracker

A tiny home‑screen app for your iPhone to keep track of your homework — by
**subject**, **class** and **due date** — with **photos and files** attached to
each entry. You fill in a quick form, and everything shows up in a tidy list you
can check off.

Everything is stored **privately on your own phone** (nothing is uploaded to any
server), and it **works offline** once installed.

## ✨ What it does

- Add homework with **subject**, **class**, **due / finish‑by date**, and **notes**
- **Attach photos** (from camera or library) and **any files** to each homework
- See a sorted list with **Overdue / Today / Tomorrow** highlighting
- **Check things off** when finished; filter by *To do*, *Done*, or *All*
- **Search** across subjects, classes and notes
- **Backup / Restore** your data as a single file (great before switching phones)

## 📲 How to put it on your iPhone home screen

You have two easy options.

### Option A — Host it free with GitHub Pages (recommended)

This gives you a permanent web link you can open anywhere.

1. On GitHub, open this repository → **Settings** → **Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Pick the branch `claude/iphone-homework-tracker-t4kpil` (or `main` after you
   merge) and the `/ (root)` folder, then **Save**.
4. Wait ~1 minute, then refresh. GitHub shows a link like
   `https://<your-username>.github.io/Homework_Apple/`.
5. Open that link in **Safari** on your iPhone.
6. Tap the **Share** button (the square with an arrow) → **Add to Home Screen** →
   **Add**.
7. Done! Tap the new **Homework** icon on your home screen — it opens full‑screen
   like a real app. 🎉

### Option B — Try it quickly on a computer first

Any static file server works. For example, in this folder run:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (For the home‑screen install
and offline features, use Option A — iPhones need an `https://` link.)

## 🧭 How to use it

- Tap the big **+** button to add homework. Fill in the subject (required), and
  optionally the class, a due date, and notes.
- Tap **📷 Add photo** to snap or pick a picture, or **📎 Add file** to attach a
  document (PDF, etc.). You can add several.
- Tap **Save**.
- In the list, tap the **square** on the left to mark a homework **done**.
- Tap **Edit** to change anything, or **Delete** to remove it.
- Use the **To do / Done / All** chips and the **search box** to find things.
- Tap a photo to view it full size, or a file chip to open/download it.

## 💾 About your data & backups

- Your homework and attachments live in your browser's private storage
  (IndexedDB) **on this device only**. They are not sent anywhere.
- Because it's on‑device, clearing Safari's website data, or deleting the
  home‑screen app, can remove your homework. So every now and then tap
  **⬇︎ Backup (export)** to save a `.json` file (to Files / iCloud). To bring it
  back — for example on a new phone — open the app and tap **⬆︎ Restore (import)**
  and pick that file.

## 🗂 What's in this project

| File | Purpose |
|------|---------|
| `index.html` | The whole app (layout, styling and logic in one file) |
| `manifest.webmanifest` | Makes it installable as a home‑screen app |
| `sw.js` | Service worker so the app works offline |
| `icons/` | The home‑screen app icon in several sizes |

## ❓ FAQ

**Does this need internet?** Only the first time you open the link. After you add
it to your home screen it works offline.

**Is my data private?** Yes — it never leaves your phone.

**Can I use it on Android too?** Yes. Open the link in Chrome and choose
*Add to Home screen*.
