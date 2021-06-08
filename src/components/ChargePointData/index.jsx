import { useEffect, useState } from "react";
import Rating from "@material-ui/lab/Rating";

import { getConenctionsByChargePoint } from "../../services/connections";

import { mappingColors } from "../../utils";

import location from "../../svg/location.svg";
import dollar from "../../svg/dollar.svg";
import charge from "../../svg/charge.svg";

import "./index.scss";

const ChargePointData = ({ chargePoint }) => {
  const [connectionTypes, setConnectionsTypes] = useState([]);

  useEffect(() => {
    getConenctionsByChargePoint(chargePoint.id).then((res) => {
      const connectionsTypes = res.map(
        (connection) => connection.connection_type
      );
      const nonRepeatedConnectionsTypes = Array.from(new Set(connectionsTypes));

      setConnectionsTypes(nonRepeatedConnectionsTypes);
    });
  }, [chargePoint]);

  return (
    <div className="cpFullInfo">
      <div className="cpFullInfo__title">
        <p className="cpFullInfo__title__name">{chargePoint.name}</p>
        <div className="cpFullInfo__title__rates">
          <Rating
            value={chargePoint.rating || 0}
            size="small"
            readOnly={true}
          />
          <span className="cpFullInfo__grey">({chargePoint.votes})</span>
        </div>
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
          <p className="cpFullInfo__data__line__text">
            Conectores{" "}
            {connectionTypes &&
              connectionTypes.map((connectionType, i, array) =>
                i !== array.length - 1 ? (
                  <span key={connectionType} className="cpFullInfo__grey">
                    {connectionType},{" "}
                  </span>
                ) : (
                  <span key={connectionType} className="cpFullInfo__grey">
                    {connectionType}
                  </span>
                )
              )}
          </p>
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
            <span className="cpFullInfo__grey">
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

export default ChargePointData;
