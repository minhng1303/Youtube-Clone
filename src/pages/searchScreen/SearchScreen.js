import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getVideoBySearch } from "../../components/redux/actions/videos.action";
import VideoHorizontal from "../../components/videoHorizontal/videoHorizontal";

function SearchScreen() {
  const { query } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoBySearch(query));
  }, [query, dispatch]);
  const { videos, loading } = useSelector((state) => state.searchedVideos);
  return (
    <Container>
      {!loading ? (
        videos?.map((video) => {
          return (
            <VideoHorizontal
              video={video}
              key={video?.id?.videoId}
              isSearch={true}
            />
          );
        })
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
}

export default SearchScreen;
