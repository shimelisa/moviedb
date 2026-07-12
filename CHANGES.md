# Netflix Clone — Review, Fixes & Changes

This document covers everything found in your uploaded project (`netflix_clone_page`),
what was broken, what was changed, and what to do next.

---

## 1. Summary of what was wrong

| # | Issue | Severity |
|---|---|---|
| 1 | **TMDB API key + access token committed in `.env`** and included in the zip you uploaded | 🔴 Security |
| 2 | Movie card buttons (Play, Add to List, More Info) had **no `onClick` handlers at all** | 🔴 Functional |
| 3 | Header **search box didn't do anything** — no submit handler, no results | 🔴 Functional |
| 4 | Header nav links used `<Link href="">` — `react-router-dom`'s `Link` needs a `to` prop, so every nav link and the profile dropdown links (`Account`, `Help Center`) went nowhere | 🔴 Functional |
| 5 | Genres shown on every card were a **hardcoded fake array** (`["Adventure","Action","Thriller"]`) regardless of the actual movie | 🟠 Bug |
| 6 | `getImageUrl()` falls back to `/fallback.jpg`, which **doesn't exist** in `public/` | 🟠 Bug |
| 7 | `Data.js` imports `scream` from `pursuitOfJade.webp` instead of `scream7.webp` (copy-paste bug) | 🟠 Bug |
| 8 | 6 image assets in `src/assets/image` (`hoppers`, `pursuit`, `scream7`, `TheBride`, `vladimir`, `youngSherlock`) were imported in `Data.js` but **never added to the `moviesManual` array** — so they never rendered | 🟠 Bug |
| 9 | CSS typo: `background: O#333;` in `MovieCard.module.css` (invalid color, capital `O` instead of `#`) | 🟡 Cosmetic |
| 9b | `Header.jsx` used `styles.profileDivider`, but `Header.module.css` defines `.profileMenuDivider` — the class name didn't match, so the `<hr>` divider in the profile menu got no styling | 🟡 Cosmetic |
| 10 | `react-router-dom` + `<BrowserRouter>` were installed/wired up but **no `<Routes>` existed** — the router did nothing | 🟡 Functional |
| 11 | `package.json` pins unusually new versions (`react@19.2.6`, `vite@8.0.12`, `eslint@10.3.0`) — double-check these are intentional, they're newer than anything publicly documented as of early 2026 | 🟡 Verify |
| 12 | `DisplayRow.jsx` calls `fetchMovies()` inside `useEffect` before the `const fetchMovies = ...` declaration later in the same function. It happens to work (the function is defined before the effect actually fires after render), but it's flagged by React's lint rules and is fragile / confusing | 🟡 Code quality |

---

## 2. Security — do this first

Your `.env` file contains a **real TMDB API key and read-access token**, and it was
inside the zip you sent me. Two important points:

1. Your `.gitignore` already correctly lists `.env`, so it likely was never pushed to
   GitHub — that part is fine.
2. However, since it left your machine in this upload, treat it as exposed:
   **regenerate/rotate the key in your TMDB account** (Settings → API), then update
   your local `.env` with the new value. It costs nothing and takes two minutes.
3. Never share `.env`, screenshots of it, or paste its contents into a chat, ticket,
   or public repo. Use `.env.example` (see below) to show teammates *which* variables
   are needed without leaking the values.

**New file to add:** `.env.example`

```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_tmdb_v4_read_access_token_here
```

---

## 3. Files changed / added

All fixed files are provided below and also as downloadable files. Paths are
relative to your project root (`netflix_clone_page/`).

### Modified
- `src/App.jsx` — added routing (`/`, `/search`, `/my-list`) and global providers
- `src/Components/Header/Header.jsx` — fixed nav links, working search, working profile menu
- `src/Components/MovieCard/MovieCard.jsx` — wired up Play / Add-to-List / More Info
- `src/Components/MovieCard/MovieCard.module.css` — fixed CSS typo, added button reset styles
- `src/Data/Data.js` — fixed the `scream7` import bug, added the 6 unused local movies

### New
- `src/Context/MyListContext.jsx` — global "My List" state (persisted to `localStorage`)
- `src/Context/MovieModalContext.jsx` — global "which movie's modal is open" state
- `src/Components/MovieModal/MovieModal.jsx` + `.module.css` — the Play/More-Info popup
- `src/Components/SearchResults/SearchResults.jsx` — the `/search` page, calls TMDB's
  `/search/multi` endpoint **and** filters your local `moviesManual` list
