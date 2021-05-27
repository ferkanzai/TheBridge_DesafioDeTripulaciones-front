import { Route, Switch } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Map from "./pages/Map";
import Footer from "./components/Footer";

import { UserContext, useUser } from "./store";
import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import SingleUserCar from "./pages/SingleUserCar";
import WithAuthentication from "./components/hocs/WithAuthentication";

function App() {
  const userContextData = useUser();

  return (
    <UserContext.Provider value={userContextData}>
      <div className="App">
        <Switch>
          <Route path="/profile" exact>
            <WithAuthentication>
              <Profile />
            </WithAuthentication>
          </Route>

          <Route path="/login" exact>
            <Login />
          </Route>

          <Route path="/signup" exact>
            <SignUp />
          </Route>

          <Route path="/map" exact>
            <Map />
          </Route>

          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/settings/:userCarId">
            <WithAuthentication>
              <SingleUserCar />
            </WithAuthentication>
          </Route>
        </Switch>
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
