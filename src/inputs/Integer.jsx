import PropTypes from "prop-types";
import React from 'react'

const IntegerInput = ({ value, name, label, title, setValue, validator = () => true}) => {
  const handleChange = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(value) || !validator(value)) { value = 0 }
    setValue(e.target.name, value);
  }
  return (
      <React.Fragment>
        <label htmlFor={name} title={title}>
          {label}
        </label>
        <input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          onChange={handleChange}
          name={name}
          id={name}
          value={value}
        />
      </React.Fragment>
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

