import out from "../../svg/out.svg";
import "./index.scss";

const ChargePointLegend = ({ quitLegend }) => {
  return (
    <div className="chargePointLegend">
      <h2 className="chargePointLegend__title">
        tiempos de espera en puntos de carga
      </h2>
      <div className="chargePointLegend__legend">
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <div className="chargePointLegend__legend__type__icon__circle chargePointLegend__legend__type__icon__circle--free"></div>
          </div>
          <p className="chargePointLegend__legend__type__text">libre</p>
        </div>
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <div className="chargePointLegend__legend__type__icon__circle chargePointLegend__legend__type__icon__circle--one"></div>
          </div>
          <p className="chargePointLegend__legend__type__text">
            menos de 5 minutos
          </p>
        </div>
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <div className="chargePointLegend__legend__type__icon__circle chargePointLegend__legend__type__icon__circle--two"></div>
          </div>
          <p className="chargePointLegend__legend__type__text">
            de 5 a 15 minutos
          </p>
        </div>
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <div className="chargePointLegend__legend__type__icon__circle chargePointLegend__legend__type__icon__circle--three"></div>
          </div>
          <p className="chargePointLegend__legend__type__text">
            de 15 a 30 minutos
          </p>
        </div>
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <div className="chargePointLegend__legend__type__icon__circle chargePointLegend__legend__type__icon__circle--four"></div>
          </div>
          <p className="chargePointLegend__legend__type__text">
            de 30 a 45 minutos
          </p>
        </div>
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <div className="chargePointLegend__legend__type__icon__circle chargePointLegend__legend__type__icon__circle--five"></div>
          </div>
          <p className="chargePointLegend__legend__type__text">
            mas de 45 minutos
          </p>
        </div>
        <div className="chargePointLegend__legend__type">
          <div className="chargePointLegend__legend__type__icon">
            <div className="chargePointLegend__legend__type__icon__box"></div>
            <img
              src={out}
              alt=""
              className="chargePointLegend__legend__type__icon__out chargePointLegend__legend__type__icon__out--one"
            />
          </div>
          <p className="chargePointLegend__legend__type__text">
            fuera de servicio
          </p>
        </div>
      </div>
      <button onClick={quitLegend}>Siguiente</button>
    </div>
  );
};

export default ChargePointLegend;
