import { Route, Switch } from "react-router";

import WithAuthentication from "./components/hocs/WithAuthentication";
import WithNavBar from "./components/hocs/WithNavBar";

import AddCar from "./pages/AddCar";
import FavoritesChargePoints from "./pages/FavoriteChargePoints";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SingleUserCar from "./pages/SingleUserCar";
import Start from "./pages/Start";

import { UserContext } from "./store";
import { useUser } from "./hooks/useUser";

import "./App.scss";

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

          <Route path="/add-car">
            <WithAuthentication>
              <WithNavBar>
                <AddCar />
              </WithNavBar>
            </WithAuthentication>
          </Route>

          <Route path="/charge-points/favorites">
            <WithAuthentication>
              <WithNavBar>
                <FavoritesChargePoints />
              </WithNavBar>
            </WithAuthentication>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
