import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./_videoHorizontal.scss";
import { Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
function VideoHorizontal({ video, isSearch, isSub }) {
  const {
    id,
    snippet: {
      channelTitle,
      title,
      publishedAt,
      thumbnails,
      channelId,
      description,
      resourceId,
    },
  } = video;
  const isVideo = !(id.kind === "youtube#channel" || isSub);

  const thumbnail = !isVideo && "videoSidebar__thumbnail-channel";

  const [view, setView] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);

  useEffect(() => {
    const getVideoDetail = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setView(items[0].statistics.viewCount);
    };
    if (isVideo) {
      getVideoDetail(id);
    }
  }, [id, isVideo]);

  useEffect(() => {
    const getChannelIcon = async () => {
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "snippet",
          id: channelId,
        },
      });
      // setChannelIcon(items[0]?.snippet.thumbnails.default.url);
    };
    getChannelIcon();
  }, [channelId]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");

  const history = useHistory();
  const _channelId = resourceId?.channelId || id.channelId;
  const handleClick = (videoId) => {
    isVideo
      ? history.push(`/watch/${id.videoId}`)
      : history.push(`/channel/${_channelId}`);
  };
  return (
    <Row
      className={`videoSidebar ml-1 py-2 ${
        isSearch ? "align-items-start" : "align-items-center"
      }`}
      onClick={() => handleClick(id)}
    >
      <Col
        className="videoSidebar__left px-0"
        xs={6}
        md={isSearch || isSub ? 3 : 5}
      >
        <LazyLoadImage
          src={thumbnails?.medium.url}
          effect="blur"
          className={`videoSidebar__thumbnail ${thumbnail}`}
          wrapperClassName="videoSidebar__thumbnail-wrapper"
        />
        {isVideo && (
          <span className="videoSidebar__duration">{_duration} </span>
        )}
      </Col>
      <Col
        className="videoSidebar__right px-2"
        xs={6}
        md={isSearch || isSub ? 8 : 7}
      >
        <p
          className={`${
            isSearch
              ? "videoSidebar__title-isSearch mb-1"
              : "videoSidebar__title mb-1"
          }`}
        >
          {title}
        </p>
        {isVideo && (
          <div className="videoSidebar__details my-1">
            <AiFillEye /> {numeral(view).format("0.a")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </div>
        )}

        <div className="videoSidebar__channel my-2">
          {isVideo && <LazyLoadImage src={channelIcon} effect="blur" />}
          <span>{channelTitle}</span>
        </div>

        {(isSub || isSearch) && (
          <p className="mt-0 videoSidebar__description">{description}</p>
        )}
        {isSub && <span>{video.contentDetails.totalItemCount} Videos</span>}
      </Col>
    </Row>
  );
}

export default VideoHorizontal;
