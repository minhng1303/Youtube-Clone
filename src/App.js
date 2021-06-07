import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";
import HomeScreen from "./pages/homeScreen/HomeScreen";
import LoginScreen from "./pages/loginScreen/LoginScreen";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./_app.scss";
import { useSelector } from "react-redux";
import WatchScreen from "./pages/watchScreen/WatchScreen";
import SearchScreen from "./pages/searchScreen/SearchScreen";
import SubscriptionScreen from "./pages/subscriptionScreen/SubscriptionScreen";
import ChannelScreen from "./pages/channelScreen/ChannelScreen";

const Layout = ({ children }) => {
  const [sideBar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    toggleSidebar(!sideBar);
  };
  return (
    <div>
      <Sidebar sideBar={sideBar} handleToggleSidebar={handleToggleSidebar} />
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </div>
  );
};
function App() {
  const history = useHistory();
  const { accessToken, loading } = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading]);
  return (
    <Switch>
      <Route path="/auth">
        <LoginScreen />
      </Route>
      <Route path="/search/:query">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route exact path="/feed/subscriptions">
        <Layout>
          <SubscriptionScreen />
        </Layout>
      </Route>
      <Route exact path="/channel/:channelId">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>
      <Route exact path="/watch/:id">
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>
      <Route exact path="/">
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>
      <Route>
        <Redirect to="/" from="*" />
      </Route>
    </Switch>
  );
}

export default App;
