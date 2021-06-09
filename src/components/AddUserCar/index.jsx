import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";

import { getBrands, getCarsByBrand } from "../../services/brands";

import "./index.scss";

const AddUserCar = ({ message = "Subimt form", handleFormSubmit }) => {
  const { handleSubmit, register, reset } = useForm();
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [cars, setCars] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getBrands().then((res) => {
      setBrands(res);
    });
  }, []);

  useEffect(() => {
    if (brand !== "")
      getCarsByBrand(brand.target.value).then((res) => {
        setCars(res);
      });
  }, [brand]);

  return (
    <form
      onSubmit={handleSubmit((v) => handleFormSubmit(v, reset))}
      className="addUserCar"
    >
      <div className="addUserCar__selects">
        <select
          id="brand"
          name="brand"
          {...register("brand", { required: true })}
          onChange={setBrand}
        >
          <option value="0" defaultValue>
            Marca
          </option>
          {brands.length &&
            brands.map((brand) => (
              <option key={brand.id} value={brand.id}>
                {brand.name}
              </option>
            ))}
        </select>
        <select id="car" name="car" {...register("car", { required: true })}>
          <option value="" defaultValue>
            Modelo
          </option>
          {cars.length &&
            cars.map((car) => (
              <option key={car.id} value={car.id}>
                {car.model}
              </option>
            ))}
        </select>
      </div>
      <div className="addUserCar__buttons">
        <button type="submit" className="addUserCar__buttons__add">
          {message}
        </button>
        <button
          className="addUserCar__buttons__later"
          onClick={() => history.push("/profile")}
        >
          Más tarde
        </button>
      </div>
    </form>
  );
};

export default AddUserCar;
