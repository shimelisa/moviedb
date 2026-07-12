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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMovies = async () => {
    setIsLoading(true);
    setError(null);
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
    } catch (err) {
      console.error(err);
      setError(
        "Couldn't load movies from TMDB. Check your API key in .env and your network connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={styles.mainWrapper}>
      <SlideShow title="Local Movie List" movies={moviesManual} />

      {error && (
        <p style={{ color: "#e87c03", padding: "0 24px", margin: "16px 0" }}>
          {error}{" "}
          <button
            onClick={fetchMovies}
            style={{
              background: "none",
              border: "1px solid #e87c03",
              color: "#e87c03",
              borderRadius: 4,
              padding: "2px 10px",
              cursor: "pointer",
              marginLeft: 8,
            }}
          >
            Retry
          </button>
        </p>
      )}

      {isLoading && !error && (
        <p style={{ color: "#bbb", padding: "0 24px", margin: "16px 0" }}>
          Loading movies…
        </p>
      )}

      {!isLoading && !error && (
        <>
          <SlideShow title="Netflix trending" movies={movies.trending} />
          <SlideShow title="Popular on Netflix" movies={movies.netflixOriginals} />
          <SlideShow title="Action" movies={movies.action} />
          <SlideShow title="Top Rated" movies={movies.topRated} />
          <SlideShow title="Comedy" movies={movies.comedy} />
          <SlideShow title="Horror" movies={movies.horror} />
          <SlideShow title="romance" movies={movies.romance} />
          <SlideShow title="Documentaries" movies={movies.documentaries} />
        </>
      )}
    </div>
  );
}
