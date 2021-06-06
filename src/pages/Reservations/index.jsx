import { useContext } from "react";

import { UserContext } from "../../store";

const Reservations = () => {
  const { token, activeReservation, setActiveReservation } =
    useContext(UserContext);

  const getMin = () => {
    const reservationTime = new Date(
      activeReservation?.reservation_date + 2 * 60 * 60 * 1000
    );

    const min = Number((Date.now() - reservationTime) / 1000 / 60);

    return min.toFixed(0);
  };

  return (
    <div>
      {activeReservation ? (
        <div className="reservations__current">
          <p className="reservations__curret__title">Reserva Actual</p>
          <p>Reserva hecha hace {getMin()} minutos</p>
        </div>
      ) : (
        <h2>No tiene ninguna reserva activa</h2>
      )}
    </div>
  );
};

export default Reservations;
