import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { getUserCars } from "../../services/users";

import { UserContext } from "../../store";

import carImg from "../../car.png";

import "./index.scss";

const UserCars = ({ car, carToAdd }) => {
  let { token } = useContext(UserContext);

  token = localStorage.getItem("access_token");

  const [userCars, setUserCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);

  useEffect(() => {
    getUserCars(token)
      .then((res) => {
        setUserCars(res);
      })
      .catch((err) => err.code === 401 && setUserCars([]))
      .finally(() => setLoadingCars(false));
  }, [car, carToAdd, token]);

  return (
    <div className="userCars">
      {userCars.length === 1 ? (
        <span className="userCars__title">Este es tu vehículo actual</span>
      ) : (
        <span className="userCars__title">
          Estos son tus vehículos actuales
        </span>
      )}
      <div className="userCars__cars">
        {loadingCars ? (
          <Skeleton width={350} height={162} />
        ) : userCars.length ? (
          userCars.map((car) => (
            <Link
              to={`/settings/${car.user_car_id}`}
              key={car.user_car_id}
              className={
                car.is_primary_car
                  ? "userCars__cars__car userCars__cars__primaryCar"
                  : "userCars__cars__car"
              }
            >
              <img
                src={carImg}
                alt={`${car.name} - ${car.model}`}
                className="userCars__cars__car__image"
              />
              <div className="userCars__cars__car__data">
                <span className="userCars__cars__car__data__name">
                  {car.name}
                </span>
                <span className="userCars__cars__car__data__name">
                  {car.model}
                </span>
                <span className="userCars__cars__car__data__alias">
                  {car.is_primary_car && !car.alias
                    ? "Vehículo principal"
                    : car.alias}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="userCars__noCars">
            <span className="userCars__noCars__text">
              No tienes coches añadidos
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCars;
