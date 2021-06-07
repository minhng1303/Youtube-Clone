import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../comment/Comment";
import { getCommentById, postComment } from "../redux/actions/comment.action";
import "./_commentList.scss";
function CommentList({ videoId, totalComments }) {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.commentList);
  const [text, setText] = useState("");
  useEffect(() => {
    dispatch(getCommentById(videoId));
  }, [videoId, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length === 0) return;
    dispatch(postComment(videoId, text));
    setText("");
  };
  return (
    <div className="comment">
      <p>{totalComments} comments</p>
      <div className="comment__form d-flex w-100 my-2">
        <img
          src="https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png"
          alt="avatar"
          className="rounded-cirlce mr-3"
        />
        <form onSubmit={handleSubmit} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn p-2">Comment</button>
        </form>
      </div>
      <div className="comment__list">
        {comments?.map((comment, index) => {
          return (
            <Comment
              key={index}
              topLevelComment={comment.snippet.topLevelComment}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CommentList;
