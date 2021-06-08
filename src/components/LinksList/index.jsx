import { useContext } from "react";

import SingleLink from "../SingleLink";

import { UserContext } from "../../store";

import key from "../../svg/key.svg";
import heart from "../../svg/grey-heart.svg";
import friends from "../../svg/friends.svg";
import gear from "../../svg/gear.svg";
import paper from "../../svg/paper.svg";
import info from "../../svg/info.svg";
import exit from "../../svg/exit.svg";
import creditCard from "../../svg/credit-card.svg";

import "./index.scss";

const LinksList = () => {
  const { logout } = useContext(UserContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="profile__links">
      <SingleLink icon={key} text="Añadir un vehículo" path="/add-car" />
      <SingleLink
        icon={heart}
        text="Puntos de carga favoritos"
        path="/charge-points/favorites"
      />
      <SingleLink icon={friends} text="Invitar amigos" path="/invite" />
      <SingleLink icon={creditCard} text="Métodos de pago" path="/payments" />
      <SingleLink icon={gear} text="Configuración" path="/config" />
      <SingleLink icon={paper} text="Términos y condiciones" path="/terms" />
      <SingleLink
        icon={info}
        text="Servicio atención al cliente / FAQ"
        path="/support"
      />
      <SingleLink icon={exit} text="Salir" path="/" onClick={handleLogout} />
    </div>
  );
};

export default LinksList;
