import { useEffect, useState } from "react";

import { getFullProfile } from "../../services/auth";

import profileIcon from "../../svg/profile-icon.svg";
import LinksList from "../../components/LinksList";

const Profile = () => {
  const [fullUser, setFullUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    getFullProfile(token).then((res) => setFullUser(res));
  }, []);

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
    </div>
  );
};

export default Profile;
