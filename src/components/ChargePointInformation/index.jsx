import { useContext, useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";

import { getConenctionsByChargePoint } from "../../services/connections";
import { postStartReservation } from "../../services/reservations";
import {
  deleteRemoveFavorite,
  getIsFavorite,
  postAddFavorite,
} from "../../services/favorites";

import { UserContext } from "../../store";

import chargePoint from "../../svg/charge-point.svg";
import location from "../../svg/location.svg";
import clock from "../../svg/clock.svg";
import dollar from "../../svg/dollar.svg";
import charge from "../../svg/charge.svg";
import heart from "../../svg/heart.svg";
import redHeart from "../../svg/red-heart.svg";

import "./index.scss";

const path = "/operators";

const chooseSrc = {
  Iberdrola: `${path}/iberdrola.jpg`,
  "Unknown Operator": `${path}/interrogation.png`,
  Wenea: `${path}/wenea.png`,
  Etecnic: `${path}/etecnic.jpg`,
  Ionity: `${path}/ionity.png`,
  EasyCharger: `${path}/easycharger.png`,
  "Fenie Energía (Spain)": `${path}/fenie.png`,
  Endesa: `${path}/endesa.png`,
  "Tesla Motors (Worldwide)": `${path}/tesla.png`,
  "LIVE Barcelona": `${path}/live.png`,
  EDP: `${path}/edp.png`,
  "IBIL (Es)": `${path}/ibil.png`,
  Electromaps: `${path}/electromaps.png`,
  "Estabanell Energia": `${path}/estabanell.png`,
  "AMB (Àrea metropolitana de Barcelona)": `${path}/amb.png`,
  "evcharge.online": `${path}/evcharge.png`,
  "(Business Owner at Location)": `${path}/interrogation.png`,
  "BP Pulse": `${path}/bp.jpg`,
  Amersam: `${path}/amersam.png`,
  "GE WattStation (No longer active)": `${path}/ge.png`,
  "MELIB (ES)": `${path}/melib.png`,
  "Be Energised (has-to-be)": `${path}/beenergised.png`,
  "Urbener Energía": `${path}/urbener.png`,
  "POD Point (UK)": `${path}/podpoint.png`,
  Renault: `${path}/renault.png`,
  "Viesgo (Spain)": `${path}/viesgo.jpg`,
  GIC: `${path}/gic.png`,
  "Enel X": `${path}/enel.png`,
  Nomadpower: `${path}/nomadpower.png`,
  sofos: `${path}/sofos.jpeg`,
  "MobecPoint (Es)": `${path}/mobecpoint.png`,
  "The New Motion (BE)": `${path}/newmotion.png`,
  "EV-Box": `${path}/evbox.png`,
};

const ChargePointInformation = ({
  singleChargePoint,
  hideChargePointInformation,
  className,
}) => {
  const { user, userFavorites, setUserFavorites, token } =
    useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  const [connectionTypes, setConnectionsTypes] = useState([]);

  const handleReservation = (connectionId) => {
    const token = localStorage.getItem("access_token");
    postStartReservation(token, connectionId);
  };

  useEffect(() => {
    getConenctionsByChargePoint(singleChargePoint.id)
      .then((res) => {
        const connectionsTypes = res.map(
          (connection) => connection.connection_type
        );
        const nonRepeatedConnectionsTypes = Array.from(
          new Set(connectionsTypes)
        );

        setConnectionsTypes(nonRepeatedConnectionsTypes);
      })
      .finally(() => {
        if (userFavorites.map((fav) => fav.id).includes(singleChargePoint.id))
          setIsFavorite(true);
      });
  }, [singleChargePoint, userFavorites]);

  const handleFavorite = () => {
    console.log(userFavorites);

    getIsFavorite(token, singleChargePoint.id).then((res) => {
      if (res.length === 0) {
        postAddFavorite(token, singleChargePoint.id).then(() => {
          setUserFavorites((prevFavs) => [...prevFavs, singleChargePoint]);
          setIsFavorite(true);
        });
      } else {
        const favoriteId = res[0].fav_id;

        deleteRemoveFavorite(token, favoriteId).then(() => {
          setUserFavorites(
            userFavorites.filter((fav) => fav.id !== singleChargePoint.id)
          );
          setIsFavorite(false);
        });
      }
    });
  };

  return (
    <div className={className}>
      <div className="chargePointInformation__pic">
        <img
          src={chargePoint}
          className="chargePointInformation__pic__svg"
          alt=""
        />
        {user && (
          <img
            src={isFavorite ? redHeart : heart}
            alt="handle favorite"
            className="chargePointInformation__pic__heart"
            onClick={handleFavorite}
          />
        )}
      </div>
      <div className="chargePointInformation__operator">
        <span>{singleChargePoint.operator}</span>
        <img src={chooseSrc[singleChargePoint.operator]} alt="" />
      </div>
      <div className="chargePointInformation__info">
        <p className="chargePointInformation__info__name">
          Punto de carga "{singleChargePoint.name}"
        </p>
        <div className="chargePointInformation__info__line">
          <img src={location} alt="" />
          <p>a {singleChargePoint.distance.toFixed(2)} km</p>
        </div>
        <div className="chargePointInformation__info__line">
          <img src={clock} alt="" />
          <p>Disponible en {singleChargePoint.waiting_time} minutos</p>
        </div>
        <div className="chargePointInformation__info__line">
          <div className="chargePointInformation__info__line__container">
            <img src={charge} alt="" />
          </div>
          <p>
            Conectores{" "}
            {connectionTypes &&
              connectionTypes.map((connectionType, i, array) =>
                i !== array.length - 1 ? (
                  <span className="chargePointInformation__info__grey">
                    {connectionType},{" "}
                  </span>
                ) : (
                  <span className="chargePointInformation__info__grey">
                    {connectionType}
                  </span>
                )
              )}
          </p>
        </div>
        <div className="chargePointInformation__info__line">
          <img src={dollar} alt="" />
          <p>Precio de carga ({singleChargePoint.price.toFixed(2)}€/min)</p>
        </div>
        <hr />
        <div className="chargePointInformation__info__rates">
          <p>Valoraciones de los usuarios</p>
          <Rating
            defaultValue={singleChargePoint.rating || 0}
            readOnly={true}
            size="small"
          />
          <p className="chargePointInformation__info__grey">
            ({singleChargePoint.votes})
          </p>
        </div>
        <p>
          Última revisión técnica{" "}
          <span className="chargePointInformation__info__grey">
            {singleChargePoint.last_verified
              ? new Date(singleChargePoint.last_verified).toLocaleString()
              : "no disponible"}
          </span>
        </p>
      </div>
      <div className="chargePointInformation__buttons">
        <button
          onClick={hideChargePointInformation}
          className="chargePointInformation__buttons__cancel"
        >
          Cancelar
        </button>
        <button
          onClick={handleReservation}
          className="chargePointInformation__buttons__reservation"
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default ChargePointInformation;
