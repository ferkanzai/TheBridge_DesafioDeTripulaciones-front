import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core";

import OperatorsMenu from "../OperatorsMenu";

import {
  getFilteredAndCompatibleChargePoints,
  getFilteredChargePoints,
} from "../../services/charge-points";
import { getUserCars } from "../../services/users";

import { UserContext } from "../../store";

import exit from "../../svg/exit.svg";

import "./index.scss";

const FilterPanel = ({
  setFilterPanel,
  lat,
  lng,
  setChargePoints,
  className,
}) => {
  let { token } = useContext(UserContext);
  const methods = useForm();
  const [message, setMessage] = useState(false);
  const [userCarIds, setUserCarIds] = useState([]);
  const [userPrimaryCarId, setUserPrimaryCarId] = useState([]);

  token = localStorage.getItem("access_token");

  useEffect(() => {
    if (token)
      getUserCars(token).then((res) => {
        setUserCarIds(Array.from(new Set(res.map((car) => car.car_id))));
        setUserPrimaryCarId(
          res.filter((car) => car.is_primary_car).map((car) => car.car_id)
        );
      });
  }, [token]);

  const handleFormSubmit = (v) => {
    const carIds = v.cars && (v.cars === "all" ? userCarIds : userPrimaryCarId);

    if (carIds) {
      getFilteredAndCompatibleChargePoints(
        token,
        lat,
        lng,
        v.distance,
        v.rating,
        v.connections,
        v.operators,
        carIds
      ).then((res) => {
        if (res.length === 0) {
          setMessage(true);
        } else {
          setChargePoints(res);
          setFilterPanel(false);
        }
      });
    } else {
      getFilteredChargePoints(
        lat,
        lng,
        v.distance,
        v.rating,
        v.connections,
        v.operators
      ).then((res) => {
        if (res.length === 0) {
          setMessage(true);
        } else {
          setChargePoints(res);
          setFilterPanel(false);
        }
      });
    }
  };

  const handleReset = () => {
    methods.reset();
  };

  const StyledRating = withStyles({
    root: {
      color: "#50B7AF",
    },
  })(Rating);

  return (
    <div className={`${className}filter-panel`}>
      <img
        alt="exit button"
        className={`${className}filter-panel__close`}
        onClick={() => setFilterPanel(false)}
        src={exit}
      />
      <p className={`${className}filter-panel__title`}>Filtrado</p>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className={`${className}filter-panel__options`}
        >
          <div className={`${className}filter-panel__options__selectors`}>
            <div
              className={`${className}filter-panel__options__selectors__range`}
            >
              <p>Autonomía restante de mi vehículo</p>
              <div
                className={`${className}filter-panel__options__selectors__range__slider`}
              >
                <input
                  className={`${className}filter-panel__options__selectors__range__slider__distance`}
                  type="range"
                  min="0"
                  max="100"
                  name="distance"
                  id="distance"
                  {...methods.register("distance")}
                />
                <div
                  className={`${className}filter-panel__options__selectors__range__slider__labels`}
                >
                  <span>0 km</span>
                  <span>100 km</span>
                </div>
              </div>
            </div>
            <p>Mejor puntuados por los usuarios</p>
            <StyledRating
              {...methods.register("rating")}
              name="rating"
              defaultValue={0}
            />
            <p>Compañías operadoras</p>
            <OperatorsMenu />
            <div
              className={`${className}filter-panel__options__selectors__checkbox`}
            >
              <p>Nº de cargadores en el punto</p>
              <div
                className={`${className}filter-panel__options__selectors__checkbox__line`}
              >
                <input
                  type="radio"
                  id="1"
                  name="connections"
                  value="1"
                  {...methods.register("connections")}
                />
                <label htmlFor="1">1+</label>
              </div>
              <div
                className={`${className}filter-panel__options__selectors__checkbox__line`}
              >
                <input
                  type="radio"
                  id="2"
                  name="connections"
                  value="2"
                  {...methods.register("connections")}
                />
                <label htmlFor="2">2+</label>
              </div>
              <div
                className={`${className}filter-panel__options__selectors__checkbox__line`}
              >
                <input
                  type="radio"
                  id="3"
                  name="connections"
                  value="3"
                  {...methods.register("connections")}
                />
                <label htmlFor="3">3+</label>
              </div>
            </div>
            {token && (
              <div
                className={`${className}filter-panel__options__selectors__checkbox`}
              >
                <div
                  className={`${className}filter-panel__options__selectors__checkbox__line`}
                >
                  <input
                    type="radio"
                    id="primaryCar"
                    name="cars"
                    value="primary"
                    {...methods.register("cars")}
                  />
                  <label htmlFor="primaryCar">
                    Sólo compatibles con mi coche primario
                  </label>
                </div>
                <div
                  className={`${className}filter-panel__options__selectors__checkbox__line`}
                >
                  <input
                    type="radio"
                    id="allCars"
                    name="cars"
                    value="all"
                    {...methods.register("cars")}
                  />
                  <label htmlFor="allCars">
                    Compatibles con todos mis coches
                  </label>
                </div>
              </div>
            )}
          </div>
          <div className={`${className}filter-panel__options__buttons`}>
            <button
              type="reset"
              className={`${className}filter-panel__options__buttons__reset`}
              onClick={handleReset}
            >
              Limpiar
            </button>
            <button
              type="submit"
              className={`${className}filter-panel__options__buttons__filter`}
            >
              Aplicar
            </button>
          </div>
        </form>
      </FormProvider>
      {message && (
        <div className="popup">
          <div className="popup__text">
            <span>
              El filtro no ha devuelto resultados, por favor, pruebe otro
              distinto
            </span>
            <div className="popup__buttons">
              <button onClick={() => setMessage(false)}>volver</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
