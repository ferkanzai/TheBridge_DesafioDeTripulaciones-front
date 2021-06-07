import { useContext } from "react";
import { differenceInMinutes } from "date-fns";

import { UserContext } from "../../store";

const Reservations = () => {
  const { activeReservation } = useContext(UserContext);

  const getMin = () => {
    const reservationTime = new Date(
      activeReservation?.reservation_date + 2 * 60 * 60 * 1000
    );

    const min = differenceInMinutes(Date.now(), reservationTime);

    return min;
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
