import './Form.scss'
import PropTypes from "prop-types";
import ExtraPropTypes from './extraPropTypes.js'

const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern } = formData;

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const changeNumber = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = parseInt(value);
    setFormData(newFormData);
  };

  const handleChangePositiveInteger = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(parseInt(value)) || value < 0) { value = 0 }
    changeNumber(e.target.name, value);
  }

  const handleChangeInteger = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(parseInt(value))) { value = 0 }
    changeNumber(e.target.name, value);
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

      <div>
        <label htmlFor="crowLength" title="The number of stitches in one row">
          Stitches per row:
        </label>
        <input
          onChange={handleChangePositiveInteger}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          name="crowLength"
          id="crowLength"
          value={crowLength}
        />
      </div>

      <input
        type="hidden"
        name="crows"
        id="crows"
        value={crows}
      />

      <div>
        <label htmlFor="colorShift" title="Start the swatch this many stitches into your color sequence">
          Color shift:
        </label>
        <input
          onChange={handleChangeInteger}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          name="colorShift"
          id="colorShift"
          value={colorShift}
        />
      </div>

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
  }),
  setFormData: PropTypes.func,
}

export default Form;
