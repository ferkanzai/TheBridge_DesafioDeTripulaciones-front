import { Link, useLocation } from "react-router-dom";
import home from "../../svg/home.svg";
import atHome from "../../svg/atHome.svg";
import routes from "../../svg/routes.svg";
import atRoutes from "../../svg/atRoutes.svg";
import reservations from "../../svg/reservations.svg";
import atReservations from "../../svg/atReservations.svg";
import profile from "../../svg/profile.svg";
import atProfile from "../../svg/atProfile.svg";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <footer className="navbar">
      <Link to="/start">
        <img src={pathname === "/start" ? atHome : home} alt="" />
      </Link>
      <Link to="/map">
        <img src={pathname === "/map" ? atRoutes : routes} alt="" />
      </Link>
      <img
        src={pathname === "/reservations" ? atReservations : reservations}
        alt=""
      />
      <Link to="/profile">
        <img
          src={
            pathname === "/profile" ||
            pathname.includes("/settings/") ||
            pathname === "/add-car"
              ? atProfile
              : profile
          }
          alt=""
        />
      </Link>
    </footer>
  );
};

export default NavBar;
