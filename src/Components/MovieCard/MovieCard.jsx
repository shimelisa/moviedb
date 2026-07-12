import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle, BsCheckCircleFill } from "react-icons/bs";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import styles from "./MovieCard.module.css";
import { useMyList } from "../../Context/MyListContext";
import { useMovieModal } from "../../Context/MovieModalContext";
import { resolveGenres } from "../../Utility/genreMap";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
const FALLBACK_IMAGE = "/fallback-poster.svg";

export const getImageUrl = (path) => {
  if (!path) return FALLBACK_IMAGE;

  // Detect TMDB path: starts with "/" AND has no folder segments
  const isTmdbPath =
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.includes("/assets/") &&
    path.split("/").length === 2; // "/abc.jpg" → ["", "abc.jpg"]

  if (isTmdbPath) {
    return `${IMAGE_BASE}${path}`;
  }

  // Local image import (Vite sometimes returns an object)
  if (typeof path === "object" && path?.default) {
    return path.default;
  }

  // Local string import or full URL
  return path;
};

export default function MovieCard({ movie }) {
  const { isInList, toggleInList } = useMyList();
  const { openMovie } = useMovieModal();

  if (!movie) return null;

  const genres = resolveGenres(movie);
  const inList = isInList(movie);

  const handlePlay = (e) => {
    e.stopPropagation();
    openMovie(movie);
  };

  const handleToggleList = (e) => {
    e.stopPropagation();
    toggleInList(movie);
  };

  const handleMoreInfo = (e) => {
    e.stopPropagation();
    openMovie(movie);
  };

  return (
    <div className={styles.cardWrapper} onClick={() => openMovie(movie)}>
      {/* poster image */}
      <img
        className={styles.poster}
        src={getImageUrl(movie?.poster_path)}
        alt={movie?.title || movie?.original_name || movie?.name || "poster image"}
      />

      {/* hover card */}
      <div className={styles.hoverCard}>
        {/* image */}
        <img
          className={styles.hoverImage}
          src={getImageUrl(movie?.poster_path)}
          alt="hover image"
        />

        {/* badge */}
        <div className={styles.badge}>{movie?.badge || "Recently Added"}</div>

        {/* button rows */}
        <div className={styles.buttonsRow}>
          <button
            className={styles.iconButton}
            onClick={handlePlay}
            title="Play"
            aria-label="Play"
          >
            <FaCirclePlay className={styles.circleButton} color="white" size={40} />
          </button>

          <button
            className={styles.iconButton}
            onClick={handleToggleList}
            title={inList ? "Remove from My List" : "Add to My List"}
            aria-label={inList ? "Remove from My List" : "Add to My List"}
          >
            {inList ? (
              <BsCheckCircleFill className={styles.circleButton} color="#46d369" size={40} />
            ) : (
              <BsPlusCircle className={styles.circleButton} color="white" size={40} />
            )}
          </button>

          <button
            className={`${styles.iconButton} ${styles.pushRight}`}
            onClick={handleMoreInfo}
            title="More info"
            aria-label="More info"
          >
            <IoIosArrowDropdownCircle
              className={styles.circleButtonSmall}
              color="white"
              size={40}
            />
          </button>
        </div>

        {/* metadata rows */}
        <div className={styles.metaRow}>
          <span className={styles.tag}>{movie?.matureRating || "U/A 16+"}</span>
          <span className={styles.tag}>
            {movie?.category || (movie?.name || movie?.first_air_date ? "TV Show" : "Movie")}
          </span>
          <span className={styles.tag}>{movie?.quality || "HD"}</span>
        </div>

        {/* genres */}
        {genres.length > 0 && (
          <div className={styles.genres}>
            {genres.map((g, index) => (
              <span key={g}>
                {g}
                {index < genres.length - 1 && <span className={styles.dot}>•</span>}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
