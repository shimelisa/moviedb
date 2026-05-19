import axios from 'axios'

const movieInstance = axios.create({
      baseURL: "https://api.themoviedb.org/3"
});

export {movieInstance}
// https://api.themoviedb.org/3/account/{account_id}/rated/tv
// https://api.themoviedb.org/3/discover/movie?api_key=865b113325881d72a32c436870a5d6b2&with_genres=99