import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { differenceInMinutes } from "date-fns";

import BackArrow from "../BackArrow";
import ChargePointData from "../ChargePointData";
import PopupActiveReservation from "../PopupActiveReservation";
import PopupCancelReservation from "../PopupCancelReservation";
import PopupExtendReservation from "../PopupExtendReservation";
import StationIcon from "../StationIcon";

import { UserContext } from "../../store";

import { chooseSrc } from "../../utils";

import {
  deleteRemoveFavorite,
  getIsFavorite,
  postAddFavorite,
} from "../../services/favorites";
import {
  postStartReservation,
  putCancelReservation,
  putExtendReservation,
} from "../../services/reservations";
import { getConenctionsByChargePoint } from "../../services/connections";

import "./index.scss";

const ChargePointReservationPage = ({ chargePoint, setIsReservationPage }) => {
  const {
    user,
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
  const [popupActiveReservation, setPopupActiveReservation] = useState(false);
  const [popupCancelReservation, setPopupCancelReservation] = useState(false);
  const [popupExtendReservation, setPopupExtendReservation] = useState(false);
  const [message, setMessage] = useState("RESERVA REALIZADA CON ÉXITO");

  const history = useHistory();

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
    if (!user) {
      history.push("/start");
    }
    if (isActiveReservation) {
      handleClickPopupActiveReservation();
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
      setPopupExtendReservation(false);
      return;
    }

    return diffInMins;
  };

  const handleClickPopupActiveReservation = () => {
    setPopupActiveReservation(!popupActiveReservation);
  };

  const cancelReservation = () => {
    putCancelReservation(token, activeReservation.id).then((res) => {
      setActiveReservation(null);
      setIsActiveReservation(false);
      setPopupCancelReservation(!popupCancelReservation);
    });
  };

  const handleCancelReservationPopup = () => {
    setPopupCancelReservation(!popupCancelReservation);
  };

  const handleCancelButton = () => {
    if (isActiveReservation) {
      handleCancelReservationPopup();
    } else {
      setIsReservationPage(false);
    }
  };

  const extendReservation = () => {
    putExtendReservation(token, activeReservation?.id).then((res) => {
      setActiveReservation(res[0]);
      setPopupExtendReservation(!popupExtendReservation);
      setMessage("RESERVA AMPLIADA 10 MINUTOS");
    });
  };

  const handleExtendPopup = () => {
    setPopupExtendReservation(!popupExtendReservation);
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
            <p className="reservationPage__message__info__text">{message}</p>
          </div>
          <p className="reservationPage__message__time">
            *Dispones de {getMin()} min para llegar al punto de carga
          </p>
        </div>
      )}
      <div className="reservationPage__buttons">
        <button
          className={
            isActiveReservation
              ? "reservationPage__buttons__active"
              : "reservationPage__buttons__inactive"
          }
          onClick={handleCancelButton}
        >
          Cancelar
        </button>
        <button
          className={
            !isActiveReservation
              ? "reservationPage__buttons__active"
              : "reservationPage__buttons__inactive"
          }
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
            <button onClick={handleExtendPopup}>Ampliar</button>
          </div>
        </>
      )}
      {popupActiveReservation && (
        <PopupActiveReservation
          handleClickPopupActiveReservation={handleClickPopupActiveReservation}
        />
      )}
      {popupCancelReservation && (
        <PopupCancelReservation
          cancelReservation={cancelReservation}
          handleCancelReservationPopup={handleCancelReservationPopup}
        />
      )}
      {popupExtendReservation && (
        <PopupExtendReservation
          extendReservation={extendReservation}
          handleReservationPopup={handleExtendPopup}
        />
      )}
    </div>
  );
};

export default ChargePointReservationPage;
