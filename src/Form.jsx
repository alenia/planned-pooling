import './Form.scss'
import PropTypes from "prop-types";
import ExtraPropTypes from './extraPropTypes.js'
import CheckboxInput from './inputs/Checkbox.jsx'
import { SketchPicker } from 'react-color';
import IntegerInput from './inputs/Integer.jsx'
import fontColorContrast from 'font-color-contrast';

const Form = ({ formData, setFormData, displayColorPicker, setDisplayColorPicker }) => {
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
    newFormData['colorConfig'].push({color: '#000', length: 3});
    setFormData(newFormData);
  }

  const removeColorFromConfig = (index) => {
    const newFormData = { ...formData };
    newFormData['colorConfig'].splice(index, 1);
    setFormData(newFormData);
  }

  const togglePickerDisplay = (index) => {
    const newPickerDisplay = { ...displayColorPicker };
    newPickerDisplay[index] = !(displayColorPicker[index])
    setDisplayColorPicker(newPickerDisplay);
  }

  const printColorSequenceLength = () => {
    let result = 0;
    for (const i in colorConfig) {
      result += parseInt(colorConfig[i].length);
    }
    return result;
  }

  const presetColors = [...new Set(colorConfig.map((c) => c.color))];

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset className='color-fields'>
        {colorConfig.map((obj, index) => (
          <div className='color-segment' key={index + 1}>
            <label>
              Color {(index + 1)}:
            </label>
            <span
              className='color-preview'
              style={ {
                background: colorConfig[index].color,
                color: fontColorContrast(colorConfig[index].color),
              }}
              onClick={(e) => togglePickerDisplay(index)}
            >
              {colorConfig[index].color}
            </span>
            {
              displayColorPicker[index] ?
                (
                  <div className='popover'>
                    <div className='cover' onClick={(e) => togglePickerDisplay(index)} />
                    <SketchPicker
                      color={colorConfig[index].color}
                      disableAlpha={true}
                      onChangeComplete={(color) => setColorConfigColorValue(color, index)}
                      presetColors={presetColors}
                    /> 
                  </div>
                ) : null
            }
            <IntegerInput
              label="Length:"
              title="The number of stitches in this color segment"
              name={`${index}`}
              value={colorConfig[index].length}
              setValue={setColorConfigLengthValue}
              validator={IntegerInput.validators.nonNegative}
            />
            <button onClick={(e) => removeColorFromConfig(index)}>Remove color</button>
          </div>
        ))}
        <div>
          <button onClick={addColorToConfig}>Add a color</button>
        </div>
      </fieldset>

      <fieldset className='spec-fields'>
        <div>
          Total stitches in color sequence: {printColorSequenceLength()}
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
          className="checkbox-container"
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
      </fieldset>
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
