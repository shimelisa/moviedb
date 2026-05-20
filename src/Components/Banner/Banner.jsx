import React, { useEffect, useState } from "react";
import { Play, Info } from "lucide-react";

import NetflixBannerLogo from "../../assets/image/logo.png";
import TMDBLogo from "../../assets/image/TMDB.svg"

import styles from "./Banner.module.css";
import { movieInstance } from "../../Utility/MovieInstance";
import requests from "../../Utility/requestUrls";

const BANNER_BASE = "https://image.tmdb.org/t/p/original/";

export default function Banner() {
  const [bannerImage, setBannerImage] = useState({});

  useEffect(() => {
    async function fetchBannerImage() {
      const request = await movieInstance.get(requests.fetchNetflixOriginals);
      setBannerImage(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ],
      );
    }
    fetchBannerImage();
  }, []);

  // console.log(bannerImage);
  function truncate(str="", n) {
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div
      className={styles.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${BANNER_BASE}${bannerImage.backdrop_path}")`,
      }}
    >
      <div className={styles.contents}>
        {/* netflix image */}
        <img
          className={styles.logoImage}
          src={NetflixBannerLogo}
          alt="Netflix logo"
        /> <br />
        <img
          className={styles.logoImage}
          src={TMDBLogo}
          alt="TMDB logo"
        />

        {/* title */}
        {/* <h1 className={styles.title}>Bridgerton</h1> */}
        <h1 className={styles.title}>{bannerImage?.original_name}</h1>

        {/* description */}
        <h1 className={styles.description}>
          {/* Shondaland's Emmy-winning series brings Julia Quinn's novels to life,
          as eight siblings seek their perfect match amid London's scandals and
          soirées. */}
          {truncate(bannerImage?.overview, 120)}
        </h1>

        {/* buttons */}
        <div className={styles.buttonContainer}>
          <button className={styles.button}>
            <Play size={30} />
            Play
          </button>
          <button className={styles.button}>
            <Info size={30} />
            My List
          </button>
        </div>
      </div>

      {/* fading */}
      <div className={styles.fadeBottom}></div>
    </div>
  );
}
