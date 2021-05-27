import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import { getUserCars } from "../../services/users";

import carImg from "../../car.png";
import gear from "../../svg/gear.svg";

import "./index.scss";
import { UserContext } from "../../store";

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
      <h3>Estos son tus coches actuales</h3>
      <div className="userCars__cars">
        {loadingCars ? (
          <Skeleton width={350} height={162} />
        ) : userCars.length ? (
          userCars.map((car) => (
            <div
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
              <p className="userCars__cars__car__alias">
                {car.alias || `${car.name} - ${car.model}`}
              </p>
              <Link
                to={`/settings/${car.user_car_id}`}
                className="userCars__cars__car__settings"
              >
                <img src={gear} alt="setting" />
              </Link>
            </div>
          ))
        ) : (
          "No tienes coches añadidos"
        )}
      </div>
    </div>
  );
};

export default UserCars;
