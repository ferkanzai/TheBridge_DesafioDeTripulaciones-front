import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFullProfile } from "../../services/auth";

import { UserContext } from "../../store";

import "./index.scss";

const Start = () => {
  let { token } = useContext(UserContext);

  const [fullUser, setFullUser] = useState(null);

  token = localStorage.getItem("access_token");

  useEffect(() => {
    getFullProfile(token).then((res) => setFullUser(res));
  }, [token]);

  return (
    <div className="start">
      <span className="start__title">
        Bienvenido {fullUser && fullUser.name},
      </span>
      <span className="start__text">
        Reserva puntos de carga y viaja con total seguridad
      </span>
      <Link to="/map" className="start__button">
        Ver Puntos
      </Link>
    </div>
  );
};

export default Start;
