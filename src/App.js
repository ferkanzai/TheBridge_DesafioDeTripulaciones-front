import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Map from "./pages/Map";

import { UserContext } from "./store";
import { useUser } from "./hooks/useUser";

import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SingleUserCar from "./pages/SingleUserCar";
import WithAuthentication from "./components/hocs/WithAuthentication";
import WithNavBar from "./components/hocs/WithNavBar";
import Start from "./pages/Start";

function App() {
  const userContextData = useUser();

  return (
    <UserContext.Provider value={userContextData}>
      <div className="App">
        <Switch>
          <Route path="/profile" exact>
            <WithAuthentication>
              <WithNavBar>
                <Profile />
              </WithNavBar>
            </WithAuthentication>
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/signup" exact>
            <SignUp />
          </Route>

          <Route path="/map" exact>
            <WithNavBar>
              <Map />
            </WithNavBar>
          </Route>

          <Route path="/settings/:userCarId">
            <WithAuthentication>
              <WithNavBar>
                <SingleUserCar />
              </WithNavBar>
            </WithAuthentication>
          </Route>

          <Route path="/start" exact>
            <WithAuthentication>
              <WithNavBar>
                <Start />
              </WithNavBar>
            </WithAuthentication>
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
