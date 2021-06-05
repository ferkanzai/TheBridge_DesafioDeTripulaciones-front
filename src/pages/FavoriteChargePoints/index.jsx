import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

import BackArrow from "../../components/BackArrow";

import {
  deleteRemoveFavorite,
  getFavoritesChargePoints,
} from "../../services/favorites";

import exit from "../../svg/exit.svg";

const FavoritesChargePoints = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    getFavoritesChargePoints(token).then((res) => setFavorites(res));
  }, []);

  const removeFavorite = (favoriteId) => {
    const token = localStorage.getItem("access_token");

    deleteRemoveFavorite(token, favoriteId).then(() =>
      setFavorites(
        favorites.filter((favorite) => favorite.fav_id !== favoriteId)
      )
    );
  };

  return (
    <>
      <BackArrow />
      <p>Favorites</p>
      {favorites.length ? (
        favorites.map((favorite) => {
          return (
            <div key={favorite.fav_id}>
              {favorite.name}
              <img
                src={exit}
                alt="remove favorite"
                onClick={() => removeFavorite(favorite.fav_id)}
              />
            </div>
          );
        })
      ) : (
        <Skeleton width={300} />
      )}
    </>
  );
};

export default FavoritesChargePoints;
