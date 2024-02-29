import './Form.scss'
import PropTypes from "prop-types";
import ExtraPropTypes from './extraPropTypes.js'
import CheckboxInput from './inputs/Checkbox.jsx'
import { ChromePicker } from 'react-color';
import React from 'react'
import IntegerInput from './inputs/Integer.jsx'

const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern, showRowNumbers } = formData;

  const setValue = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = value;
    setFormData(newFormData);
  }

  const handleColorChangeComplete = (color, index) => {
    console.log(color);
    const newFormData = {...formData};
    newFormData['colorConfig'][index]['color'] = color.hex;
    setFormData(newFormData);
  };

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
          <React.Fragment key={index + 1}>
            Color {(index + 1)}:
            <ChromePicker
              color={colorConfig[index].color}
              disableAlpha={true}
              onChangeComplete={(color) => handleColorChangeComplete(color, index)}
            /> 
            Length: {colorConfig[index].length}
            <br />
          </React.Fragment>
        ))}
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
