import { useFormContext } from "react-hook-form";

import "./index.scss";

const ConnectionType = ({ source, value, id, name }) => {
  const { register } = useFormContext();

  return (
    <div className="connectionType">
      <input
        type="checkbox"
        id={id}
        value={value}
        name={id}
        {...register("connectionTypes")}
      />
      <label htmlFor={id} className="connectionType__label">
        <img
          className="connectionType__label__circle-image"
          src={source}
          alt=""
        />
        <span className="connectionType__label__name">{name}</span>
      </label>
    </div>
  );
};

export default ConnectionType;
