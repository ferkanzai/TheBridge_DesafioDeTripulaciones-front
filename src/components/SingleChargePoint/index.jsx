import out from "../../svg/out-of-service.svg";
import chargePoint from "../../svg/charge-point.svg";

import "./index.scss";

const SingleChargePoint = ({ text, color }) => {
  return (
    <div className="singleChargePoint">
      <div className="singleChargePoint__icon">
        <img src={chargePoint} alt="" width={64} height={64} />
        {color === "out-of-service" ? (
          <img src={out} alt="" className="singleChargePoint__icon__out" />
        ) : (
          <div
            className="singleChargePoint__icon__circle"
            style={
              color !== "out-of-service" ? { backgroundColor: color } : null
            }
          ></div>
        )}
      </div>
      <p className="singleChargePoint__text">{text}</p>
    </div>
  );
};

export default SingleChargePoint;
