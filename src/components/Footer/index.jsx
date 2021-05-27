import { Link } from "react-router-dom";
import home from "../../svg/home.svg";
import location from "../../svg/location.svg";
import station from "../../svg/station.svg";
import user from "../../svg/user.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <Link to="/">
        <img src={home} alt="" />
      </Link>
      <Link to="/map">
        <img src={location} alt="" />
      </Link>
      <img src={station} alt="" />
      <Link to="/profile">
        <img src={user} alt="" />
      </Link>
    </footer>
  );
};

export default Footer;
