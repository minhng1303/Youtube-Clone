import React, { useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import CategoryBar from "../../components/categoryBar/CategoryBar";
import {
  getPopularVideo,
  getVideoByCategory,
} from "../../components/redux/actions/videos.action";
import Video from "../../components/video/Video";
import InfiniteScroll from "react-infinite-scroll-component";
function HomeScreen() {
  const dispatch = useDispatch();
  const { videos, activeCategory } = useSelector((state) => state.homeVideos);
  useEffect(() => {
    dispatch(getPopularVideo());
  }, [dispatch]);

  const fetchVideos = () => {
    if (activeCategory === "All") {
      dispatch(getPopularVideo());
    } else {
      dispatch(getVideoByCategory(activeCategory));
    }
  };
  return (
    <Container fluid className="mx-0">
      <CategoryBar />
      <Row className="d-flex flex-wrap">
        <InfiniteScroll
          className="row"
          dataLength={videos.length}
          next={fetchVideos}
          hasMore={true}
          Loader={
            <div className="spinner-border text-danger d-block mx-auto"></div>
          }
        >
          {videos.map((video) => {
            return (
              <Col lg={3} md={4}>
                <Video video={video} key={video.id} />
              </Col>
            );
          })}
        </InfiniteScroll>
      </Row>
    </Container>
  );
}

export default HomeScreen;
