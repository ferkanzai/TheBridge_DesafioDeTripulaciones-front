import Skeleton from "react-loading-skeleton";

import CarImg from "../CarImg";

import carImg from "../../cars/car.png";
import bmwI4 from "../../cars/bmw-i4.png";
import bmwIX from "../../cars/bmw-ix.png";
import bmwIX3 from "../../cars/bmw-ix3.png";
import mercedesEQA from "../../cars/mercedes-eqa.png";
import mercedesEQV from "../../cars/mercedes-eqv.png";
import mercedesEQS from "../../cars/mercedes-eqs.png";
import tesla3 from "../../cars/tesla-3.png";
import teslaS from "../../cars/tesla-s.jpg";

import "./index.scss";

const chooseCar = {
  "EQA 350 4MATIC": mercedesEQA,
  "EQA 300 4MATIC": mercedesEQA,
  "EQA 250": mercedesEQA,
  "EQV 300 Extra-Long": mercedesEQV,
  "EQV 300 Long": mercedesEQV,
  "EQS 450+": mercedesEQS,
  "EQS 580 4MATIC": mercedesEQS,
  i4: bmwI4,
  iX3: bmwIX3,
  "iX xDrive 40": bmwIX,
  "iX xDrive 50": bmwIX,
  "Model 3 Long Range Dual Motor": tesla3,
  "Model 3 Performance": tesla3,
  "Model 3 Standard Range Plus": tesla3,
  "Model 3 Standard Range Plus LFP": tesla3,
  "Model S Long Range": teslaS,
  "Model S Plaid": teslaS,
  "Model S Plaid+": teslaS,
};

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
              <CarImg
                src={chooseCar[car.model] || carImg}
                className="userCars__cars__car__image"
              />
              {/* <img1
                src={chooseCar[car.model] || carImg}
                alt={`${car.name} - ${car.model}`}
                className="userCars__cars__car__image"
              /> */}
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
