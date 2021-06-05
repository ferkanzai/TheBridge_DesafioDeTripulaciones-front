import { Link } from "react-router-dom";
import { useContext } from "react";
import { Redirect } from "react-router";

import { UserContext } from "../../store";

import "./index.scss";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {!user ? (
        <div className="home">
          <div className="home__content">
            <h1 className="home__content__title">
              Viaja largos trayectos con tu vehículo eléctrico
            </h1>
            <Link to="/signup" className="home__content__signup">
              Crea una cuenta
            </Link>
            <Link to="/login" className="home__content__login">
              Inicia sesión
            </Link>
            <Link to="/map" className="home__content__continue">
              Sólo quiero echar un vistazo
            </Link>
          </div>
        </div>
      ) : (
        <Redirect to="/start" />
      )}
    </>
  );
};

export default Home;
