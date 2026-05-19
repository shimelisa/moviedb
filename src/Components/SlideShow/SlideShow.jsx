import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import styles from "./SlideShow.module.css";
import MovieCard from "../MovieCard/MovieCard";
// import { moviesManual } from "../../Data/Data";

export default function SlideShow({ title, movies }) {

  // console.log("SlideShow movies:", title, movies);

  return (
    <div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.Row}>
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={10}
          slidesPerView={5.8}
        >
          {movies?.map((movie) => {
            return (
            <SwiperSlide key={movie.id}>
              <MovieCard movie={movie} />
            </SwiperSlide>);
          })}
        </Swiper>
      </div>
    </div>
  );
}
