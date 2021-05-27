import { useContext, useState } from "react";
import { UserContext } from "../../store";
import { Redirect } from "react-router-dom";
import Loader from "react-loader-spinner";
import { postAddUserCar } from "../../services/users";
import AddUserCar from "../../components/AddUserCar";
import UserCars from "../../components/UserCars";

const Profile = () => {
  const { user, logout, token, loading } = useContext(UserContext);
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
      {loading ? (
        <Loader
          type="MutatingDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      ) : (
        <>
          {user ? (
            <>
              <h1>Bienvenid@ a mi App! {user.email}</h1>
              <AddUserCar
                message="ADD CAR"
                handleFormSubmit={handleFormSubmit}
              />
              <UserCars carToAdd={carToAdd} />
              <button onClick={handleLogout}>Log out 🔑</button>
            </>
          ) : (
            <>
              <Redirect to="/login" />
            </>
          )}
        </>
      )}
    </>
  );
};

export default Profile;
