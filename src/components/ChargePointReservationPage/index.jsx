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

const ChargePointReservationPage = ({
  chargePoint,
  setIsReservationPage,
  cancelReservationTop,
}) => {
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
  const [loadingActiveReservation, setLoadingActiveReservation] =
    useState(true);
  const [connectionId, setConnectionId] = useState(null);
  const [reservationEndTime, setReservationEndTime] = useState(null);
  const [time, setTime] = useState(dayjs(Date.now()));
  const [popupActiveReservation, setPopupActiveReservation] = useState(false);
  const [popupCancelReservation, setPopupCancelReservation] = useState(false);
  const [popupExtendReservation, setPopupExtendReservation] = useState(false);
  const [message, setMessage] = useState("RESERVA REALIZADA CON ÉXITO");
  const [reservationError, setReservationError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    let id = setInterval(() => {
      setTime(dayjs(Date.now()));
    }, 10000);

    return () => clearInterval(id);
  }, [time]);

  useEffect(() => {
    const id = setInterval(() => {
      setReservationError(false);
    }, 2500);

    return () => clearInterval(id);
  }, [reservationError]);

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
      postStartReservation(token, connectionId).then((res) => {
        console.log(res);
        if (res.status === 201) {
          getActiveReservation(token).then((res) => {
            setActiveReservation(res[0]);
            setIsActiveReservation(true);
            setReservationEndTime(
              // + 2 * 1000 * 60 * 60
              dayjs(res[0].expiration_date)
            );
          });
        } else {
          if (
            res.data.info.message ===
            "Unable to create new reservation, user has an active reservation in place"
          ) {
            setMessage("TIENES UNA RESERVA ACTIVA. NO PUEDES INICIAR OTRA");
          }
          if (
            res.data.info.message ===
            "Unable to create new reservation, connection already reserved"
          ) {
            setMessage("PUNTO DE CARGA ACTUALMENTE RESERVADO POR OTRO USUARIO");
          }
          setReservationError(true);
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
      setConnectionId(cId);

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
        cancelReservationTop?.();
        setActiveReservation(null);
        setIsActiveReservation(false);
        setReservationEndTime(null);
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
    putExtendReservation(token, activeReservation.reservation_id).then(() => {
      getActiveReservation(token).then((res) => {
        setPopupExtendReservation(!popupExtendReservation);
        setMessage("RESERVA AMPLIADA 10 MINUTOS");
        setReservationEndTime(dayjs(res[0].expiration_date));
      });
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
      ) : activeReservation?.charge_point_id === chargePoint.id ||
        reservationError ? (
        <div className="reservationPage__message">
          <div
            className={
              reservationError
                ? "reservationPage__message__error"
                : "reservationPage__message__info"
            }
          >
            <p
              className={
                reservationError
                  ? "reservationPage__message__error__text"
                  : "reservationPage__message__info__text"
              }
            >
              {message}
            </p>
          </div>
          {!reservationError && (
            <p className="reservationPage__message__time">
              *Dispones de {reservationEndTime ? getMin() : <Skeleton />} min
              para llegar al punto de carga
            </p>
          )}
        </div>
      ) : null}
      <div className="reservationPage__buttons">
        <button
          className={
            activeReservation?.charge_point_id === chargePoint.id
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
      ) : activeReservation?.charge_point_id === chargePoint.id ? (
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
