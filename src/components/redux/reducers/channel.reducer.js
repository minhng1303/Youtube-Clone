import {
  CHANNEL_DETAIL_REQUEST,
  CHANNEL_DETAIL_SUCCESS,
  CHANNEL_DETAIL_FAILED,
  SET_SUBSCRIPTION_STATUS,
} from "../actionTypes";
export const selectedChannelReducer = (
  state = {
    loading: true,
    channel: {},
    error: null,
    subscriptionStatus: false,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANNEL_DETAIL_REQUEST: {
      return { ...state, loading: true };
    }
    case CHANNEL_DETAIL_SUCCESS: {
      return {
        ...state,
        channel: payload,
        loading: false,
      };
    }
    case CHANNEL_DETAIL_FAILED: {
      return {
        ...state,
        loading: false,
        channel: null,
        error: payload,
      };
    }
    case SET_SUBSCRIPTION_STATUS: {
      return {
        ...state,
        subscriptionStatus: payload,
      };
    }
    default:
      return state;
  }
};
