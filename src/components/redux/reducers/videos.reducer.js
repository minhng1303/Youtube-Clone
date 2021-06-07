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

export const homeVideosReducer = (
  state = {
    videos: [],
    loading: false,
    nextPageToken: null,
    activeCategory: "All",
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case HOME_VIDEO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case HOME_VIDEO_SUCCESS: {
      return {
        ...state,
        videos:
          state.activeCategory === payload.category
            ? [...state.videos, ...payload.videos]
            : payload.videos,
        loading: false,
        nextPageToken: payload.nextPageToken,
        activeCategory: payload.category,
      };
    }
    case HOME_VIDEO_FAIL: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const selectedVideoReducer = (
  state = {
    loading: true,
    video: null,
    error: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SELECTED_VIDEO_REQUEST: {
      return { ...state, loading: true };
    }
    case SELECTED_VIDEO_SUCCESS: {
      return {
        ...state,
        video: payload,
        loading: false,
      };
    }
    case SELECTED_VIDEO_FAILED: {
      return {
        ...state,
        loading: false,
        video: null,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const relatedVideoReducer = (
  state = {
    loading: true,
    videos: [],
    error: null,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case RELATED_VIDEO_REQUEST: {
      return { ...state, loading: true };
    }
    case RELATED_VIDEO_SUCCESS: {
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    }
    case RELATED_VIDEO_FAILED: {
      return {
        ...state,
        loading: false,
        videos: null,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const searchVideosReducer = (
  state = {
    videos: [],
    loading: true,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH_VIDEO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SEARCH_VIDEO_SUCCESS: {
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    }
    case SEARCH_VIDEO_FAILED: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const getSubscriptionReducer = (
  state = {
    videos: [],
    loading: true,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case SUBSCRIPTION_CHANNEL_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case SUBSCRIPTION_CHANNEL_SUCCESS: {
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    }
    case SUBSCRIPTION_CHANNEL_FAILED: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};

export const getChannelVideosReducer = (
  state = {
    videos: [],
    loading: true,
  },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case CHANNEL_VIDEO_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case CHANNEL_VIDEO_SUCCESS: {
      return {
        ...state,
        videos: payload,
        loading: false,
      };
    }
    case CHANNEL_VIDEO_FAILED: {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    }
    default:
      return state;
  }
};
