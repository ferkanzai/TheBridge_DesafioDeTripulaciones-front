const Button = ({ text = "Button", toggleFilter }) => {
  return (
    <button className="filter-button" onClick={toggleFilter}>
      {text}
    </button>
  );
};

export default Button;
