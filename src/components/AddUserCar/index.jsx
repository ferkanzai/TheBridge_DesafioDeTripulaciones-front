import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getBrands, getCarsByBrand } from "../../services/brands";

const AddUserCar = ({ message = "Subimt form", handleFormSubmit }) => {
  const { handleSubmit, register, reset } = useForm();
  const [brands, setBrands] = useState([]);
  const [brand, setBrand] = useState("");
  const [cars, setCars] = useState([]);

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
    <form onSubmit={handleSubmit((v) => handleFormSubmit(v, reset))}>
      <label htmlFor="Brand">Brand</label>
      <select
        id="brand"
        name="brand"
        {...register("brand", { required: true })}
        onChange={setBrand}
      >
        <option value="0" defaultValue>
          Select a brand
        </option>
        {brands.length &&
          brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
      </select>
      <br />
      <label htmlFor="Model">Model</label>
      <select id="car" name="car" {...register("car", { required: true })}>
        <option value="" defaultValue>
          Select a car
        </option>
        {cars.length &&
          cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.model}
            </option>
          ))}
      </select>
      <br />
      <button type="submit">{message}</button>
    </form>
  );
};

export default AddUserCar;
