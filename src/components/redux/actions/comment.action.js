import {
  ADD_COMMENT_FAILED,
  ADD_COMMENT_SUCCESS,
  COMMENT_LIST_FAILED,
  COMMENT_LIST_REQUEST,
  COMMENT_LIST_SUCCESS,
} from "../actionTypes";
import request from "../../../api";

const getCommentById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: COMMENT_LIST_REQUEST,
    });
    const { data } = await request.get("/commentThreads", {
      params: {
        part: "snippet",
        videoId: id,
      },
    });
    console.log(data);
    dispatch({
      type: COMMENT_LIST_SUCCESS,
      payload: data.items,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: COMMENT_LIST_FAILED,
      payload: error.response.data.message,
    });
  }
};

const postComment = (id, text) => async (dispatch, getState) => {
  try {
    const obj = {
      snippet: {
        videoId: id,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    };

    await request.post("/commentThreads", obj, {
      params: {
        part: "snippet",
      },
      headers: {
        Authorization: `Bearer ${getState().authReducer.accessToken}`,
      },
    });
    dispatch({
      type: ADD_COMMENT_SUCCESS,
    });

    setTimeout(() => dispatch(getCommentById(id)), 3000);
  } catch (error) {
    console.log(error);
    dispatch({
      type: ADD_COMMENT_FAILED,
      payload: "message",
    });
  }
};
export { getCommentById, postComment };
