import {
  CHANNEL_VIDEO_FAILED,
  CHANNEL_VIDEO_REQUEST,
  CHANNEL_VIDEO_SUCCESS,
  HOME_VIDEO_FAIL,
  HOME_VIDEO_REQUEST,
  HOME_VIDEO_SUCCESS,
  RELATED_VIDEO_FAILED,
  RELATED_VIDEO_REQUEST,
  RELATED_VIDEO_SUCCESS,
  SEARCH_VIDEO_FAILED,
  SEARCH_VIDEO_REQUEST,
  SEARCH_VIDEO_SUCCESS,
  SELECTED_VIDEO_FAILED,
  SELECTED_VIDEO_REQUEST,
  SELECTED_VIDEO_SUCCESS,
  SUBSCRIPTION_CHANNEL_FAILED,
  SUBSCRIPTION_CHANNEL_REQUEST,
  SUBSCRIPTION_CHANNEL_SUCCESS,
} from "../actionTypes";
import request from "../../../api";

const getPopularVideo = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const { data } = await request.get("/videos", {
      params: {
        part: "snippet,contentDetails,statistics",
        chart: "mostPopular",
        regionCode: "VN",
        maxResults: 20,
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    // console.log(data);
    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: "All",
      },
    });
  } catch (error) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

const getVideoByCategory = (keyword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: HOME_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video",
        pageToken: getState().homeVideos.nextPageToken,
      },
    });
    dispatch({
      type: HOME_VIDEO_SUCCESS,
      payload: {
        videos: data.items,
        nextPageToken: data.nextPageToken,
        category: keyword,
      },
    });
  } catch (error) {
    dispatch({
      type: HOME_VIDEO_FAIL,
      payload: error.message,
    });
  }
};

const getVideoById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: SELECTED_VIDEO_REQUEST,
    });
    const { data } = await request("/videos", {
      params: {
        part: "snippet, statistics",
        id: id,
      },
    });
    dispatch({
      type: SELECTED_VIDEO_SUCCESS,
      payload: data.items[0],
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SELECTED_VIDEO_FAILED,
      payload: error.message,
    });
  }
};

const getRelatedVideos = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RELATED_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        relatedToVideoId: id,
        maxResults: 15,
        type: "video",
      },
    });
    dispatch({
      type: RELATED_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: RELATED_VIDEO_FAILED,
      payload: error.response.data.message,
    });
  }
};

const getVideoBySearch = (keyword) => async (dispatch) => {
  try {
    dispatch({
      type: SEARCH_VIDEO_REQUEST,
    });
    const { data } = await request("/search", {
      params: {
        part: "snippet",
        maxResults: 20,
        q: keyword,
        type: "video, channel",
      },
    });
    dispatch({
      type: SEARCH_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_VIDEO_FAILED,
      payload: error.message,
    });
  }
};

const getSubscriptionChannel = (accessToken) => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CHANNEL_REQUEST,
    });

    const { data } = await request.get("/subscriptions", {
      params: {
        part: "snippet, contentDetails",
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(data);
    dispatch({
      type: SUBSCRIPTION_CHANNEL_SUCCESS,
      payload: data.items,
    });
    console.log(data);
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: SUBSCRIPTION_CHANNEL_FAILED,
      payload: error.message,
    });
  }
};

const getVideosByChannel = (channelId) => async (dispatch) => {
  try {
    dispatch({
      type: CHANNEL_VIDEO_REQUEST,
    });
    const {
      data: { items },
    } = await request.get("/channels", {
      params: {
        part: "contentDetails",
        id: channelId,
      },
    });
    const upLoadId = items[0].contentDetails.relatedPlaylists.uploads;

    const { data } = await request.get("/playlistItems", {
      params: {
        part: "snippet,contentDetails",
        playlistId: upLoadId,
        maxResults: 20,
      },
    });
    console.log(data);
    dispatch({
      type: CHANNEL_VIDEO_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: CHANNEL_VIDEO_FAILED,
      payload: error.message,
    });
  }
};

export {
  getPopularVideo,
  getVideoByCategory,
  getVideoById,
  getRelatedVideos,
  getVideoBySearch,
  getSubscriptionChannel,
  getVideosByChannel,
};
