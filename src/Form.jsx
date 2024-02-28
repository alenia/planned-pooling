import './Form.scss'
import PropTypes from "prop-types";
import ExtraPropTypes from './extraPropTypes.js'
import CheckboxInput from './inputs/Checkbox.jsx'
import NumberInput from './inputs/Number.jsx'

const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern, showRowNumbers } = formData;

  const changeValue = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  }

  const handleChangeCheckbox = (e) => {
    changeValue(e.target.name, e.target.checked);
  };

  const handleChangePositiveInteger = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(value) || value < 0) { value = 0 }
    changeValue(e.target.name, value);
  }

  const handleChangeInteger = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(value)) { value = 0 }
    changeValue(e.target.name, value);
  }

  const printColorConfig = () => {
    let result = "";
    for (const i in colorConfig) {
      result += "Color: " + colorConfig[i].color + " Length: " + colorConfig[i].length;
      result += " / "
    }
    return result;
  }

  const printColorSequenceLength = () => {
    let result = 0;
    for (const i in colorConfig) {
      result += parseInt(colorConfig[i].length);
    }
    return result;
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <p>{printColorConfig()}</p>
      </div>

      <div>
        <p>
          Total stitches in color sequence: {printColorSequenceLength()}
        </p>
      </div>

      <NumberInput
        label="Stitches per row:"
        title="The number of stitches in one row"
        name="crowLength"
        value={crowLength}
        onChange={handleChangePositiveInteger}
        />

      <NumberInput
        label="Color shift:"
        title="Start the swatch this many stitches into your color sequence"
        name="colorShift"
        value={colorShift}
        onChange={handleChangeInteger}
        />

      <NumberInput
        label="Number of rows:"
        title="The number of rows displayed"
        name="crows"
        value={crows}
        onChange={handleChangePositiveInteger}
        />

      <CheckboxInput
        label="Show Row Numbers"
        title="Show Row Numbers"
        name="showRowNumbers"
        value={showRowNumbers}
        onChange={handleChangeCheckbox}
        />


      <input
        type="hidden"
        name="staggerLengths"
        id="staggerLengths"
        value={staggerLengths}
      />

      <input
        type="hidden"
        name="stitchPattern"
        id="stitchPattern"
        value={stitchPattern}
      />
    </form>
  );
}

Form.propTypes = {
  formData: PropTypes.shape({
    colorConfig: ExtraPropTypes.colorConfig.isRequired,
    stitchPattern: PropTypes.string, //TODO: Make this an enum
    crowLength: PropTypes.number.isRequired,
    crows: PropTypes.number,
    colorShift: PropTypes.number,
    staggerLengths: PropTypes.bool,
    showRowNumbers: PropTypes.bool,
  }),
  setFormData: PropTypes.func,
}

export default Form;
