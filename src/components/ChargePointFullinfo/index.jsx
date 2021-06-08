import Rating from "@material-ui/lab/Rating";

import location from "../../svg/location.svg";
import dollar from "../../svg/dollar.svg";
import charge from "../../svg/charge.svg";

import "./index.scss";
import { mappingColors } from "../../utils";

const ChargePointFullInfo = ({ chargePoint }) => {
  return (
    <div className="cpFullInfo">
      <p className="cpFullInfo__name">{chargePoint.name}</p>
      <div className="cpFullInfo__rates">
        <Rating value={chargePoint.rating || 0} size="small" />
        <span>({chargePoint.votes})</span>
      </div>
      <div className="cpFullInfo__data">
        <div className="cpFullInfo__data__line">
          <img src={location} alt="location icon" />
          <p className="cpFullInfo__data__line__text">
            a {chargePoint.distance.toFixed(2)} km
          </p>
        </div>
        <div className="cpFullInfo__data__line">
          <img src={charge} alt="bolt icon" />
          <p className="cpFullInfo__data__line__text">Conectores</p>
        </div>
        <div className="cpFullInfo__data__line">
          <div
            className="cpFullInfo__data__line__circle"
            style={{
              backgroundColor: mappingColors(chargePoint.waiting_time),
            }}
          ></div>
          <p className="cpFullInfo__data__line__text">
            Disponible en {chargePoint.waiting_time} min
          </p>
        </div>
        <div className="cpFullInfo__data__line">
          <img src={dollar} alt="dollar icon" />
          <p className="cpFullInfo__data__line__text">
            Precio de carga ({chargePoint.price.toFixed(2)} €/min)
          </p>
        </div>
        <div className="cpFullInfo__data__line">
          <img src={dollar} alt="dollar icon" />
          <p className="cpFullInfo__data__line__text">
            Última revisión técnica{" "}
            <span>
              {chargePoint.last_verified !== "null"
                ? chargePoint.last_verified
                : "No disponible"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChargePointFullInfo;
