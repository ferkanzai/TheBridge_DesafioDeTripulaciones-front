import close from "../../svg/close.svg";

import "./index.scss";
import SingleChargePoint from "../SingleChargePoint";

const ChargePointLegend = ({ quitLegend }) => {
  return (
    <div className="chargePointLegend">
      <h2 className="chargePointLegend__title">
        Tiempos de espera en puntos de carga
      </h2>
      <div className="chargePointLegend__legend">
        <SingleChargePoint text="Libre" color="#1dae69" />
        <SingleChargePoint text="Menos de 15 min" color="#c5d22a" />
        <SingleChargePoint text="De 15 a 30 min" color="#fad966" />
        <SingleChargePoint text="De 30 a 40 min" color="#B75454" />
        <SingleChargePoint text="Fuera de servicio" color="out-of-service" />
      </div>
      <img
        src={close}
        alt="close"
        onClick={quitLegend}
        className="chargePointLegend__close"
      />
    </div>
  );
};

export default ChargePointLegend;
