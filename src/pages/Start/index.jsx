import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFullProfile } from "../../services/auth";

import "./index.scss";

const Start = () => {
  const [fullUser, setFullUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    getFullProfile(token).then((res) => setFullUser(res));
  }, []);

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