- `src/Components/MyList/MyListPage.jsx` — the `/my-list` page
- `src/Utility/genreMap.js` — TMDB genre-id → name lookup, used to show real genres
- `public/fallback-poster.svg` — placeholder image so broken posters don't 404
- `.env.example` — safe template for the two required TMDB env vars

---

## 4. How the button logic now works

| Icon | Behavior |
|---|---|
| ▶️ Play | Opens the movie modal (title, backdrop, overview, rating, genres). There's no real video backend, so the modal's own "Play" button shows a `alert()` placeholder — swap that for your real player/embed when you have one. |
| ➕ / ✅ Add to List | Toggles the movie in and out of "My List", persisted in `localStorage` so it survives a page refresh. Icon swaps from `+` to a green checkmark when added. Visit `/my-list` to see everything you've added. |
| 🔽 More Info | Also opens the movie modal (this is the standard Netflix UX — the down-chevron and the poster both open the details view). |
| 🔍 Header search | Typing and pressing Enter navigates to `/search?q=...`, which queries TMDB's multi-search endpoint and also filters your local movie list. |

State is shared via **React Context** (`MyListContext`, `MovieModalContext`) rather
than local `useState` in each card, because the same "is this in my list" and "which
movie is open" information needs to be visible from any `MovieCard` on the page, the
header, and the modal simultaneously.

---

## 5. Suggestions (not yet implemented — up to you)

1. **Real playback** — right now Play just opens the info modal. If you plan to
   actually stream something, you'll need a `<video>` element or a player library
   (e.g. `video.js`, `hls.js` for HLS streams) and real media URLs — TMDB does not
   host video files itself, only metadata/images and YouTube trailer *keys* via
   `/movie/{id}/videos`. That endpoint is worth adding if you want a "Play Trailer"
   button that embeds the actual YouTube trailer.
2. **Loading & error states** — `DisplayRow.jsx` and `Banner.jsx` don't show a
   spinner or error message while/if the TMDB requests are in flight or fail (e.g.
   if the API key is invalid or rate-limited, the page just silently renders empty
   rows). Worth adding a simple skeleton/loading state.
3. **Pagination / "Load more"** — TMDB list endpoints return 20 results per page;
   currently you only ever request page 1.
4. **Debounce the search input** or add a "search as you type" preview dropdown
   instead of requiring Enter, if you want a more modern feel.
5. **Move `fetchMovies` above the `useEffect`** in `DisplayRow.jsx` (or wrap it in
   `useCallback`) — purely a code-quality nit flagged by `eslint-plugin-react-hooks`,
   not a functional bug.
6. **Double check the dependency versions** in `package.json` — `react@19.2.6`,
   `vite@8.0.12`, `eslint@10.3.0` are newer than what's publicly documented as of
   early 2026. If `npm install` pulled these from a private/local registry that's
   fine, but if you typed exact versions manually, double check them.
7. **Accessibility** — add `alt` text improvements (mostly done), and consider
   trapping focus inside the `MovieModal` and closing it on `Escape` for keyboard
   users.
8. **Genre call could use the live TMDB endpoint** — `genreMap.js` hardcodes TMDB's
   genre IDs, which are stable and rarely change, but if you'd rather always be
   in sync you can fetch `/genre/movie/list` and `/genre/tv/list` once on app load
   and cache the result instead.

---

## 6. Quick setup / testing checklist

1. Copy all files below into the matching paths in your project (overwriting the
   originals for "Modified" files, adding new ones for "New" files).
2. Regenerate your TMDB key (see Security section) and update `.env`.
3. `npm install` (only needed if you don't already have `react-router-dom` — you do).
4. `npm run dev` and check:
   - Home page loads, "Local Movie List" row now shows 15 movies (was 9).
   - Hovering a card and clicking the `+`/`✓` toggles it, and it shows up on `/my-list`.
   - Clicking Play or the down-arrow opens the modal.
   - Typing something in the header search and hitting Enter goes to `/search?q=...`
     and shows results.
   - Nav links ("Home", "My List", "Search") actually navigate now.
