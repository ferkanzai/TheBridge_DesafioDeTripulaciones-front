import { useHistory } from "react-router";

import backArrow from "../../svg/back-arrow.svg";

const BackArrow = () => {
  const history = useHistory();

  const handleBack = () => history.push("/profile");

  return <img src={backArrow} alt="bacl arrow" onClick={handleBack} />;
};

export default BackArrow;
