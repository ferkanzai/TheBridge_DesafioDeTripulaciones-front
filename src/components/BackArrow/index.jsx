import { useHistory } from "react-router";

import backArrow from "../../svg/back-arrow.svg";

const BackArrow = ({ goProfile, setIsReservationPage, setError }) => {
  const history = useHistory();

  const handleBack = () => {
    if (goProfile) history.push("/profile");

    setIsReservationPage(false);
    setError(false);
  };

  return (
    <img
      src={backArrow}
      width={24}
      height={24}
      alt="bacl arrow"
      onClick={handleBack}
    />
  );
};

export default BackArrow;
