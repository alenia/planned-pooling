import PropTypes from "prop-types";

const NumberInput = ({ value, name, label, title, onChange}) => {
      return (
          <div>
            <label htmlFor={name} title={title}>
              {label}
            </label>
            <input
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              onChange={onChange}
              name={name}
              id={name}
              value={value}
            />
          </div>
      )
};

NumberInput.propTypes = {
  value: PropTypes.number,
  name: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
}

export default NumberInput;

