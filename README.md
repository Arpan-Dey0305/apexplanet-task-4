
# Task 4 — Full Project Implementation

This bundle includes three mini‑projects built with **HTML, CSS, and JavaScript**.

## 1) Personal Portfolio (Multi‑Page)
- Pages: `index.html`, `about.html`, `projects.html`, `contact.html`
- Responsive layout, sticky nav, and a simple contact form (saved to LocalStorage).
- Open: `01_portfolio/index.html`

## 2) To‑Do / Notes App (LocalStorage)
- Add, edit (inline), toggle complete, delete, search, hide completed, clear all.
- Notes area autosaves with debounce.
- Open: `02_todo_notes/index.html`

## 3) Product Listing (Filter + Sort)
- Filters: search, category, min/max price.
- Sort: price (asc/desc), rating (desc).
- Saves filters in LocalStorage and has a reset.

---

### Run locally
Just open the `index.html` files in your browser.
For best results, you can use a tiny server:

```bash
# Python 3
cd 01_portfolio && python -m http.server 8080
```

### Deploy (GitHub Pages)
- Push this folder to a GitHub repo.
- In repo settings, enable **Pages** → deploy from `main` → `/ (root)`.
- The portfolio has links to the other two projects; ensure relative paths remain intact.

Built on 2025-08-20.
