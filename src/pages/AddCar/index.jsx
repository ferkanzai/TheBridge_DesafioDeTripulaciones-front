import { useContext, useState } from "react";

import AddUserCar from "../../components/AddUserCar";
import UserCars from "../../components/UserCars";

import { UserContext } from "../../store";

import { postAddUserCar } from "../../services/users";
import BackArrow from "../../components/BackArrow";

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
    <>
      <BackArrow goProfile={true} />
      <AddUserCar message="Añadir" handleFormSubmit={handleFormSubmit} />
      <UserCars carToAdd={carToAdd} />
    </>
  );
};

export default AddCar;
