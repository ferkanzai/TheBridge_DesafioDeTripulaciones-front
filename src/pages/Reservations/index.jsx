import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@material-ui/lab";
import { format } from "date-fns";

import ChargePointReservationPage from "../../components/ChargePointReservationPage";
import SingleChargePoint from "../../components/SingleChargePoint";

import { getSingleChargePoint } from "../../services/charge-points";
import {
  getActiveReservation,
  getUserReservations,
} from "../../services/reservations";

import { UserContext } from "../../store";

import { mappingColors } from "../../utils";

import chargePointImg from "../../svg/charge-point-grey.svg";
import chargePoint5 from "../../svg/charge-point-grey-5.svg";

import "./index.scss";

const Reservations = () => {
  const {
    activeReservation,
    setActiveReservation,
    token,
    userContextLat,
    userContextLng,
  } = useContext(UserContext);
  const [pastReservations, setPastReservations] = useState([]);
  const [isActiveReservation, setIsActiveReservation] = useState(false);
  const [isReservationPage, setIsReservationPage] = useState(false);
  const [chargePoint, setChargePoint] = useState(null);
  const [loadingActiveReservation, setLoadingActiveReservation] =
    useState(true);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    setLoadingActiveReservation(true);

    getActiveReservation(token)
      .then((res) => {
        setActiveReservation(res[0]);
        if (!res.length) {
          setIsActiveReservation(false);
        } else {
          setIsActiveReservation(true);
        }
      })
      .catch(() => {
        setIsActiveReservation(false);
        setActiveReservation(null);
      })
      .finally(() => setLoadingActiveReservation(false));
  }, [setActiveReservation, isReservationPage]);

  useEffect(() => {
    getUserReservations(token).then((res) => setPastReservations(res));
  }, [token, isReservationPage]);

  const handleReservationPage = (chargePointId) => {
    getSingleChargePoint(chargePointId, userContextLat, userContextLng)
      .then((res) => setChargePoint(res[0]))
      .finally(() => setIsReservationPage(true));
  };

  return (
    <div className="reservations">
      <p className="reservations__title">Reservas</p>
      <div className="reservations__description">
        <p>Programa tus rutas y descubre donde recargar</p>
        <Link to="/map" className="reservations__description__link">
          Ver mapa
        </Link>
      </div>
      <hr />
      {loadingActiveReservation ? (
        <Skeleton height={150} />
      ) : isActiveReservation ? (
        <div className="reservations__current">
          <SingleChargePoint
            circleSize={30}
            color={mappingColors(activeReservation.waiting_time)}
            icon={chargePoint5}
            size={62}
          />
          <div className="reservations__current__text">
            <>
              <p className="reservations__curret__text__title">
                {activeReservation.name}
              </p>
              <p className="reservations__current__text__date">
                Fecha de la reserva:{" "}
                {format(activeReservation.reservation_date, "dd-MM-yyyy HH:mm")}
              </p>
            </>
            <div
              className="reservations__current__text__details"
              onClick={() =>
                handleReservationPage(activeReservation.charge_point_id)
              }
            >
              Ver detalles
            </div>
          </div>
        </div>
      ) : (
        <h2 className="reservations__current">
          No tienes ninguna reserva activa
        </h2>
      )}
      <hr />
      <div className="reservations__past">
        <p>Reservas anteriores</p>
        {pastReservations &&
          pastReservations.map((reservation) => (
            <div
              className="reservations__past__list"
              key={reservation.reservation_id}
            >
              <SingleChargePoint
                circleSize={22}
                color={mappingColors(reservation.waiting_time)}
                icon={chargePointImg}
                size={46}
              />
              <div className="reservations__past__list__details">
                <p className="reservations__past__list__details__name">
                  {reservation.name}
                </p>
                <p className="reservations__past__list__details__date">
                  Fecha de la reserva:{" "}
                  {format(reservation.reservation_date, "dd-MM-yyyy HH:mm")}
                </p>
              </div>
            </div>
          ))}
      </div>
      {isReservationPage && (
        <ChargePointReservationPage
          chargePoint={chargePoint}
          setIsReservationPage={setIsReservationPage}
        />
      )}
    </div>
  );
};

export default Reservations;
