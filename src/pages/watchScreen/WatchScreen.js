import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import VideoMetaData from "../../components/videoMetaData/videoMetaData";
import VideoHorizontal from "../../components/videoHorizontal/videoHorizontal";
import "./_watchScreen.scss";
import CommentList from "../../components/commentList/CommentList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getRelatedVideos,
  getVideoById,
} from "../../components/redux/actions/videos.action";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
function WatchScreen() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { video, loading: relatedVideoLoading } = useSelector(
    (state) => state.selectedVideo
  );
  const { videos, loading } = useSelector((state) => state.relatedVideo);

  useEffect(() => {
    dispatch(getVideoById(id));
    dispatch(getRelatedVideos(id));
  }, [dispatch, id]);

  return (
    <Row>
      <Col lg={8}>
        <div className="watchScreen__player">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${id}`}
            title={video?.snippet?.title}
            frameBorder="none"
            allowFullScreen={true}
          ></iframe>
        </div>
        {!loading ? (
          <VideoMetaData video={video} videoId={id} />
        ) : (
          <h2> Loading...</h2>
        )}
        <CommentList
          totalComments={video?.statistics?.commentCount}
          videoId={id}
        />
      </Col>
      <Col lg={4}>
        {!relatedVideoLoading ? (
          videos
            ?.filter((video) => video.snippet)
            .map((video) => {
              return <VideoHorizontal video={video} key={video?.id?.videoId} />;
            })
        ) : (
          <SkeletonTheme color="#343a40" highlightColor="#3c4147">
            <Skeleton width="100%" height="130px" count={15} />
          </SkeletonTheme>
        )}
      </Col>
    </Row>
  );
}

export default WatchScreen;
