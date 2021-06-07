import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getSubscriptionChannel } from "../../components/redux/actions/videos.action";
import VideoHorizontal from "../../components/videoHorizontal/videoHorizontal";

import "./_subscriptionScreen.scss";
function SubscriptionScreen() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authReducer);
  const { videos, loading } = useSelector((state) => state.subscriptionChannel);
  useEffect(() => {
    dispatch(getSubscriptionChannel(accessToken));
  }, [dispatch]);
  return (
    <Container>
      {!loading ? (
        videos?.map((video) => {
          return <VideoHorizontal video={video} key={video.id} isSub={true} />;
        })
      ) : (
        <SkeletonTheme color="#343a40" highlightColor="#3c4147">
          <Skeleton width="100%" height="160px" count={20} />
        </SkeletonTheme>
      )}
    </Container>
  );
}

export default SubscriptionScreen;
