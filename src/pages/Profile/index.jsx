import { useContext, useState } from "react";
import { UserContext } from "../../store";
import { postAddUserCar } from "../../services/users";
import AddUserCar from "../../components/AddUserCar";
import UserCars from "../../components/UserCars";

const Profile = () => {
  const { user, logout, token } = useContext(UserContext);
  const [carToAdd, setCarToAdd] = useState(null);

  const handleLogout = () => {
    logout();
  };

  const handleFormSubmit = (formValues, resetCb) => {
    postAddUserCar(token, formValues.car).then((res) => {
      setCarToAdd(res[0]);
      // setUserCars((prevUserCars) => [...prevUserCars, res[0]]);
      resetCb();
    });
  };

  return (
    <>
      <h1>Bienvenid@ a mi App! {user.email}</h1>
      <AddUserCar message="ADD CAR" handleFormSubmit={handleFormSubmit} />
      <UserCars carToAdd={carToAdd} />
      <button onClick={handleLogout}>Log out 🔑</button>
    </>
  );
};

export default Profile;
