# Activity Ledger — Activity Points Management System

A React.js front-end for students to view and manage the activity points they
earn through co-curricular, extra-curricular, technical/professional,
sports, cultural, social service, entrepreneurship and leadership activities.

This is a **front-end-only** application. There is no backend server or
database — all data is read from local JSON files and new submissions are
kept in the browser's `localStorage`, layered on top of the JSON seed data.

## Live demo

- GitHub Pages: `https://aegisms.github.io/activity-points-management-system/`
- Repository: `https://github.com/aegisms/APMS-WP`


## Features

- **Login page** — student login validated against sample credentials in
  `src/data/students.json`.
- **Dashboard** — student name, UID, department, semester, total points
  earned, target points, remaining points, a progress bar and the most
  recent activities.
- **Activity list** — every submitted activity with category, date, points
  claimed, points approved and status, filterable by status and category.
- **Add Activity** — a validated form to submit a new activity (title,
  category, date, description, points claimed). New activities are added
  with a "Pending" status.
- **Activity details** — a dedicated page for a single activity record.
- **Activity categories** — the six supported categories with descriptions
  and a running points total per category.
- **Student profile** — personal details and an overall points summary.

## Sample login credentials

| UID       | Password | Name           |
|-----------|----------|----------------|
| CS21B045  | pass123  | Aditi Nair     |
| EC20B012  | pass456  | Rohan Verma    |
| ME22B078  | pass789  | Sneha Kulkarni |

The login page also has quick-fill buttons for each sample account.

## Tech stack

- [React 19](https://react.dev/) with functional components and hooks
  (`useState`, `useEffect`, `useContext`)
- [React Router](https://reactrouter.com/) (`HashRouter`, nested routes,
  protected routes) — `HashRouter` is used so client-side routes work
  correctly once deployed to GitHub Pages
- [Vite](https://vite.dev/) as the build tool
- Plain CSS (no UI framework) — design tokens in `src/index.css`, layout and
  component styles in `src/App.css`
- JSON files as the only data source (`src/data/*.json`)

## Project structure

```
activity-points-app/
├── src/
│   ├── data/
│   │   ├── students.json       # sample student accounts + profile info
│   │   ├── activities.json     # sample activity records
│   │   └── categories.json     # activity category reference data
│   ├── context/
│   │   ├── AuthContext.jsx     # login/logout + current session
│   │   └── ActivitiesContext.jsx  # activities state (seed + localStorage)
│   ├── components/
│   │   ├── AppLayout.jsx       # sidebar navigation + page outlet
│   │   ├── CategoryChip.jsx
│   │   └── StatusPill.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ActivityList.jsx
│   │   ├── ActivityDetails.jsx
│   │   ├── AddActivity.jsx
│   │   ├── Categories.jsx
│   │   └── Profile.jsx
│   ├── App.jsx                 # routes
│   ├── main.jsx                # entry point
│   ├── index.css               # design tokens / base styles
│   └── App.css                 # layout & component styles
├── index.html
├── vite.config.js
└── package.json
```

## Running the app locally

Requirements: [Node.js](https://nodejs.org/) 18 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173/activity-points-management-system/`)
and log in with one of the sample UID/password pairs above.

```bash
# Production build
npm run build

# Preview the production build locally
npm run preview
```

## Deploying to GitHub Pages

1. Create a GitHub repository, e.g. `activity-points-management-system`, and
   push this project to it.
2. In `vite.config.js`, set `base` to match your repository name:
   ```js
   base: "/activity-points-management-system/",
   ```
3. In `package.json`, set `homepage` to your GitHub Pages URL:
   ```json
   "homepage": "https://<your-github-username>.github.io/activity-points-management-system"
   ```
4. Install dependencies (this project already includes `gh-pages` as a dev
   dependency) and deploy:
   ```bash
   npm install
   npm run deploy
   ```
   This runs `vite build` and pushes the contents of `dist/` to a `gh-pages`
   branch.
5. In the GitHub repository settings, under **Pages**, set the source branch
   to `gh-pages` (this is usually configured automatically the first time
   `gh-pages` deploys).
6. Visit `https://<your-github-username>.github.io/activity-points-management-system/`.

## Notes on data persistence

Since there is no backend, activities you add through the **Add Activity**
form are stored in the browser's `localStorage` (merged with the seed data
from `activities.json`) so they survive page refreshes on the same browser.
Clearing your browser storage, or opening the site in a different browser,
resets the data back to the original JSON sample data.

## Design notes

The interface uses plain, straightforward styling — a simple top navbar,
system fonts (Arial), a light gray/blue color scheme, and basic
bordered boxes and tables. No UI framework or custom fonts are used, so it's
easy to read through the CSS and adjust colors, spacing or layout.
