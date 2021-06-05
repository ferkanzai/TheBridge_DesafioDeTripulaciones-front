import { Link } from "react-router-dom";

const SingleLink = ({ icon, text, path, onClick }) => {
  return (
    <div className="profile__icon__links__link" onClick={onClick}>
      <img src={icon} alt={icon} />
      <Link to={path}>{text}</Link>
    </div>
  );
};

export default SingleLink;
