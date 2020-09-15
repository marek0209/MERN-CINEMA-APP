import axios from "axios";
import {
  FETCH_SEANSES_PENDING,
  FETCH_SEANSES_SUCCESS,
  FETCH_SEANSES_ERROR,
  CREATE_SEANSES_SUCCESS,
  CREATE_SEANSES_ERROR,
  UPDATE_SEANSES_SUCCESS,
} from "./types";

//Create and send new seanse to API
export const createSeansesAction = (seanseData, token, history) => (
  dispatch
) => {
  axios
    .post("http://localhost:5000/api/seanses/", seanseData, {
      headers: {
        Authorization: `${token}`,
      },
    })
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        dispatch(createSeansesSuccess(res.data));
        history.push("/seanses");
        return res.data;
      }
    })
    .catch((err) => dispatch(createSeansesError(err)));
};

//Fetch seanses from API
export function fetchSeansesAction() {
  return (dispatch) => {
    dispatch(fetchSeansesPending());
    fetch("http://localhost:5000/api/seanses")
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw res.error;
        } else {
          dispatch(fetchSeansesSuccess(res.data));
          return res.data;
        }
      })
      .catch((error) => {
        dispatch(fetchSeansesError(error));
      });
  };
}

export const updateSeanseAction = (id, bookings, token, history) => (
  dispatch
) => {
  axios
    .put(
      "http://localhost:5000/api/seanses/" + id,
      { bookings: bookings },
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    )
    .then((res) => {
      if (res.error) {
        throw res.error;
      } else {
        dispatch(UpdateSeansesSuccess(res.data));
        history.push("/seanses");
        return res.data;
      }
    })
    .catch((err) => dispatch(createSeansesError(err)));
};

function fetchSeansesPending() {
  return {
    type: FETCH_SEANSES_PENDING,
  };
}

function fetchSeansesSuccess(seanses) {
  return {
    type: FETCH_SEANSES_SUCCESS,
    seanses: seanses,
  };
}

function fetchSeansesError(error) {
  return {
    type: FETCH_SEANSES_ERROR,
    error: error,
  };
}

function createSeansesSuccess(messages) {
  return {
    type: CREATE_SEANSES_SUCCESS,
    messages: messages,
  };
}
function UpdateSeansesSuccess(messages) {
  return {
    type: UPDATE_SEANSES_SUCCESS,
    messages: messages,
  };
}

function createSeansesError(error) {
  return {
    type: CREATE_SEANSES_ERROR,
    error: error,
  };
}
