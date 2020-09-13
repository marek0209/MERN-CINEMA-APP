import axios from "axios";
import {
  FETCH_MOVIE_SEANCES_ERROR,
  FETCH_MOVIE_SEANCES_SUCCESS,
  FETCH_MOVIE_SEANCES_PENDING,
} from "./types";

export function fetchMovieSeancesAction(id) {
  return (dispatch) => {
    dispatch(fetchMovieSeancesPending());
    axios
      .get("http://localhost:5000/api/movies/" + id)
      .then((res) => {
        dispatch(fetchMovieSeanceSuccess(res.data.seances));
      })
      .catch((err) => dispatch(fetchMoviesError(err)));
  };
}

function fetchMovieSeancesPending() {
  return {
    type: FETCH_MOVIE_SEANCES_PENDING,
  };
}

function fetchMovieSeanceSuccess(seances) {
  return {
    type: FETCH_MOVIE_SEANCES_SUCCESS,
    seances: seances,
  };
}

function fetchMoviesError(error) {
  return {
    type: FETCH_MOVIE_SEANCES_ERROR,
    error: error,
  };
}
