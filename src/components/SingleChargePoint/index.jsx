import out from "../../svg/out-of-service.svg";

import "./index.scss";

const SingleChargePoint = ({ icon, text, color, size, circleSize }) => {
  return (
    <div className="singleChargePoint">
      <div className="singleChargePoint__icon">
        <img src={icon} alt="" width={size} height={size} />
        {color === "out-of-service" ? (
          <img src={out} alt="" className="singleChargePoint__icon__out" />
        ) : (
          <div
            className="singleChargePoint__icon__circle"
            style={
              color !== "out-of-service"
                ? {
                    backgroundColor: color,
                    width: circleSize,
                    height: circleSize,
                  }
                : null
            }
          ></div>
        )}
      </div>
      <p className="singleChargePoint__text">{text}</p>
    </div>
  );
};

export default SingleChargePoint;
