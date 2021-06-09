import { useContext, useState } from "react";

import AddUserCar from "../../components/AddUserCar";
import BackArrow from "../../components/BackArrow";
import UserCars from "../../components/UserCars";

import { UserContext } from "../../store";

import { postAddUserCar } from "../../services/users";

import "./index.scss";

const AddCar = () => {
  let { token } = useContext(UserContext);
  const [carToAdd, setCarToAdd] = useState(null);

  token = localStorage.getItem("access_token");

  const handleFormSubmit = (formValues, resetCb) => {
    postAddUserCar(token, formValues.car).then((res) => {
      setCarToAdd(res[0]);
      resetCb();
    });
  };

  return (
    <div className="addCar">
      <div className="addCar__total">
        <div className="addCar__total__top">
          <div className="addCar__total__top__text">
            <span className="addCar__total__top__text__title">
              Añade un vehículo y descubre los puntos de carga compatibles
            </span>
            <BackArrow goProfile={true} />
          </div>
          <div className="addCar__total__top__addControl">
            <AddUserCar message="Añadir" handleFormSubmit={handleFormSubmit} />
          </div>
        </div>
        <div className="addCar__total__userCars">
          <UserCars carToAdd={carToAdd} />
        </div>
      </div>
    </div>
  );
};

export default AddCar;
