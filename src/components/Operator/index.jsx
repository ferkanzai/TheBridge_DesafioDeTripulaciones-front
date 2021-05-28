import { useFormContext } from "react-hook-form";
import "./index.scss";

const Operator = ({ source, name, value, id }) => {
  const { register } = useFormContext();

  return (
    <div className="operator">
      <input
        type="checkbox"
        id={id}
        value={value}
        name={id}
        {...register("operators")}
      />
      <label htmlFor={id} className="operator__label">
        <img className="operator__label__circle-image" src={source} alt="" />
        <p className="operator__label__name">{name}</p>
      </label>
    </div>
  );
};

export default Operator;
