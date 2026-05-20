import React, { useEffect, useState } from "react";

import SlideShow from "../SlideShow/SlideShow";
import { moviesManual } from "../../Data/Data";
import styles from "./DisplayRow.module.css";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls";

export default function DisplayRow() {
  const [movies, setMovies] = useState({
    trending: [],
    netflixOriginals: [],
    topRated: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentaries: [],
  });
  // console.log("manual:",moviesManual);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const [
        trendingRes,
        netflixRes,
        topRatedRes,
        actionRes,
        comedyRes,
        horrorRes,
        romanceRes,
        docRes,
      ] = await Promise.all([
        movieInstance.get(requests.fetchTrending),
        movieInstance.get(requests.fetchNetflixOriginals),
        movieInstance.get(requests.fetchTopRatedMovies),
        movieInstance.get(requests.fetchActionMovies),
        movieInstance.get(requests.fetchComedyMovies),
        movieInstance.get(requests.fetchHorrorMovies),
        movieInstance.get(requests.fetchRomanceMovies),
        movieInstance.get(requests.fetchDocumentaries),
      ]);

      setMovies({
        trending: trendingRes.data.results,
        netflixOriginals: netflixRes.data.results,
        topRated: topRatedRes.data.results,
        action: actionRes.data.results,
        comedy: comedyRes.data.results,
        horror: horrorRes.data.results,
        romance: romanceRes.data.results,
        documentaries: docRes.data.results,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <SlideShow title="Local Movie List" movies={moviesManual} />
      <SlideShow title="Netflix trending" movies={movies.trending} />
      <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
      <SlideShow title="Action" movies={movies.action} />
      <SlideShow title="Top Rated" movies={movies.topRated} />
      <SlideShow title="Comedy" movies={movies.comedy} />
      <SlideShow title="Horror" movies={movies.horror} />
      <SlideShow title="romance" movies={movies.romance} />
      <SlideShow title="Documentaries" movies={movies.documentaries} />
    </div>
  );
}
