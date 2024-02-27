import PropTypes from "prop-types";

const Checkbox = ({ value, name, label, title, onChange}) => {
      return (
          <div>
            <input
              type="checkbox"
              onChange={onChange}
              name={name}
              id={name}
              value={value}
            />
            <label htmlFor={name} title={title}>
            {label}
            </label>
          </div>
      )
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
}

export default Checkbox;
