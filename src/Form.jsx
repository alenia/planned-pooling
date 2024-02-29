import './Form.scss'
import PropTypes from "prop-types";
import ExtraPropTypes from './extraPropTypes.js'
import CheckboxInput from './inputs/Checkbox.jsx'
import IntegerInput from './inputs/Integer.jsx'

const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern, showRowNumbers } = formData;

  const setValue = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
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

      <IntegerInput
        label="Stitches per row:"
        title="The number of stitches in one row"
        name="crowLength"
        value={crowLength}
        setValue={setValue}
        validator={IntegerInput.validators.nonNegative}
        />

      <IntegerInput
        label="Color shift:"
        title="Start the swatch this many stitches into your color sequence"
        name="colorShift"
        value={colorShift}
        setValue={setValue}
        />

      <IntegerInput
        label="Number of rows:"
        title="The number of rows displayed"
        name="crows"
        value={crows}
        setValue={setValue}
        validator={IntegerInput.validators.nonNegative}
        />

      <CheckboxInput
        label="Show Row Numbers"
        title="Display row numbers at the beginning of each row."
        name="showRowNumbers"
        value={showRowNumbers}
        setValue={setValue}
        />


      <CheckboxInput
        title={`This will make odd rows of your project one stitch longer than the even rows. With your current settings, odd rows will be ${crowLength+1} stitches long`}
        label="Alternate row lengths (advanced)"
        name="staggerLengths"
        value={staggerLengths}
        setValue={setValue}
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
