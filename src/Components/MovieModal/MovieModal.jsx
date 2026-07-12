import React from "react";
import { X, Play, Plus, Check } from "lucide-react";

import styles from "./MovieModal.module.css";
import { useMovieModal } from "../../Context/MovieModalContext";
import { useMyList } from "../../Context/MyListContext";
import { getImageUrl } from "../MovieCard/MovieCard";
import { resolveGenres } from "../../Utility/genreMap";

export default function MovieModal() {
  const { activeMovie, closeMovie } = useMovieModal();
  const { isInList, toggleInList } = useMyList();

  if (!activeMovie) return null;

  const title = activeMovie.title || activeMovie.original_name || activeMovie.name;
  const genres = resolveGenres(activeMovie);
  const inList = isInList(activeMovie);

  return (
    <div className={styles.overlay} onClick={closeMovie}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={closeMovie} aria-label="Close">
          <X size={22} />
        </button>

        <div
          className={styles.hero}
          style={{
            backgroundImage: `url("${getImageUrl(
              activeMovie.backdrop_path || activeMovie.poster_path
            )}")`,
          }}
        >
          <div className={styles.heroFade} />
        </div>

        <div className={styles.body}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.actions}>
            <button
              className={styles.playButton}
              onClick={() => alert(`Playing "${title}"... (demo only, no video source wired up)`)}
            >
              <Play size={18} fill="black" /> Play
            </button>

            <button
              className={styles.iconCircle}
              onClick={() => toggleInList(activeMovie)}
              title={inList ? "Remove from My List" : "Add to My List"}
            >
              {inList ? <Check size={20} /> : <Plus size={20} />}
            </button>
          </div>

          {activeMovie.overview && (
            <p className={styles.overview}>{activeMovie.overview}</p>
          )}

          <div className={styles.metaRow}>
            {activeMovie.vote_average ? (
              <span className={styles.match}>
                {Math.round(activeMovie.vote_average * 10)}% match
              </span>
            ) : null}
            {activeMovie.release_date && <span>{activeMovie.release_date.slice(0, 4)}</span>}
            {activeMovie.first_air_date && <span>{activeMovie.first_air_date.slice(0, 4)}</span>}
            {activeMovie.matureRating && <span>{activeMovie.matureRating}</span>}
          </div>

          {genres.length > 0 && (
            <p className={styles.genres}>
              <span className={styles.genresLabel}>Genres: </span>
              {genres.join(", ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
