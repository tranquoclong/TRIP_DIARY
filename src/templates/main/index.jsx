import React from "react";
import { Redirect, Route, useRouteMatch } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useIsLogin } from "../../hooks/useIsLogin";
import HeaderNotLogin from "../../components/Header/headerNotLogin";

function MainTemplate(props) {
  const useRouteNewTrip = useRouteMatch("/save-trip");
  const useRoutePastTrip = useRouteMatch("/trip");
  const { isLogin } = useIsLogin();
  return (
    <>
      {isLogin
        ? !useRouteNewTrip && !useRoutePastTrip && <Header />
        : !useRouteNewTrip && !useRoutePastTrip && <HeaderNotLogin />}
      <main>{props.children}</main>
      {!useRouteNewTrip && !useRoutePastTrip && <Footer />}
    </>
  );
}

const RouterMainTemplate = ({ path, exact, Component }) => {
  const { isLogin } = useIsLogin();
  const mathUser = useRouteMatch("/user");
  const matchTrip = useRouteMatch("/trip");
  const matchProfile = useRouteMatch("/profile");
  return (
    <Route
      path={path}
      exact={exact}
      render={() =>
        isLogin || matchTrip || mathUser || matchProfile ? (
          <MainTemplate>
            <Component />
          </MainTemplate>
        ) : (
          <Redirect
            to={{
              pathname: "/",
            }}
          />
        )
      }
    />
  );
};

export default RouterMainTemplate;
