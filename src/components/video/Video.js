import React, { useState, useEffect } from "react";
import { AiFillEye } from "react-icons/ai";
import request from "../../api";
import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "./_video.scss";
import { useHistory } from "react-router";

function Video({ video, isChannel }) {
  const { snippet, id, contentDetails } = video;
  const {
    title,
    thumbnails: { medium },
    channelId,
    publishedAt,
  } = snippet;
  const history = useHistory();
  const _videoId = id?.videoId || contentDetails?.videoId || id;
  const [view, setView] = useState(null);
  const [duration, setDuration] = useState(null);
  const [channelIcon, setChannelIcon] = useState(null);
  const [channelTitle, setChannelTitle] = useState(null);
  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss");
  useEffect(() => {
    const getVideoDetail = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });

      setDuration(items[0].contentDetails.duration);
      setView(items[0].statistics.viewCount);
    };
    getVideoDetail();
  }, [_videoId]);

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
      setChannelTitle(items[0].snippet.title);
      setChannelIcon(items[0].snippet.thumbnails.default.url);
    };
    getChannelIcon();
  }, [channelId]);

  const handleVideoClick = () => {
    history.push(`/watch/${_videoId}`);
  };
  return (
    <div className="video" key={_videoId} onClick={handleVideoClick}>
      <div className="video__top">
        {/* <img src={medium.url} alt="luffy" className="video__top-thumbnail" /> */}
        <LazyLoadImage src={medium.url} effect="blur" />
        <span className="video__top-duration">{_duration} </span>
      </div>
      <div className="video__footer">
        {!isChannel && <LazyLoadImage src={channelIcon} effect="blur" />}

        <div>
          <div className="video__footer-title">{title}</div>

          <span className="video__footer-channel">{channelTitle}</span>
          <div className="video__footer-detail">
            <span>
              <AiFillEye /> {numeral(view).format("0.a")} Views •
              <span> {moment(publishedAt).fromNow()} </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Video;
