import "./index.scss";

const PopupCancelReservation = ({
  cancelReservation,
  handleCancelReservationPopup,
}) => {
  return (
    <div className="popupCancelReservation">
      <div className="popupCancelReservation__title">
        <span className="popupCancelReservation__title__text">
          Cancelar Reserva
        </span>
      </div>
      <div className="popupCancelReservation__text">
        <span className="popupCancelReservation__text__bold">
          ¿Seguro que quieres cancelar esta reserva?
        </span>
        <div className="popupCancelReservation__buttons">
          <button
            onClick={cancelReservation}
            className="popupCancelReservation__buttons__extend"
          >
            Cancelar
          </button>
          <button
            onClick={handleCancelReservationPopup}
            className="popupCancelReservation__buttons__no"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCancelReservation;
