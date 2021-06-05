import Rating from "@material-ui/lab/Rating";

import { postStartReservation } from "../../services/reservations";

import chargePoint from "../../svg/charge-point.svg";

import "./index.scss";

const ChargePointInformation = ({
  singleChargePoint,
  hideChargePointInformation,
  className,
}) => {
  const handleReservation = (connectionId) => {
    const token = localStorage.getItem("access_token");
    postStartReservation(token, connectionId);
  };

  return (
    <div className={className}>
      <div className="chargePointInformation__pic">
        <img
          src={chargePoint}
          className="chargePointInformation__pic__svg"
          alt=""
        />
      </div>
      <p>{singleChargePoint.name}</p>
      <p>tiempo de espera: {singleChargePoint.waiting_time} minutos</p>
      <p>Operador: {singleChargePoint.operator}</p>
      <p>Distancia: {singleChargePoint.distance.toFixed(2)} km</p>
      <p>Precio de carga ({singleChargePoint.price.toFixed(2)}€/min)</p>
      <p>Valoraciones de los usuarios:</p>
      <Rating defaultValue={singleChargePoint.rating || 0} readOnly={true} />
      <p>({singleChargePoint.votes})</p>
      <p>
        Última revisión técnica del cargador:{" "}
        {singleChargePoint.last_verified
          ? new Date(singleChargePoint.last_verified).toLocaleString()
          : "No disponible"}
      </p>
      <button onClick={hideChargePointInformation}>Cancelar</button>
      <button onClick={handleReservation}>Reservar</button>
    </div>
  );
};

export default ChargePointInformation;
