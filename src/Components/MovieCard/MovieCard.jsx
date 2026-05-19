import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { BsPlusCircle } from "react-icons/bs";
import { GoCheckCircleFill } from "react-icons/go";
import { IoIosArrowDropdownCircle } from "react-icons/io";

import styles from "./MovieCard.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const getImageUrl = (path) => {
  if (!path) return "/fallback.jpg";

  // Detect TMDB path: starts with "/" AND has no folder segments
  const isTmdbPath =
    typeof path === "string" &&
    path.startsWith("/") &&
    !path.includes("/assets/") &&
    path.split("/").length === 2; // "/abc.jpg" → ["", "abc.jpg"]

  if (isTmdbPath) {
    return `${IMAGE_BASE}${path}`;
  }

  // Local image import (Vite/Webpack sometimes returns an object)
  if (typeof path === "object" && path.default) {
    return path.default;
  }

  // Local string import or full URL
  return path;
};



export default function MovieCard({ movie }) {
  let genres = ["Adventure", "Action", "Thriller"];

  return (
    <div className={styles.cardWrapper}>
      {/* poster image */}
      {/* <img
        className={styles.poster}
        src={`${IMAGE_BASE}${movie?.poster_path}`}
        alt="poster image"
      /> */}
      <img
        className={styles.poster}
        src={getImageUrl(movie?.poster_path)}
        alt="poster image"
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
        <div className={styles.badge}>Recently Added</div>

        {/* button rows */}
        <div className={styles.buttonsRow}>
          <FaCirclePlay
            className={styles.circleButton}
            color="white"
            size={40}
          />
          <BsPlusCircle
            className={styles.circleButton}
            color="white"
            size={40}
          />
          <GoCheckCircleFill
            className={styles.circleButton}
            color="white"
            size={40}
          />
          <IoIosArrowDropdownCircle
            className={styles.circleButtonSmall}
            color="white"
            size={40}
          />
        </div>

        {/* metadata rows */}
        <div className={styles.metaRow}>
          <span className={styles.tag}>U/A 16+</span>
          <span className={styles.tag}>Movie</span>
          <span className={styles.tag}>HD</span>
        </div>
        {/* genres */}
        <div className={styles.genres}>
          {genres?.map((g, index) => {
            return (
              <span key={index}>
                {g}
                {index < genres.length - 1 && (
                  <span className={styles.dot}>•</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
