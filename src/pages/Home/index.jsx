import { Link } from "react-router-dom";

import "./index.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="home__content">
        <h1 className="home__content__title">
          Viaja largos trayectos con tu vehículo <br /> eléctrico
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
  );
};

export default Home;
