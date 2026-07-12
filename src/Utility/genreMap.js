// Static TMDB genre dictionaries.
// TMDB movie/tv genre IDs are stable, so we can hardcode them instead of
// making an extra /genre/movie/list API call on every page load.
// Source: https://developer.themoviedb.org/reference/genre-movie-list

export const MOVIE_GENRES = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const TV_GENRES = {
  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
  37: "Western",
};

/**
 * Resolve human readable genre names for a movie/tv object coming from TMDB.
 * Falls back gracefully if genre_ids is missing (e.g. local/manual movies).
 */
export function resolveGenres(item) {
  if (!item) return [];

  // Local/manual movies already ship with a `genres` array of strings.
  if (Array.isArray(item.genres) && item.genres.length > 0) {
    return item.genres;
  }

  if (Array.isArray(item.genre_ids) && item.genre_ids.length > 0) {
    // TV results (from /discover/tv, /trending/all) have a `name` field,
    // movies have a `title` field. Use that to pick the right dictionary.
    const dict = item.name && !item.title ? TV_GENRES : MOVIE_GENRES;
    return item.genre_ids
      .map((id) => dict[id])
      .filter(Boolean);
  }

  return [];
}
