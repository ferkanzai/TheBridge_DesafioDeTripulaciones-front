import { useContext, useEffect, useState } from "react";
import { differenceInMinutes } from "date-fns";

import ChargePointData from "../ChargePointData";
import StationIcon from "../StationIcon";
import BackArrow from "../BackArrow";

import { UserContext } from "../../store";

import { chooseSrc } from "../../utils";

import {
  deleteRemoveFavorite,
  getIsFavorite,
  postAddFavorite,
} from "../../services/favorites";
import { postStartReservation } from "../../services/reservations";
import { getConenctionsByChargePoint } from "../../services/connections";

import "./index.scss";

const ChargePointReservationPage = ({ chargePoint, setIsReservationPage }) => {
  const {
    token,
    userFavorites,
    setUserFavorites,
    activeReservation,
    setActiveReservation,
  } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isActiveReservation, setIsActiveReservation] = useState(false);
  const [connectionId, setConnectionId] = useState([]);
  const [reservationEndTime, setReservationEndTime] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    if (isActiveReservation) {
      let id = setInterval(() => {
        setTime(new Date());
      }, 6000);

      return () => clearInterval(id);
    }
  }, [isActiveReservation]);

  useEffect(() => {
    getIsFavorite(token, chargePoint.id).then((res) => {
      setIsFavorite(false);
      if (res.length && chargePoint.id === res[0].id) setIsFavorite(true);
    });
    if (activeReservation && activeReservation.connection_id === connectionId) {
      setIsActiveReservation(true);
      setReservationEndTime(new Date(activeReservation.expiration_date));
    }
  }, [token, chargePoint, connectionId, activeReservation]);

  const handleHeartClick = () => {
    getIsFavorite(token, chargePoint.id).then((res) => {
      if (res.length === 0) {
        postAddFavorite(token, chargePoint.id).then(() => {
          setUserFavorites((prevFavs) => [...prevFavs, chargePoint]);
          setIsFavorite(true);
        });
      } else {
        const favoriteId = res[0].fav_id;

        deleteRemoveFavorite(token, favoriteId).then(() => {
          setUserFavorites(
            userFavorites.filter((fav) => fav.id !== chargePoint.id)
          );
          setIsFavorite(false);
        });
      }
    });
  };

  const handleReservation = () => {
    if (isActiveReservation) {
      console.log("active");
    } else {
      postStartReservation(token, connectionId).then((res) => {
        setIsActiveReservation(true);
        setActiveReservation(res[0]);
      });
    }
  };

  useEffect(() => {
    getConenctionsByChargePoint(chargePoint.id).then((res) => {
      setConnectionId(res[0].id);
    });
  }, [chargePoint]);

  const getMin = () => {
    const diffInMins = differenceInMinutes(reservationEndTime, time);

    if (diffInMins <= 0) {
      setIsActiveReservation(false);
      setActiveReservation(null);
      setReservationEndTime(null);
      return;
    }

    return diffInMins;
  };

  return (
    <div className="reservationPage">
      <div className="reservationPage__top">
        <div className="reservationPage__top__left">
          <p>Reserva actual</p>
          <div className="reservationPage__top__right__operator">
            <span>{chargePoint.operator}</span>
            <img src={chooseSrc[chargePoint.operator]} alt="" />
          </div>
        </div>
        <div className="reservationPage__top__right">
          <BackArrow
            className="reservationPage__top__left__arrow"
            setIsReservationPage={setIsReservationPage}
          />
          <StationIcon
            isFavorite={isFavorite}
            handleHeartClick={handleHeartClick}
          />
        </div>
      </div>
      <div className="reservationPage__info">
        <ChargePointData chargePoint={chargePoint} />
      </div>
      {isActiveReservation && (
        <div className="reservationPage__message">
          <div className="reservationPage__message__info">
            <p className="reservationPage__message__info__text">
              RESERVA REALIZADA CON ÉXITO
            </p>
          </div>
          <p className="reservationPage__message__time">
            *Dispones de {getMin()} min para llegar al punto de carga
          </p>
        </div>
      )}
      <div className="reservationPage__buttons">
        <button className="reservationPage__buttons__inactive">Cancelar</button>
        <button
          className="reservationPage__buttons__active"
          onClick={handleReservation}
        >
          Reservar
        </button>
      </div>
      {isActiveReservation && (
        <>
          <hr />
          <div className="reservationPage__extend">
            <span>
              Amplía el tiempo de reserva
              <br />
              (0.50€ por 10 minutos más)
            </span>
            <button>Ampliar</button>
          </div>
        </>
      )}
    </div>
  );
};

export default ChargePointReservationPage;
