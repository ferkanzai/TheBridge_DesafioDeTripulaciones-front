import { useContext } from "react";

import { UserContext } from "../../store";

import chargePoint from "../../svg/charge-point.svg";
import heart from "../../svg/heart.svg";
import redHeart from "../../svg/red-heart.svg";

import "./index.scss";

const StationIcon = ({ isFavorite, handleHeartClick }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="container">
      <img
        alt="icon of a charge point"
        className="container__svg"
        src={chargePoint}
      />
      {user && (
        <img
          alt="favorite icon"
          className="container__heart"
          onClick={handleHeartClick}
          src={isFavorite ? redHeart : heart}
        />
      )}
    </div>
  );
};

export default StationIcon;
