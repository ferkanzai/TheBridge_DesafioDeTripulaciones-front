import { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import BackArrow from "../../components/BackArrow";
import ChargePointReservationPage from "../../components/ChargePointReservationPage";

import { UserContext } from "../../store";

import { getSingleChargePoint } from "../../services/charge-points";
import {
  deleteRemoveFavorite,
  getFavoritesChargePoints,
} from "../../services/favorites";

import exit from "../../svg/exit.svg";
import redHeart from "../../svg/red-heart.svg";
import chargePoint5 from "../../svg/charge-point.svg";

import "./index.scss";

const FavoritesChargePoints = () => {
  const {
    token,
    userFavorites,
    setUserFavorites,
    userContextLat,
    userContextLng,
  } = useContext(UserContext);
  const [loadingFavs, setLoadingFavs] = useState(true);
  const [isReservationPage, setIsReservationPage] = useState(false);
  const [chargePoint, setChargePoint] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    getFavoritesChargePoints(token)
      .then((res) => setUserFavorites(res))
      .finally(() => setLoadingFavs(false));
  }, [setUserFavorites]);

  const removeFavorite = (favoriteId) => {
    deleteRemoveFavorite(token, favoriteId).then(() =>
      setUserFavorites(
        userFavorites.filter((favorite) => favorite.fav_id !== favoriteId)
      )
    );
  };

  const handleReservationPage = (chargePointId) => {
    getSingleChargePoint(chargePointId, userContextLat, userContextLng)
      .then((res) => setChargePoint(res[0]))
      .finally(() => setIsReservationPage(true));
  };

  return (
    <div className="favorites">
      <BackArrow goProfile={true} className="favorites__arrow" />
      {loadingFavs ? (
        <Skeleton width={300} />
      ) : userFavorites.length ? (
        userFavorites.map((favorite) => {
          return (
            <div
              key={favorite.id}
              className="favorite"
              onClick={() => handleReservationPage(favorite.id)}
            >
              <div className="favorite__pic">
                <img src={chargePoint5} alt="" className="favorite__pic__svg" />
                <img src={redHeart} alt="" className="favorite__pic__heart" />
              </div>
              <div className="favorite__name">
                <span className="favorite__name__text">
                  Punto de carga "{favorite.name}"
                </span>
                <img
                  className="favorite__name__remove"
                  src={exit}
                  alt="remove favorite"
                  onClick={() => removeFavorite(favorite.fav_id)}
                />
              </div>
            </div>
          );
        })
      ) : (
        <div className="favorites__noFavs">
          <span className="favorites__noFavs__text">
            No tienes puntos de carga favoritos
          </span>
        </div>
      )}
      {isReservationPage && (
        <ChargePointReservationPage
          chargePoint={chargePoint}
          setIsReservationPage={setIsReservationPage}
        />
      )}
    </div>
  );
};

export default FavoritesChargePoints;
