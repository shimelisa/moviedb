import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";

import { movieInstance } from "../../Utility/MovieInstance";
import { moviesManual } from "../../Data/Data";
import MovieCard from "../MovieCard/MovieCard";
import styles from "../DisplayRow/DisplayRow.module.css";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  // Local input state so this page works as a standalone search box too
  // (e.g. when reached via the header's "Search" nav link with no query yet).
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Keep the input in sync if the URL's ?q= changes from elsewhere
  // (e.g. submitting from the header search box).
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    let isCancelled = false;

    async function search() {
      setLoading(true);
      setError(null);
      try {
        const res = await movieInstance.get("/search/multi", {
          params: { query, include_adult: false, language: "en-US" },
        });

        const tmdbResults = (res.data.results || []).filter(
          (item) => item.media_type === "movie" || item.media_type === "tv"
        );

        const localMatches = moviesManual.filter((m) =>
          m.title.toLowerCase().includes(query.toLowerCase())
        );

        if (!isCancelled) {
          setResults([...localMatches, ...tmdbResults]);
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) setError("Something went wrong while searching TMDB.");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }

    search();
    return () => {
      isCancelled = true;
    };
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    setSearchParams({ q: trimmed });
  };

  return (
    <div className={styles.mainWrapper} style={{ paddingTop: "120px" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          margin: "0 24px 24px",
          maxWidth: "480px",
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies and TV shows"
          style={{
            flex: 1,
            padding: "10px 14px",
            borderRadius: "4px",
            border: "1px solid #555",
            background: "#111",
            color: "white",
            fontSize: "16px",
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 14px",
            borderRadius: "4px",
            border: "none",
            background: "#e50914",
            color: "white",
            cursor: "pointer",
          }}
        >
          <Search size={18} />
        </button>
      </form>

      <h2 className={styles.title}>
        {query ? `Search results for "${query}"` : "Type something to search"}
      </h2>

      {loading && <p style={{ color: "#bbb", padding: "0 24px" }}>Searching…</p>}
      {error && <p style={{ color: "#e50914", padding: "0 24px" }}>{error}</p>}
      {!loading && !error && query && results.length === 0 && (
        <p style={{ color: "#bbb", padding: "0 24px" }}>
          No results found for "{query}".
        </p>
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          padding: "0 24px 40px",
        }}
      >
        {results.map((movie) => (
          <MovieCard key={`${movie.media_type || "local"}-${movie.id}`} movie={movie} />
        ))}
      </div>
    </div>
  );
}
