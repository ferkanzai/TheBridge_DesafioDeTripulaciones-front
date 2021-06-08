import { useContext, useEffect, useState } from "react";

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

import "./index.scss";

const ChargePointReservationPage = ({ chargePoint, setIsReservationPage }) => {
  const { token, userFavorites, setUserFavorites } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

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

  return (
    <div className="reservationPage">
      <div className="reservationPage__top">
        <div className="reservationPage__top__left">
          <BackArrow
            className="reservationPage__top__left__arrow"
            setIsReservationPage={setIsReservationPage}
          />
          <StationIcon
            isFavorite={isFavorite}
            handleHeartClick={handleHeartClick}
          />
        </div>
        <div className="reservationPage__top__right">
          <p>Reserva actual</p>
          <div className="reservationPage__top__right__operator">
            <span>{chargePoint.operator}</span>
            <img src={chooseSrc[chargePoint.operator]} alt="" />
          </div>
        </div>
        <div className="reservationPage__info">
          <ChargePointData chargePoint={chargePoint} />
        </div>
      </div>
    </div>
  );
};

export default ChargePointReservationPage;
