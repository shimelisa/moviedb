import axios from "axios";


// const movieInstance = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
// });

const movieInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  },
});

export { movieInstance };
// https://api.themoviedb.org/3/account/{account_id}/rated/tv
// https://api.themoviedb.org/3/discover/movie?api_key=865b113325881d72a32c436870a5d6b2&with_genres=99
