# README — Netflix Clone

## What this page is

A Netflix-style browsing UI built with React + Vite. It shows movies from two
sources on the same page — a small local/manual movie list, and live data from
TMDB (The Movie Database) — both rendered through the same `<MovieCard />`
component.

You can hover any movie card to Play (opens a details view), add it to **My
List**, or see more info. Use the **My List** button in the header to view
everything you've added — it's saved in your browser, so it's still there
next time you open the page.

## TMDB setup

**TMDB** is a free movie/TV metadata API — posters, backdrops, overviews,
ratings, genres, etc. (no actual video files, metadata only).

You need two things from TMDB, both free:

1. **API Key (v3 auth)** — used as a query parameter (`?api_key=...`)
2. **API Read Access Token (v4 auth)** — a long JWT-style string, used as a
   `Authorization: Bearer ...` header. This project uses the v4 token.

### Getting them
1. Create a free account at https://www.themoviedb.org/signup
2. Go to **Settings → API** → request a free "Developer" API key.
3. On that same page you'll see both the **API Key (v3 auth)** and the
   **API Read Access Token (v4 auth)**. Copy both.

### Where they go in this project
Create a `.env` file at the project root (same folder as `package.json`):

```env
VITE_TMDB_API_KEY=your_v3_api_key_here
VITE_TMDB_ACCESS_TOKEN=your_v4_read_access_token_here
```

## How the two data sources are combined

This project shows movies from **two different sources** on the same page, and
both eventually render through the exact same `<MovieCard />` component:

```
Local file (src/Data/Data.js)          TMDB API (src/Utility/MovieInstance.js)
        │                                          │
        ▼                                          ▼
  moviesManual array                 axios instance with baseURL +
  (plain JS objects,                 Authorization header, called via
  poster_path = imported             requestUrls.js endpoint strings
  local image file)                  (poster_path = TMDB path string
        │                            like "/abc123.jpg")
        └───────────────┬────────────────────────┘
                         ▼
                  <MovieCard movie={movie} />
```

The key trick that makes this work is `getImageUrl()` in `MovieCard.jsx`. It
looks at the shape of `poster_path` — a short string like `/abc123.jpg` means
it's a TMDB path, so it prepends TMDB's image CDN URL; anything else is
treated as an already-usable local image import.

### To add more local movies
Edit `src/Data/Data.js`.

### To add more TMDB categories/rows
Edit `src/Utility/requestUrls.js` to add a new endpoint string, then call it in
`src/Components/DisplayRow/DisplayRow.jsx` and pass the results to another
`<SlideShow />`. See TMDB's docs for available endpoints:
https://developer.themoviedb.org/reference/intro/getting-started

## Search

```js
const res = await movieInstance.get("/search/multi", {
  params: { query, include_adult: false, language: "en-US" },
});
```

`/search/multi` is TMDB's endpoint that searches movies and TV shows together
(that's the "multi" part) and does fuzzy/partial matching — anything with the
search term anywhere in the title gets returned, not just exact matches.

## Rate limits & good practice
- TMDB's free tier is generous but not unlimited — avoid calling the same endpoint
  repeatedly on every render; `DisplayRow.jsx` already fetches once on mount via
  `useEffect(() => { fetchMovies() }, [])`, which is correct.
- Consider caching responses (even something simple like `sessionStorage`) if you
  add features like a details page people might navigate back and forth from.
