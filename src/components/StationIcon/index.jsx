import { useContext } from "react";

import { UserContext } from "../../store";

import chargePoint from "../../svg/charge-point.svg";
import heart from "../../svg/heart.svg";
import redHeart from "../../svg/red-heart.svg";

import "./index.scss";

const StationIcon = ({ isFavorite }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      <img
        src={chargePoint}
        className="container__svg"
        alt="icon of a charge point"
      />
      {user && (
        <img
          className="container__heart"
          src={isFavorite ? redHeart : heart}
          alt="favorite icon"
        />
      )}
    </div>
  );
};

export default StationIcon;
