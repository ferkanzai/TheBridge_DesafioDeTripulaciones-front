import { useContext, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

import BackArrow from "../../components/BackArrow";

import {
  deleteRemoveFavorite,
  getFavoritesChargePoints,
} from "../../services/favorites";
import { UserContext } from "../../store";

import exit from "../../svg/exit.svg";

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
    <>
      <BackArrow goProfile={true} />
      <p>Favorites</p>
      {userFavorites.length ? (
        userFavorites.map((favorite) => {
          return (
            <div key={favorite.id}>
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
