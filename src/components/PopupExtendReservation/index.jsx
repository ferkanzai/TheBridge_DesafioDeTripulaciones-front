import clock from "../../svg/clock.svg";

import "./index.scss";

const PopupExtendReservation = ({
  extendReservation,
  handleReservationPopup,
}) => {
  return (
    <div className="popupExtendReservation">
      <div className="popupExtendReservation__title">
        <img src={clock} alt="sand clock icon" />
        <span className="popupExtendReservation__title__text">
          Finalización del tiempo de Reserva
        </span>
      </div>
      <div className="popupExtendReservation__text">
        <span className="popupExtendReservation__text__normal">
          Este punto sigue disponible
        </span>
        <span className="popupExtendReservation__text__bold">
          ¿Quieres reservar este punto más tiempo?
        </span>
        <span className="popupExtendReservation__text__normal">
          precio por ampliar: 0.50€
        </span>
        <div className="popupExtendReservation__buttons">
          <button
            onClick={extendReservation}
            className="popupExtendReservation__buttons__extend"
          >
            Ampliar
          </button>
          <button
            onClick={handleReservationPopup}
            className="popupExtendReservation__buttons__no"
          >
            Ahora no
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupExtendReservation;
