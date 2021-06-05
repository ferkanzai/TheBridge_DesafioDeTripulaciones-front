import { useContext, useEffect, useState } from "react";

import { UserContext } from "../../store";

import { postAddUserCar } from "../../services/users";
import { getFullProfile } from "../../services/auth";

import AddUserCar from "../../components/AddUserCar";
import UserCars from "../../components/UserCars";

import profileIcon from "../../svg/profile-icon.svg";
import LinksList from "../../components/LinksList";

const Profile = () => {
  const [fullUser, setFullUser] = useState(null);
  let { token } = useContext(UserContext);

  const [carToAdd, setCarToAdd] = useState(null);

  token = localStorage.getItem("access_token");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    getFullProfile(token).then((res) => setFullUser(res));
  }, []);

  const handleFormSubmit = (formValues, resetCb) => {
    postAddUserCar(token, formValues.car).then((res) => {
      setCarToAdd(res[0]);
      // setUserCars((prevUserCars) => [...prevUserCars, res[0]]);
      resetCb();
    });
  };

  return (
    <div className="profile">
      <div className="profile__info">
        <p>Perfil</p>
        <div className="profile__info__user">
          <div className="profile__info__user__img-group">
            <div className="profile__info__user__img-group__img"></div>
            <img
              src={profileIcon}
              alt=""
              className="profile__info__user__img-group-icon"
            />
          </div>
          <p>{fullUser && fullUser.name}</p>
        </div>
      </div>
      <LinksList />
      <AddUserCar message="Añadir" handleFormSubmit={handleFormSubmit} />
      <UserCars carToAdd={carToAdd} />
    </div>
  );
};

export default Profile;
