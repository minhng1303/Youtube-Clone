import React, { useEffect } from "react";
import { Container, Col, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CategoryBar from "../../components/categoryBar/CategoryBar";
import {
  getPopularVideo,
  getVideoByCategory,
} from "../../components/redux/actions/videos.action";
import Video from "../../components/video/Video";
import InfiniteScroll from "react-infinite-scroll-component";
import SkeletonVideo from "../../components/skeleton/SkeletonVideo";
function HomeScreen() {
  const dispatch = useDispatch();
  const { videos, activeCategory, loading } = useSelector(
    (state) => state.homeVideos
  );
  useEffect(() => {
    dispatch(getPopularVideo());
  }, [dispatch]);

  const fetchVideos = () => {
    setTimeout(() => {
      if (activeCategory === "All") {
        dispatch(getPopularVideo());
      } else {
        dispatch(getVideoByCategory(activeCategory));
      }
    }, 700);
  };
  return (
    <Container fluid className="mx-0">
      <CategoryBar />
      <InfiniteScroll
        className="d-flex flex-wrap"
        dataLength={videos.length}
        next={fetchVideos}
        hasMore={true}
        loader={<Spinner type="grow" color="danger" />}
      >
        {!loading
          ? videos.map((video) => (
              <Col lg={3} md={4}>
                <Video video={video} key={video.id} />
              </Col>
            ))
          : [...Array(20)].map(() => (
              <Col lg={3} md={4}>
                <SkeletonVideo />
              </Col>
            ))}
      </InfiniteScroll>
    </Container>
  );
}

export default HomeScreen;
