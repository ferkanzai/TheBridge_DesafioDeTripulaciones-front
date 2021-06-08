import ChargePointFullInfo from "../ChargePointFullinfo";
import StationIcon from "../StationIcon";

import { UserContext } from "../../store";

import { getIsFavorite } from "../../services/favorites";

import { chooseSrc } from "../../utils";

import "./index.scss";
import { useContext, useEffect, useState } from "react";

const ChargePointInformation = ({
  chargePoint,
  className,
  hideChargePointInformation,
}) => {
  const { token } = useContext(UserContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    getIsFavorite(token, chargePoint.id).then((res) => {
      console.log(res);
      res.length && setIsFavorite(true);
    });
  }, [token, chargePoint.id]);

  return (
    <div className={`${className}chargePointInformation`}>
      <div className={`${className}chargePointInformation__top`}>
        <StationIcon isFavorite={isFavorite} />
        <div className={`${className}chargePointInformation__top__operator`}>
          <span>{chargePoint.operator}</span>
          <img src={chooseSrc[chargePoint.operator]} alt="" />
        </div>
      </div>
      <div className={`${className}chargePointInformation__info`}>
        <ChargePointFullInfo chargePoint={chargePoint} />
      </div>
      <div className={`${className}chargePointInformation__buttons`}>
        <button
          onClick={hideChargePointInformation}
          className={`${className}chargePointInformation__buttons__cancel`}
        >
          Cancelar
        </button>
        <button
          className={`${className}chargePointInformation__buttons__reserve`}
        >
          Reservar
        </button>
      </div>
    </div>
  );
};

export default ChargePointInformation;
