import {
  FETCH_SEANSES_PENDING,
  FETCH_SEANSES_SUCCESS,
  FETCH_SEANSES_ERROR,
  CREATE_SEANSES_ERROR,
  CREATE_SEANSES_SUCCESS,
  UPDATE_SEANSES_SUCCESS,
} from "../actions/types";

const initialState = {
  pending: false,
  seanses: [],
  error: null,
  messages: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_SEANSES_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_SEANSES_SUCCESS:
      return {
        ...state,
        pending: false,
        seanses: action.seanses,
      };
    case FETCH_SEANSES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CREATE_SEANSES_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CREATE_SEANSES_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };
    case UPDATE_SEANSES_SUCCESS:
      return { ...state, messages: action.messages };
    default:
      return state;
  }
}

export const getSeanses = (state) => state.seanses;
export const getSeansesPending = (state) => state.pending;
export const getSeansesError = (state) => state.error;
export const getMessages = (state) => state.messages;
