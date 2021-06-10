import Skeleton from "react-loading-skeleton";

import { chooseCar } from "../../utils";

import carImg from "../../cars/car.png";

import "./index.scss";

const UserCars = ({ toggleSingleCarView, userCars, loadingCars }) => {
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
            <div
              onClick={() => toggleSingleCarView(car)}
              key={car.user_car_id}
              className={
                car.is_primary_car
                  ? "userCars__cars__car userCars__cars__primaryCar"
                  : "userCars__cars__car"
              }
            >
              <img
                src={chooseCar[car.model] || carImg}
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
            </div>
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
