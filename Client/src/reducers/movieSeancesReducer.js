import {
  FETCH_MOVIE_SEANCES_ERROR,
  FETCH_MOVIE_SEANCES_SUCCESS,
  FETCH_MOVIE_SEANCES_PENDING,
} from "../actions/types";

const initialState = {
  isLoading: false,
  error: null,
  seances: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_MOVIE_SEANCES_PENDING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_MOVIE_SEANCES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        seances: action.seances,
      };
    case FETCH_MOVIE_SEANCES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };

    default:
      return state;
  }
}
