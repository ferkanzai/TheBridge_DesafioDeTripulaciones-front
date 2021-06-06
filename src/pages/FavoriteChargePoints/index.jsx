import { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import BackArrow from "../../components/BackArrow";

import { UserContext } from "../../store";

import {
  deleteRemoveFavorite,
  getFavoritesChargePoints,
} from "../../services/favorites";

import exit from "../../svg/exit.svg";
import redHeart from "../../svg/red-heart.svg";
import chargePoint from "../../svg/charge-point.svg";

import "./index.scss";

const FavoritesChargePoints = () => {
  const { userFavorites, setUserFavorites } = useContext(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    getFavoritesChargePoints(token).then((res) => setUserFavorites(res));
  }, [setUserFavorites]);

  const removeFavorite = (favoriteId) => {
    const token = localStorage.getItem("access_token");

    deleteRemoveFavorite(token, favoriteId).then(() =>
      setUserFavorites(
        userFavorites.filter((favorite) => favorite.fav_id !== favoriteId)
      )
    );
  };

  return (
    <div className="favorites">
      <BackArrow goProfile={true} className="favorites__arrow" />
      {userFavorites.length ? (
        userFavorites.map((favorite) => {
          return (
            <div key={favorite.id} className="favorite">
              <div className="favorite__pic">
                <img src={chargePoint} alt="" className="favorite__pic__svg" />
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
        <Skeleton width={300} />
      )}
    </div>
  );
};

export default FavoritesChargePoints;
