import { useContext, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Rating from "@material-ui/lab/Rating";

import OperatorsMenu from "../OperatorsMenu";
import {
  getFilteredAndCompatibleChargePoints,
  getFilteredChargePoints,
} from "../../services/charge-points";
import { UserContext } from "../../store";
import { getUserCars } from "../../services/users";

const FilterPanel = ({ setFilterPanel, lat, lng, setChargePoints }) => {
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
  }, []);

  const handleFormSubmit = (v) => {
    console.log(v);
    const carIds = v.cars && (v.cars === "all" ? userCarIds : userPrimaryCarId);
    console.log(carIds);

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
        console.log(res);
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
        console.log(res);
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

  return (
    <div className="filter-panel">
      <h2>Filtrado</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleFormSubmit)}
          className="filter-panel__options"
        >
          <div className="filter-panel__options__selectors">
            <p>Autonomía restante</p>
            <span>0 km</span>
            <input
              className="filter-panel__options__selectors__distance"
              type="range"
              min="0"
              max="100"
              name="distance"
              id="distance"
              {...methods.register("distance")}
            />
            <span>100 km</span>
            <p>Compañías operadoras</p>
            <OperatorsMenu />
            <p>Puntuación</p>
            <Rating
              {...methods.register("rating")}
              name="rating"
              defaultValue={0}
            />
            <p>Número de cargadores en el punto</p>
            <input
              type="radio"
              id="1"
              name="connections"
              value="1"
              {...methods.register("connections")}
            />
            <label htmlFor="1">1 o mas</label>
            <input
              type="radio"
              id="2"
              name="connections"
              value="2"
              {...methods.register("connections")}
            />
            <label htmlFor="2">2 o mas</label>
            <input
              type="radio"
              id="3"
              name="connections"
              value="3"
              {...methods.register("connections")}
            />
            <label htmlFor="3">3 o mas</label>
            {token && (
              <>
                <label htmlFor="primaryCar">
                  Sólo compatibles con mi coche primario
                </label>
                <input
                  type="radio"
                  id="primaryCar"
                  name="cars"
                  value="primary"
                  {...methods.register("cars")}
                />
                <label htmlFor="allCars">
                  Compatibles con todos mis coches
                </label>
                <input
                  type="radio"
                  id="allCars"
                  name="cars"
                  value="all"
                  {...methods.register("cars")}
                />
              </>
            )}
          </div>
          <div className="filter-panel__options__buttons">
            <button type="submit">Filtrar</button>
            <button type="reset" onClick={handleReset}>
              Resetear
            </button>
          </div>
        </form>
      </FormProvider>
      <button
        className="filter-panel__close"
        onClick={() => setFilterPanel(false)}
      >
        x
      </button>
      {message && (
        <div className="popup">
          <div className="popup__text">
            <span>
              El filtro no ha devuelto resultados, por favor, pruebe otro
              distinto
            </span>
            <div className="popup__buttons">
              <button onClick={() => setMessage(false)}>VALE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
