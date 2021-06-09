import { useContext } from "react";

import SingleChargePoint from "../SingleChargePoint";

import { UserContext } from "../../store";

import arrow from "../../svg/arrow.svg";
import chargePoint from "../../svg/charge-point.svg";

import "./index.scss";

const ChargePointLegend = ({ quitLegend, showLegendNoMore }) => {
  const { showNoMore } = useContext(UserContext);

  return (
    <div className="chargePointLegend">
      <h2 className="chargePointLegend__title">
        Tiempos de espera en puntos de carga
      </h2>
      <div className="chargePointLegend__legend">
        <SingleChargePoint
          circleSize={30}
          color="#1dae69"
          icon={chargePoint}
          size={64}
          text="Libre"
        />
        <SingleChargePoint
          circleSize={30}
          color="#c5d22a"
          icon={chargePoint}
          size={64}
          text="Menos de 15 min"
        />
        <SingleChargePoint
          circleSize={30}
          color="#fad966"
          icon={chargePoint}
          size={64}
          text="De 15 a 30 min"
        />
        <SingleChargePoint
          circleSize={30}
          color="#B75454"
          icon={chargePoint}
          size={64}
          text="De 30 a 40 min"
        />
        <SingleChargePoint
          color="out-of-service"
          icon={chargePoint}
          size={64}
          text="Fuera de servicio"
        />
      </div>
      <img
        src={arrow}
        alt="close"
        onClick={quitLegend}
        className="chargePointLegend__close"
      />
      {!showNoMore && (
        <span
          className="chargePointLegend__hideNoMore"
          onClick={showLegendNoMore}
        >
          No volver a mostrar
        </span>
      )}
    </div>
  );
};

export default ChargePointLegend;
