import PropTypes from "prop-types";
import React from 'react'

const Checkbox = ({ value, name, label, title, setValue}) => {
  const handleChange = (e) => {
    setValue(e.target.name, e.target.checked);
  }
  return (
      <React.Fragment>
        <input
          type="checkbox"
          onChange={handleChange}
          name={name}
          id={name}
          value={value}
        />
        <label htmlFor={name} title={title}>
        {label}
        </label>
      </React.Fragment>
  )
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  setValue: PropTypes.func,
}

export default Checkbox;
