import axios from "axios";
import {
  FETCH_ROOMS_PENDING,
  FETCH_ROOMS_SUCCESS,
  FETCH_ROOMS_ERROR,
  CREATE_ROOMS_SUCCESS,
  CREATE_ROOMS_ERROR,
} from "./types";

export const createRoomsAction = (roomData, token, history) => (dispatch) => {
  axios
    .post("http://localhost:5000/api/rooms/", roomData, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        dispatch(createRoomsSuccess(res.data));
        history.push("/rooms");
        return res.data;
      }
    })
    .catch((err) => dispatch(createRoomsError(err)));
};

//Fetch rooms from API
export function fetchRoomsAction() {
  return (dispatch) => {
    dispatch(fetchRoomsPending());
    fetch("http://localhost:5000/api/rooms")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        } else {
          dispatch(fetchRoomsSuccess(res.data));
          return res.data;
        }
      })
      .catch((error) => {
        dispatch(fetchRoomsError(error));
      });
  };
}

function fetchRoomsPending() {
  return {
    type: FETCH_ROOMS_PENDING,
  };
}

function fetchRoomsSuccess(rooms) {
  return {
    type: FETCH_ROOMS_SUCCESS,
    rooms: rooms,
  };
}

function fetchRoomsError(error) {
  return {
    type: FETCH_ROOMS_ERROR,
    error: error,
  };
}

function createRoomsSuccess(messages) {
  return {
    type: CREATE_ROOMS_SUCCESS,
    messages: messages,
  };
}

function createRoomsError(error) {
  return {
    type: CREATE_ROOMS_ERROR,
    error: error,
  };
}
