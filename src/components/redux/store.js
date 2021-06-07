import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/auth.reducer";
import {
  getChannelVideosReducer,
  getSubscriptionReducer,
  homeVideosReducer,
  relatedVideoReducer,
  searchVideosReducer,
} from "./reducers/videos.reducer";
import { selectedVideoReducer } from "./reducers/videos.reducer";
import { selectedChannelReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comment.reducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  selectedChannel: selectedChannelReducer,
  commentList: commentListReducer,
  relatedVideo: relatedVideoReducer,
  searchedVideos: searchVideosReducer,
  subscriptionChannel: getSubscriptionReducer,
  channelVideos: getChannelVideosReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
