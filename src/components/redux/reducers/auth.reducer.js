import {
  LOAD_PROFILE,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOG_OUT,
} from "../actionTypes";

const initialState = {
  accessToken: sessionStorage.getItem("ytc-access-token")
    ? sessionStorage.getItem("ytc-access-token")
    : null,
  user: sessionStorage.getItem("ytc-user")
    ? JSON.parse(sessionStorage.getItem("ytc-user"))
    : null,
  loading: false,
};
export const authReducer = (prevState = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST: {
      return { ...prevState, loading: true };
    }
    case LOGIN_SUCCESS: {
      return {
        ...prevState,
        accessToken: payload,
        loading: false,
      };
    }
    case LOAD_PROFILE: {
      return {
        ...prevState,
        user: payload,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...prevState,
        accessToken: null,
        error: payload,
        loading: false,
      };
    }
    case LOG_OUT: {
      return {
        ...prevState,
        accessToken: null,
        loading: false,
        user: null,
      };
    }
    default: {
      return prevState;
    }
  }
};
