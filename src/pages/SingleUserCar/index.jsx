import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import {
  deleteRemoveUserCar,
  getSingleUserCarById,
  putChangePrimaryCar,
  putUpdateUserCarAlias,
} from "../../services/users";

import UserCars from "../../components/UserCars";

import carImg from "../../car.png";
import "./index.scss";

const SingleUserCar = () => {
  const token = localStorage.getItem("access_token");

  const { userCarId } = useParams();
  const { handleSubmit, register, reset } = useForm();
  const history = useHistory();
  const [car, setCar] = useState({});
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    getSingleUserCarById(token, userCarId).then((res) => setCar(res[0]));
  }, [token, userCarId]);

  const changePrimary = () => {
    putChangePrimaryCar(token, userCarId)
      .then(() =>
        getSingleUserCarById(token, userCarId).then((res) => setCar(res[0]))
      )
      .catch((err) => console.log(err.message));
  };

  const handleFormSubmit = (formValues) => {
    const { alias, primary } = formValues;
    if (primary) changePrimary();
    if (alias)
      putUpdateUserCarAlias(token, userCarId, alias).then((res) =>
        setCar(res[0])
      );

    reset();
  };

  const handleClickPopup = () => {
    setOpenDelete(!openDelete);
  };

  const removeCar = () => {
    const { user_car_id, is_primary_car } = car;
    if (!is_primary_car) {
      deleteRemoveUserCar(token, user_car_id)
        .then(() => {
          history.push("/profile");
        })
        .catch((err) => (err.code === 401 ? history.push("/profile") : null));
    } else {
      alert("Can't remove primary car");
    }
  };

  return (
    <div className="singleCar">
      <div className="singleCar__car">
        {car && (
          <div className="singleCar__car__info">
            <div className="singleCar__car__info__titlesDiv">
              <h2>Configura tu coche</h2>
              <p>{car.alias || "No alias"}</p>
            </div>
            <div className="singleCar__car__info__imageDiv">
              <img
                src={carImg}
                alt={`${car.name} - ${car.model}`}
                className="singleCar__car__info__imageDiv__image"
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
            placeholder={car.alias || "Cambiar alias"}
            id="alias"
            name="alias"
            {...register("alias")}
            className="singleCar__car__form__alias"
          />
          {car.is_primary_car ? (
            <span className="singleCar__car__form__check">
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
              Modificar
            </button>
            {car.is_primary_car ? (
              <span className="singleCar__car__form__buttons__remove">
                Este coche no se puede eliminar
              </span>
            ) : (
              <button
                onClick={handleClickPopup}
                className="singleCar__car__form__buttons__remove singleCar__car__form__buttons__submit"
              >
                Eliminar coche
              </button>
            )}
          </div>
        </form>
      </div>
      <UserCars car={car} />

      {openDelete && (
        <div className="popup">
          <div className="popup__text">
            <span>¿Estás seguro que quieres eliminar este coche?</span>
            <div className="popup__buttons">
              <button onClick={removeCar}>Sí</button>
              <button onClick={handleClickPopup}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUserCar;
