import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import dayjs from "dayjs";

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
  getActiveReservation,
  postStartReservation,
  putCancelReservation,
  putExtendReservation,
} from "../../services/reservations";
import { getConenctionsByChargePoint } from "../../services/connections";

import "./index.scss";
import { Skeleton } from "@material-ui/lab";

const ChargePointReservationPage = ({ chargePoint, setIsReservationPage }) => {
  const { user, token, userFavorites, setUserFavorites } =
    useContext(UserContext);
  const [activeReservation, setActiveReservation] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isActiveReservation, setIsActiveReservation] = useState(false);
  const [loadingActiveReservation, setLoadingActiveReservation] =
    useState(true);
  const [connectionId, setConnectionId] = useState(null);
  const [reservationEndTime, setReservationEndTime] = useState(null);
  const [time, setTime] = useState(dayjs(Date.now()));
  const [popupActiveReservation, setPopupActiveReservation] = useState(false);
  const [popupCancelReservation, setPopupCancelReservation] = useState(false);
  const [popupExtendReservation, setPopupExtendReservation] = useState(false);
  const [message, setMessage] = useState("RESERVA REALIZADA CON ÉXITO");

  const history = useHistory();

  useEffect(() => {
    let id = setInterval(() => {
      setTime(dayjs(Date.now()));
    }, 10000);

    return () => clearInterval(id);
  }, [time]);

  useEffect(() => {
    getIsFavorite(token, chargePoint.id).then((res) => {
      setIsFavorite(false);
      if (res.length && chargePoint.id === res[0].id) setIsFavorite(true);
    });
  }, [token, chargePoint]);

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
      postStartReservation(token, connectionId)
        .then((res) => {
          setIsActiveReservation(true);
          setActiveReservation(res[0]);
        })
        .finally(() => {
          if (isActiveReservation) {
            setReservationEndTime(dayjs(activeReservation.expiration_date));
          }
        });
    }
  };

  useEffect(() => {
    getConenctionsByChargePoint(chargePoint.id).then((res) => {
      setConnectionId(res[0].id);
    });
  }, [chargePoint]);

  useEffect(() => {
    getConenctionsByChargePoint(chargePoint.id).then((res) => {
      const cId = res[0].id;
      setConnectionId(res[0].id);

      getActiveReservation(token)
        .then((res) => {
          if (res.length && res[0].connection_id === cId) {
            setActiveReservation(res[0]);
            setIsActiveReservation(true);
            setReservationEndTime(dayjs(res[0].expiration_date));
          }
        })
        .catch((error) => {
          console.log(error);
          setIsActiveReservation(false);
          setActiveReservation(null);
        })
        .finally(() => {
          setLoadingActiveReservation(false);
          if (activeReservation) {
            setReservationEndTime(dayjs(activeReservation.expiration_date));
          }
        });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chargePoint, token]);

  const getMin = () => {
    const diffInMins = reservationEndTime.diff(time, "minutes");

    if (diffInMins <= 0) {
      setIsActiveReservation(false);
      setActiveReservation(null);
      setReservationEndTime(null);
      setPopupExtendReservation(false);
    }

    return diffInMins;
  };

  const handleClickPopupActiveReservation = () => {
    setPopupActiveReservation(!popupActiveReservation);
  };

  const cancelReservation = () => {
    putCancelReservation(token, activeReservation.reservation_id).then(
      (res) => {
        setActiveReservation(null);
        setIsActiveReservation(false);
        setPopupCancelReservation(!popupCancelReservation);
      }
    );
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
    putExtendReservation(token, activeReservation.reservation_id)
      .then((res) => {
        setActiveReservation(res[0]);
        setPopupExtendReservation(!popupExtendReservation);
        setMessage("RESERVA AMPLIADA 10 MINUTOS");
      })
      .finally(() => {
        setReservationEndTime(dayjs(activeReservation.expiration_date));
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
            <span>{chargePoint.operator || chargePoint.operator_name}</span>
            <img
              src={chooseSrc[chargePoint.operator || chargePoint.operator_name]}
              alt=""
            />
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
      {loadingActiveReservation ? (
        <Skeleton width={5} />
      ) : activeReservation ? (
        <div className="reservationPage__message">
          <div className="reservationPage__message__info">
            <p className="reservationPage__message__info__text">{message}</p>
          </div>
          <p className="reservationPage__message__time">
            {/* In progress */}
            *Dispones de {reservationEndTime ? getMin() : <Skeleton />} min para
            llegar al punto de carga
          </p>
        </div>
      ) : null}
      <div className="reservationPage__buttons">
        <button
          className={
            activeReservation
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
      {loadingActiveReservation ? (
        <Skeleton />
      ) : activeReservation ? (
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
      ) : null}
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
