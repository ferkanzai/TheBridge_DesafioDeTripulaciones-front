import ChargePointData from "../ChargePointData";
import StationIcon from "../StationIcon";

import { UserContext } from "../../store";

import {
  deleteRemoveFavorite,
  getIsFavorite,
  postAddFavorite,
} from "../../services/favorites";

import { chooseSrc } from "../../utils";

import "./index.scss";
import { useContext, useEffect, useState } from "react";

const ChargePointInformation = ({
  chargePoint,
  className,
  hideChargePointInformation,
  handleReservationView,
}) => {
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
    <>
      <div className={`${className}chargePointInformation`}>
        <div className={`${className}chargePointInformation__top`}>
          <StationIcon
            isFavorite={isFavorite}
            handleHeartClick={handleHeartClick}
          />
          <div className={`${className}chargePointInformation__top__operator`}>
            <span>{chargePoint.operator_name || chargePoint.operator}</span>
            <img
              src={chooseSrc[chargePoint.operator_name || chargePoint.operator]}
              alt=""
            />
          </div>
        </div>
        <div className={`${className}chargePointInformation__info`}>
          <ChargePointData chargePoint={chargePoint} />
        </div>
        <div className={`${className}chargePointInformation__buttons`}>
          <button
            onClick={hideChargePointInformation}
            className={`${className}chargePointInformation__buttons__cancel`}
          >
            Cancelar
          </button>
          <button
            onClick={handleReservationView}
            className={`${className}chargePointInformation__buttons__reserve`}
          >
            Reservar
          </button>
        </div>
      </div>
    </>
  );
};

export default ChargePointInformation;
