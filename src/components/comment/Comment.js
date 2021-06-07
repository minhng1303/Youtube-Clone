import moment from "moment";
import React from "react";
import "./_comment.scss";
function Comment({ topLevelComment }) {
  const {
    snippet: {
      textDisplay,
      authorDisplayName,
      authorProfileImageUrl,
      likeCount,
      updateAt,
    },
  } = topLevelComment;
  return (
    <div className="comment py-2 align-items-center d-flex ">
      <img
        src={authorProfileImageUrl}
        alt="avatar"
        className="rounded-circle mr-3"
      />
      <div className="comment__body">
        <p className="comment__header mb-1">
          {authorDisplayName} • {moment(updateAt).fromNow()}
        </p>
        <p className="mb-1"> {textDisplay} </p>
      </div>
    </div>
  );
}

export default Comment;
