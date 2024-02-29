import PropTypes from "prop-types";

const IntegerInput = ({ value, name, label, title, setValue, validator = () => true}) => {
  const handleButtonChange = (direction) => {
    let v = value;
    if(direction === "down") {
      v -= 1
    }
    if(direction === "up") {
      v += 1
    }
    if(!validator(v)) { return }
    setValue(name, v)
  }
  const handleChange = (e) => {
    let v = parseInt(e.target.value)
    if (isNaN(value) || !validator(v)) { v = 0 }
    setValue(e.target.name, v);
  }
  return (
      <div className="input-group integer-input">
        <label htmlFor={name} title={title}>
          {label}
        </label>
        <div className="number-spinner">
          <button onClick={() => handleButtonChange("down")}>-</button>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={handleChange}
            name={name}
            id={name}
            value={value}
          />
          <button onClick={() => handleButtonChange("up")}>+</button>
        </div>
      </div>
  )
};


IntegerInput.validators = {
  nonNegative: (v) => v >= 0
}

IntegerInput.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  validator: PropTypes.func,
  setValue: PropTypes.func,
}

export default IntegerInput;

