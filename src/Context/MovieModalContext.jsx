import React, { createContext, useContext, useState } from "react";

const MovieModalContext = createContext(null);

export function MovieModalProvider({ children }) {
  const [activeMovie, setActiveMovie] = useState(null);

  const openMovie = (movie) => setActiveMovie(movie);
  const closeMovie = () => setActiveMovie(null);

  return (
    <MovieModalContext.Provider value={{ activeMovie, openMovie, closeMovie }}>
      {children}
    </MovieModalContext.Provider>
  );
}

export function useMovieModal() {
  const ctx = useContext(MovieModalContext);
  if (!ctx) {
    throw new Error("useMovieModal must be used within a <MovieModalProvider>");
  }
  return ctx;
}
