import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  deleteRemoveUserCar,
  getSingleUserCarById,
  putChangePrimaryCar,
  putUpdateUserCarAlias,
} from "../../services/users";

import { UserContext } from "../../store";

import carImg from "../../cars/car.png";
import bmwI4 from "../../cars/bmw-i4.png";
import bmwIX from "../../cars/bmw-ix.png";
import bmwIX3 from "../../cars/bmw-ix3.png";
import mercedesEQA from "../../cars/mercedes-eqa.png";
import mercedesEQV from "../../cars/mercedes-eqv.png";
import mercedesEQS from "../../cars/mercedes-eqs.png";
import tesla3 from "../../cars/tesla-3.png";
import teslaS from "../../cars/tesla-s.jpg";

import arrowDown from "../../svg/arrow-down.svg";

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

const SingleUserCar = ({
  singleCar,
  setSingleCar,
  toggleSingleCarView,
  setUserCars,
  userCars,
}) => {
  const { token } = useContext(UserContext);
  const { handleSubmit, register, reset } = useForm();
  const history = useHistory();
  const [openDelete, setOpenDelete] = useState(false);

  const changePrimary = () => {
    putChangePrimaryCar(token, singleCar.user_car_id)
      .then(() =>
        getSingleUserCarById(token, singleCar.user_car_id).then((res) =>
          setSingleCar(res[0])
        )
      )
      .catch((err) => console.log(err.message));
  };

  const handleFormSubmit = (formValues) => {
    const { alias, primary } = formValues;
    if (primary && !singleCar.is_primary_car) changePrimary();
    if (alias)
      putUpdateUserCarAlias(token, singleCar.user_car_id, alias).then((res) =>
        setSingleCar(res[0])
      );

    reset();
  };

  const handleClickPopup = () => {
    setOpenDelete(!openDelete);
  };

  const removeCar = () => {
    const { user_car_id, is_primary_car } = singleCar;
    if (!is_primary_car) {
      deleteRemoveUserCar(token, user_car_id)
        .then((res) => {
          setUserCars(
            userCars.filter((userCar) => userCar.user_car_id !== user_car_id)
          );
          setOpenDelete(false);
          toggleSingleCarView();
        })
        .catch((err) => (err.code === 401 ? history.push("/profile") : null));
    } else {
      alert("Can't remove primary car");
    }
  };

  return (
    <div className="singleCar">
      <img
        src={arrowDown}
        alt=""
        className="singleCar__arrow"
        onClick={toggleSingleCarView}
      />
      <div className="singleCar__car">
        {singleCar && (
          <div className="singleCar__car__info">
            <div className="singleCar__car__info__titles">
              <span className="singleCar__car__info__titles__title">
                Edita tu vehículo
              </span>
              <div className="singleCar__car__info__titles__carInfo">
                <span>{singleCar.name}</span>
                <span>{singleCar.model}</span>
              </div>
            </div>
            <div className="singleCar__car__info__images">
              <img
                src={chooseCar[singleCar.model] || carImg}
                alt={`${singleCar.name} - ${singleCar.model}`}
                className="singleCar__car__info__images__image"
              />
            </div>
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="singleCar__car__form"
        >
          <input
            type="text"
            placeholder={
              singleCar.alias
                ? `Alias actual: ${singleCar.alias}`
                : "Cambiar alias"
            }
            id="alias"
            name="alias"
            {...register("alias")}
            className="singleCar__car__form__alias"
          />
          {singleCar.is_primary_car ? (
            <span className="singleCar__car__form__principal">
              Este coche ya es el coche principal
            </span>
          ) : (
            <div className="singleCar__car__form__check">
              <input
                type="checkbox"
                id="primary"
                name="primary"
                {...register("primary")}
              />
              <label htmlFor="primary">Seleccionar como coche principal</label>
            </div>
          )}
          <div className="singleCar__car__form__buttons">
            <button
              type="submit"
              className="singleCar__car__form__buttons__submit"
            >
              Cambiar
            </button>
            {singleCar.is_primary_car ? (
              <span className="singleCar__car__form__buttons__noRemove">
                Este coche no se puede eliminar
              </span>
            ) : (
              <button
                onClick={handleClickPopup}
                className="singleCar__car__form__buttons__remove"
              >
                Eliminar coche
              </button>
            )}
          </div>
        </form>
      </div>

      {openDelete && (
        <div className="popup">
          <div className="popup__text">
            <span>¿Estás seguro que quieres eliminar este coche?</span>
            <div className="popup__buttons">
              <button onClick={removeCar} className="popup__buttons__remove">
                Eliminar
              </button>
              <button onClick={handleClickPopup} className="popup__buttons__no">
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUserCar;
