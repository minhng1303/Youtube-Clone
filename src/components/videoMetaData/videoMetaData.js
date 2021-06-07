import moment from "moment";
import numeral from "numeral";
import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import {
  checkSubscriptionStatus,
  getChannelById,
} from "../redux/actions/channel.action";
import { useDispatch, useSelector } from "react-redux";
function VideoMetaData({ video: { snippet, statistics }, videId }) {
  const { publishedAt, title, description, channelId, channelTitle } = snippet;
  const { likeCount, viewCount, dislikeCount } = statistics;

  const dispatch = useDispatch();
  const { snippet: channelSnippet, statistics: channelStatistics } =
    useSelector((state) => state.selectedChannel.channel);
  const { subscriptionStatus } = useSelector(
    (state) => state.selectedChannel.subscriptionStatus
  );

  useEffect(() => {
    dispatch(getChannelById(channelId));
    dispatch(checkSubscriptionStatus(channelId));
  }, [dispatch, channelId]);
  return (
    <div className="videoMeta py-2">
      <div className="videoMeta__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>
          <div className="d-flex align-items-center">
            <span className="mr-2">
              <MdThumbUp size={20} /> {numeral(likeCount).format("0.a")}
            </span>
            <span className="mr-2">
              <MdThumbDown size={20} /> {numeral(dislikeCount).format("0.a")}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMeta__channel">
        <div className="d-flex align-items-center">
          <img
            src={channelSnippet?.thumbnails?.default?.url}
            className="rounded-circle mr-3"
            alt="luffy"
            width={45}
            height={45}
          />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {" "}
              {numeral(channelStatistics?.subscriberCount).format("0.a")}{" "}
              Subscriber
            </span>
          </div>
        </div>
        <button
          className={`btn p-2 m-2 ${
            subscriptionStatus ? "btn-danger" : "btn-secondary"
          }`}
        >
          Subscribed
        </button>
      </div>
      <div className="videoMeta__description ">
        <ShowMoreText
          lines={4}
          more={"SHOW MORE"}
          less={"SHOW LESS"}
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
}

export default VideoMetaData;
