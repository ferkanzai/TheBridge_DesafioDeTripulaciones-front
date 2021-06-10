import { useContext, useEffect, useState } from "react";

import AddUserCar from "../../components/AddUserCar";
import BackArrow from "../../components/BackArrow";
import SingleUserCar from "../../components/SingleUserCar";
import UserCars from "../../components/UserCars";

import { UserContext } from "../../store";

import { getUserCars, postAddUserCar } from "../../services/users";

import "./index.scss";

const AddCar = () => {
  const { token } = useContext(UserContext);
  const [viewSingleCar, setViewSingleCar] = useState(false);
  const [userCars, setUserCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [singleCar, setSingleCar] = useState(null);

  const handleFormSubmit = (formValues, resetCb) => {
    postAddUserCar(token, formValues.car).then((res) => {
      setUserCars((prevUserCars) => [res[0], ...prevUserCars]);
      resetCb();
    });
  };

  useEffect(() => {
    getUserCars(token)
      .then((res) => {
        setUserCars(res);
      })
      .catch((err) => err.code === 401 && setUserCars([]))
      .finally(() => setLoadingCars(false));
  }, [token]);

  const toggleSingleCarView = (car) => {
    setViewSingleCar(!viewSingleCar);
    if (!viewSingleCar) {
      setSingleCar(car);
    }
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
          <UserCars
            toggleSingleCarView={toggleSingleCarView}
            userCars={userCars}
            loadingCars={loadingCars}
          />
        </div>
        {viewSingleCar && (
          <div>
            <SingleUserCar
              singleCar={singleCar}
              setSingleCar={setSingleCar}
              toggleSingleCarView={toggleSingleCarView}
              setUserCars={setUserCars}
              userCars={userCars}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddCar;
