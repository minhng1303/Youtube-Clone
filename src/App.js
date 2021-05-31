import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/sidebar";
import HomeScreen from "./pages/homeScreen/HomeScreen";
import LoginScreen from "./pages/loginScreen/LoginScreen";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import "./_app.scss";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const [sideBar, toggleSidebar] = useState(false);
  const handleToggleSidebar = () => {
    toggleSidebar(!sideBar);
  };
  return (
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        {
          <Sidebar
            sideBar={sideBar}
            handleToggleSidebar={handleToggleSidebar}
          />
        }
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
      <Route path="/search">
        <Layout>
          <h1> Search Page</h1>
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
