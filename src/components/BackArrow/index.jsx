import { useHistory } from "react-router";

import backArrow from "../../svg/back-arrow.svg";

const BackArrow = ({
  goProfile,
  setIsReservationPage,
  setError,
  className,
}) => {
  const history = useHistory();

  const handleBack = () => {
    if (goProfile) history.push("/profile");
    else {
      setIsReservationPage(false);
      // setError(false);
    }
  };

  return (
    <img
      className={className}
      src={backArrow}
      width={24}
      height={24}
      alt="back arrow"
      onClick={handleBack}
    />
  );
};

export default BackArrow;
