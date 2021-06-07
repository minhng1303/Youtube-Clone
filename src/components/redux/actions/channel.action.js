import {
  CHANNEL_DETAIL_REQUEST,
  CHANNEL_DETAIL_SUCCESS,
  CHANNEL_DETAIL_FAILED,
  SET_SUBSCRIPTION_STATUS,
} from "../actionTypes";
import request from "../../../api";

const getChannelById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHANNEL_DETAIL_REQUEST,
    });
    const { data } = await request.get("/channels", {
      params: {
        part: "snippet,contentDetails,statistics",
        id: id,
      },
    });
    // console.log(data);
    dispatch({
      type: CHANNEL_DETAIL_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: CHANNEL_DETAIL_FAILED,
      payload: error.response.data,
    });
  }
};

const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().authReducer.accessToken}`,
      },
    });
    // console.log(data);
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export { getChannelById, checkSubscriptionStatus };
