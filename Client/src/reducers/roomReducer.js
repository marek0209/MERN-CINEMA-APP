import {
  FETCH_ROOMS_PENDING,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
  CREATE_ROOMS_ERROR,
  CREATE_ROOMS_SUCCESS,
} from "../actions/types";

const initialState = {
  pending: false,
  rooms: [],
  error: null,
  messages: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_ROOMS_PENDING:
      return {
        ...state,
        pending: true,
      };
    case FETCH_ROOMS_SUCCESS:
      return {
        ...state,
        pending: false,
        rooms: action.rooms,
      };
    case FETCH_ROOMS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CREATE_ROOMS_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error,
      };
    case CREATE_ROOMS_SUCCESS:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return state;
  }
}

export const getRooms = (state) => state.rooms;
export const getRoomsPending = (state) => state.pending;
export const getRoomsError = (state) => state.error;
export const getMessages = (state) => state.messages;
