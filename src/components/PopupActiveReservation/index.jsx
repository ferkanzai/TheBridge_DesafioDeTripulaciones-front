import "./index.scss";

const PopupActiveReservation = ({ handleClickPopupActiveReservation }) => {
  return (
    <div className="popupActiveReservation">
      <div className="popupActiveReservation__text">
        <span>Reserva activa, no se puede volver a reservar</span>
        <div className="popupActiveReservation__buttons">
          <button onClick={handleClickPopupActiveReservation}>Volver</button>
        </div>
      </div>
    </div>
  );
};

export default PopupActiveReservation;
