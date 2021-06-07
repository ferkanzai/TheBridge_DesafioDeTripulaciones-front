import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Rating from "@material-ui/lab/Rating";

import BackArrow from "../BackArrow";

import { getConenctionsByChargePoint } from "../../services/connections";
import {
  postStartReservation,
  putCancelReservation,
  putExtendReservation,
} from "../../services/reservations";
import {
  deleteRemoveFavorite,
  getIsFavorite,
  postAddFavorite,
} from "../../services/favorites";

import { UserContext } from "../../store";

import { mappingColors, chooseSrc } from "../../utils";

import chargePoint from "../../svg/charge-point.svg";
import location from "../../svg/location.svg";
import dollar from "../../svg/dollar.svg";
import charge from "../../svg/charge.svg";
import heart from "../../svg/heart.svg";
import redHeart from "../../svg/red-heart.svg";

import "./index.scss";

const ChargePointInformation = ({
  singleChargePoint,
  hideChargePointInformation,
  className,
}) => {
  const {
    user,
    userFavorites,
    setUserFavorites,
    token,
    activeReservation,
    setActiveReservation,
  } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isReservationPage, setIsReservationPage] = useState(false);
  const [connectionTypes, setConnectionsTypes] = useState([]);
  const [connectionId, setConnectionId] = useState(null);
  const [error, setError] = useState(false);
  const [reservationOk, setReservationOk] = useState(false);
  const [watch, setWatch] = useState(new Date());
  const [openDelete, setOpenDelete] = useState(false);
  const [openExtendReservation, setOpenExtendReservation] = useState(false);
  const [openCancelReservation, setOpenCancelReservation] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (activeReservation) {
      let id = setInterval(() => {
        setWatch(new Date().getTime());
      }, 6000);

      return () => clearInterval(id);
    }
  }, [activeReservation]);

  const handleReservation = () => {
    if (!user) {
      history.push("/start");
    }
    if (!isReservationPage) {
      setIsReservationPage(true);
    } else {
      const token = localStorage.getItem("access_token");

      if (activeReservation?.connection_id !== connectionId) {
        postStartReservation(token, connectionId)
          .then((res) => {
            setActiveReservation(res[0]);
            setError(false);
            setReservationOk(true);
          })
          .catch(() => {
            setError(true);
          });
      } else {
        setOpenDelete(!openDelete);
      }
    }
  };

  useEffect(() => {
    console.log(singleChargePoint);
    getConenctionsByChargePoint(singleChargePoint.id)
      .then((res) => {
        const connectionsTypes = res.map(
          (connection) => connection.connection_type
        );
        const nonRepeatedConnectionsTypes = Array.from(
          new Set(connectionsTypes)
        );

        setConnectionsTypes(nonRepeatedConnectionsTypes);
        setConnectionId(res[0].id);
      })
      .finally(() => {
        if (userFavorites.map((fav) => fav.id).includes(singleChargePoint.id))
          setIsFavorite(true);
      });

    activeReservation?.connection_id === connectionId && setReservationOk(true);
  }, [singleChargePoint, userFavorites, activeReservation, connectionId]);

  const handleFavorite = () => {
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

  const getMin = () => {
    const reservationTime = new Date(
      activeReservation?.expiration_date + 2 * 60 * 60 * 1000
    ).getTime();

    const min = Number((reservationTime - watch) / 1000 / 60);

    if (min.toFixed(0) <= 0) {
      setReservationOk(false);
      setActiveReservation(null);
      return;
    }

    return min.toFixed(0);
  };

  const extendReservation = () => {
    putExtendReservation(token, activeReservation?.id).then((res) => {
      setActiveReservation(res[0]);
      setError(false);
      setReservationOk(true);
      setOpenExtendReservation(!openExtendReservation);
    });
  };

  const handleReservationPopup = () => {
    setOpenExtendReservation(!openExtendReservation);
  };

  const handleCancelReservationPopup = () => {
    setOpenCancelReservation(!openCancelReservation);
  };

  const cancelReservation = () => {
    putCancelReservation(token, activeReservation.id).then((res) => {
      setActiveReservation(null);
      setError(false);
      setReservationOk(false);
      setOpenCancelReservation(!openCancelReservation);
    });
  };

  const handleClickPopup = () => {
    setOpenDelete(!openDelete);
  };

  const handleCancelButton = () => {
    if (
      isReservationPage &&
      activeReservation &&
      activeReservation.connection_id === connectionId
    ) {
      handleCancelReservationPopup();
    } else if (isReservationPage) {
      setIsReservationPage(false);
      setError(false);
    } else {
      hideChargePointInformation();
    }
  };

  return (
    <div
      className={
        isReservationPage
          ? `${className} chargePointInformation--full`
          : className
      }
    >
      {isReservationPage && (
        <div className="chargePointInformation__header">
          <div className="chargePointInformation__header__left">
            <p className="chargePointInformation__header__left__text">
              Detalles de la Reserva
            </p>
            <div className="chargePointInformation__header__left__operator">
              <span>{singleChargePoint.operator}</span>
              <img src={chooseSrc[singleChargePoint.operator]} alt="" />
            </div>
          </div>
          <div className="chargePointInformation__header__right">
            <BackArrow
              goProfile={false}
              setIsReservationPage={setIsReservationPage}
              setError={setError}
            />
            <div className="chargePointInformation__header__right__pic">
              <img
                src={chargePoint}
                className="chargePointInformation__header__right__pic__svg"
                alt=""
              />
              {user && (
                <img
                  src={isFavorite ? redHeart : heart}
                  alt="handle favorite"
                  className="chargePointInformation__header__right__pic__heart"
                  onClick={handleFavorite}
                />
              )}
            </div>
          </div>
        </div>
      )}
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
      {!isReservationPage && (
        <div className="chargePointInformation__operator">
          <span>{singleChargePoint.operator}</span>
          <img src={chooseSrc[singleChargePoint.operator]} alt="" />
        </div>
      )}
      <div
        className="chargePointInformation__error"
        style={error ? null : { display: "none" }}
      >
        <p className="chargePointInformation__error__text">
          FALLO AL REALIZAR RESERVA. COMPRUEBE SI TIENE LA SESIÓN INICIADA O SI
          TIENE RESERVAS ACTIVAS
        </p>
      </div>
      {reservationOk && isReservationPage && activeReservation ? (
        <div className="chargePointInformation__ok">
          <div className="chargePointInformation__ok__info">
            <p className="chargePointInformation__ok__info__text">
              RESERVA REALIZA CON ÉXITO
            </p>
          </div>
          <p className="chargePointInformation__ok__time">
            *Dispones de {getMin()} min para llegar al punto de carga
          </p>
          <hr />
          <div className="chargePointInformation__ok__extend">
            <p className="chargePointInformation__ok__extend__text">
              Amplía el tiempo de reserva 10 minutos por 0.50€ más
            </p>
            <button
              onClick={handleReservationPopup}
              className="chargePointInformation__ok__extend__button"
            >
              Ampliar
            </button>
          </div>
          <hr />
        </div>
      ) : null}
      <div className="chargePointInformation__info">
        <p className="chargePointInformation__info__name">
          Punto de carga "{singleChargePoint.name}"
        </p>
        <div className="chargePointInformation__info__line">
          <img src={location} alt="" />
          <p>a {singleChargePoint.distance.toFixed(2)} km</p>
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
                  <span
                    key={connectionType}
                    className="chargePointInformation__info__grey"
                  >
                    {connectionType},{" "}
                  </span>
                ) : (
                  <span
                    key={connectionType}
                    className="chargePointInformation__info__grey"
                  >
                    {connectionType}
                  </span>
                )
              )}
          </p>
        </div>
        <div className="chargePointInformation__info__line">
          <div
            className="chargePointInformation__info__line__circle"
            style={{
              backgroundColor: mappingColors(singleChargePoint.waiting_time),
            }}
          ></div>
          <p>Disponible en {singleChargePoint.waiting_time} minutos</p>
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
            value={singleChargePoint.rating || 0}
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
          onClick={handleCancelButton}
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
      {openDelete && (
        <div className="popupActiveReservation">
          <div className="popupActiveReservation__text">
            <span>Reserva activa, no se puede volver a reservar</span>
            <div className="popupActiveReservation__buttons">
              <button onClick={handleClickPopup}>Volver</button>
            </div>
          </div>
        </div>
      )}
      {openExtendReservation && (
        <div className="popupExtendReservation">
          <div className="popupExtendReservation__title">
            <span className="popupExtendReservation__title__text">
              Finalización del tiempo de Reserva
            </span>
          </div>
          <div className="popupExtendReservation__text">
            <span className="popupExtendReservation__text__bold">
              ¿Quieres reservar este punto más tiempo?
            </span>
            <span className="popupExtendReservation__text__normal">
              precio por ampliar: 0.50€
            </span>
            <div className="popupExtendReservation__buttons">
              <button
                onClick={extendReservation}
                className="popupExtendReservation__buttons__extend"
              >
                Ampliar
              </button>
              <button
                onClick={handleReservationPopup}
                className="popupExtendReservation__buttons__no"
              >
                Ahora No
              </button>
            </div>
          </div>
        </div>
      )}
      {openCancelReservation && (
        <div className="popupExtendReservation">
          <div className="popupExtendReservation__title">
            <span className="popupExtendReservation__title__text">
              Cancelar Reserva
            </span>
          </div>
          <div className="popupExtendReservation__text">
            <span className="popupExtendReservation__text__bold">
              ¿Seguro que quieres cancelar esta reserva?
            </span>
            <div className="popupExtendReservation__buttons">
              <button
                onClick={cancelReservation}
                className="popupExtendReservation__buttons__extend"
              >
                Cancelar
              </button>
              <button
                onClick={handleCancelReservationPopup}
                className="popupExtendReservation__buttons__no"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChargePointInformation;
