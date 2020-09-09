import axios from "axios";
import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  CREATE_MOVIES_SUCCESS,
  CREATE_MOVIES_ERROR,
} from "./types";

//Create and send new movie to API
export const createMoviesAction = (movieData, token, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/movies/", movieData, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        dispatch(createMoviesSuccess(res.data));
        history.push("/movies");
        return res.data;
      }
    })
    .catch((err) => dispatch(createMoviesError(err)));
};

//Fetch movies from API
export function fetchMoviesAction() {
  return (dispatch) => {
    dispatch(fetchMoviesPending());
    fetch("http://localhost:5000/api/movies")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        } else {
          dispatch(fetchMoviesSuccess(res.data));
          return res.data;
        }
      })
      .catch((error) => {
        dispatch(fetchMoviesError(error));
      });
  };
}

function fetchMoviesPending() {
  return {
    type: FETCH_MOVIES_PENDING,
  };
}

function fetchMoviesSuccess(movies) {
  return {
    type: FETCH_MOVIES_SUCCESS,
    movies: movies,
  };
}

function fetchMoviesError(error) {
  return {
    type: FETCH_MOVIES_ERROR,
    error: error,
  };
}

function createMoviesSuccess(messages) {
  return {
    type: CREATE_MOVIES_SUCCESS,
    messages: messages,
  };
}

function createMoviesError(error) {
  return {
    type: CREATE_MOVIES_ERROR,
    error: error,
  };
}
