import {
  FETCH_MOVIES_PENDING,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  CREATE_MOVIES_ERROR,
  CREATE_MOVIES_SUCCESS,
} from "../actions/types";

const initialState = {
  pending: false,
  movies: [],
  error: null,
  messages: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIES_PENDING:
      return {
        ...state,
        pending: true,
      };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        pending: false,
        movies: action.movies,
      };
    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CREATE_MOVIES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CREATE_MOVIES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
}

export const getMovies = (state) => state.movies;
export const getMoviesPending = (state) => state.pending;
export const getMoviesError = (state) => state.error;
export const getMessages = (state) => state.messages;
