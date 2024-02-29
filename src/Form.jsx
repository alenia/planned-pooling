import './Form.scss'
import PropTypes from "prop-types";
import ExtraPropTypes from './extraPropTypes.js'
import CheckboxInput from './inputs/Checkbox.jsx'
import { ChromePicker } from 'react-color';
import IntegerInput from './inputs/Integer.jsx'

const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern, showRowNumbers } = formData;

  const setValue = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  }

  const setColorConfigLengthValue = (index, value) => {
    const newFormData = { ...formData };
    newFormData['colorConfig'][index]['length'] = value;
    setFormData(newFormData);
  }

  const setColorConfigColorValue = (color, index) => {
    const newFormData = {...formData};
    newFormData['colorConfig'][index]['color'] = color.hex;
    setFormData(newFormData);
  };

  const addColorToConfig = () => {
    const newFormData = { ...formData };
    newFormData['colorConfig'].push({color: '#000', length: 0});
    setFormData(newFormData);
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
        {colorConfig.map((obj, index) => (
          <div key={index + 1}>
            <label>Color {(index + 1)}:</label>
            <ChromePicker
              color={colorConfig[index].color}
              disableAlpha={true}
              onChangeComplete={(color) => setColorConfigColorValue(color, index)}
            /> 
            <IntegerInput
              label="Length:"
              title="The number of stitches in this color segment"
              name={`${index}`}
              value={colorConfig[index].length}
              setValue={setColorConfigLengthValue}
              validator={IntegerInput.validators.nonNegative}
            />
          </div>
        ))}
        <div>
          <button onClick={addColorToConfig}>Add a color</button>
        </div>
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
        title="Show Row Numbers"
        name="showRowNumbers"
        value={showRowNumbers}
        setValue={setValue}
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
