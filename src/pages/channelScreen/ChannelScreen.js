import numeral from "numeral";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getChannelById } from "../../components/redux/actions/channel.action";
import { getVideosByChannel } from "../../components/redux/actions/videos.action";
import Video from "../../components/video/Video";
import "./_channelScreen.scss";

function ChannelScreen() {
  const { channelId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideosByChannel(channelId));
    dispatch(getChannelById(channelId));
  }, [dispatch, channelId]);

  const { videos, loading } = useSelector((state) => state.channelVideos);
  const { snippet, statistics } = useSelector(
    (state) => state.selectedChannel.channel
  );

  return (
    <>
      <div className="px-5 py-4 my-2 d-flex justify-content-between align-items-center channelHeader">
        <div className="d-flex align-items-center">
          <img src={snippet?.thumbnails?.default?.url} alt="avatar" />

          <div className="ml-3 channelHeader__details">
            <h3>{snippet?.title}</h3>
            <span>
              {numeral(statistics?.subscriberCount).format("0.a")} subscribers
            </span>
          </div>
        </div>

        <button>Subscribe</button>
      </div>
      <Container>
        <Row>
          {!loading
            ? videos.map((video) => {
                return (
                  <Col md={4} lg={3}>
                    <Video video={video} isChannel={true} />
                  </Col>
                );
              })
            : [...Array(15)].map(() => {
                return (
                  <Col md={4} lg={3}>
                    <SkeletonTheme color="#343a40" highlightColor="#3c4147">
                      <Skeleton width="100%" height="150px" count={20} />
                    </SkeletonTheme>
                  </Col>
                );
              })}
        </Row>
      </Container>
    </>
  );
}

export default ChannelScreen;
