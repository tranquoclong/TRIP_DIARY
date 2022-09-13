import { BrowserRouter, Switch } from "react-router-dom";
import { mainRouter, signRouter, adminRouter } from "./configs/router";
import RouterMainTemplate from "./templates/main";
import RouterSignTemplate from "./templates/login";
import { ModalContainer } from "./components/Modal";
import RouterAdminTemplate from "./templates/admin";

function App() {
  const renderMainRouter = () => {
    return mainRouter.map(({ path, exact, Component }) => {
      return (
        <RouterMainTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterMainTemplate>
      );
    });
  };
  const renderSignRouter = () => {
    return signRouter.map(({ path, exact, Component }) => {
      return (
        <RouterSignTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterSignTemplate>
      );
    });
  };
  const renderAdminRouter = () => {
    return adminRouter.map(({ path, exact, Component }) => {
      return (
        <RouterAdminTemplate
          path={path}
          exact={exact}
          Component={Component}
        ></RouterAdminTemplate>
      );
    });
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {renderAdminRouter()}
          {renderSignRouter()}
          {renderMainRouter()}
        </Switch>
        <ModalContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;
