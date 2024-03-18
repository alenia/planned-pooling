import './Form.scss'
import CheckboxInput from './inputs/Checkbox'
import TogglableColorPicker from './inputs/TogglableColorPicker'
import IntegerInput from './inputs/Integer'
import { StitchPattern, Color, ColorSequenceArray } from './types'
import { getRandomNotWhiteColor, totalColorSequenceLength } from './color'

type SwatchConfigurationData = {
  colorSequence: ColorSequenceArray,
  stitchesPerRow: number,
  stitchPattern: StitchPattern,
  numberOfRows: number,
  colorShift: number,
  staggerLengths: boolean,
  showRowNumbers: boolean
}

type FormValue = keyof(SwatchConfigurationData)

function mod(n: number, m: number) {
  // because native JS % operator chokes on negatives
  return ((n % m) + m) % m;
}

const defaultPickerColors = [
  "#d9073a",
  "#f57605",
  "#fcdc4d",
  "#a1c349",
  "#1c40b8",
  "#7b0f9a",
  "#542e0f",
  "#fdf0d5"
]

function Form(
  { formData, setFormData, staggerType, showExperimentalFeatures } :
  {
    formData: SwatchConfigurationData,
    setFormData: (data: SwatchConfigurationData) => void,
    staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed',
    showExperimentalFeatures: boolean
  }
) {

  const { colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths, stitchPattern } = formData;

  const setFormValue = (name: FormValue, value : string | number | boolean) => {
    setFormData({ ...formData, [name]: value});
  }

  //color fields specific
  const setColorSequenceLengthValue = (index : number, value : number) => {
    const newFormData = { ...formData };
    newFormData['colorSequence'][index]['length'] = value;
    setFormData(newFormData);
  }

  const setColorSequenceColorValue = (color : Color, index : number) => {
    const newFormData = {...formData};
    newFormData['colorSequence'][index]['color'] = color;
    setFormData(newFormData);
  };

  const removeColorFromSequence = (index: number) => {
    const newFormData = { ...formData };
    newFormData['colorSequence'].splice(index, 1);
    setFormData(newFormData);
  }

  const addColorToSequence = () => {
    const newFormData = { ...formData };
    newFormData['colorSequence'].push({color: getRandomNotWhiteColor(), length: 3});
    setFormData(newFormData);
  }

  const duplicateColorSequence = () => {
    const newFormData = {
      ...formData,
      colorSequence: [...formData.colorSequence, ...structuredClone(formData.colorSequence)]
    };
    setFormData(newFormData);
  }

  const presetColors = [...new Set([...defaultPickerColors, ...colorSequence.map((c) => c.color)])];

  //spec fields specific
  const colorShiftTooltip = () => {
    let tip = "Start the swatch this many stitches into your color sequence."
    const seqLength = totalColorSequenceLength(colorSequence)
    const equiv = mod(colorShift, seqLength)
    if (colorShift === 0 || (0 <= colorShift && colorShift < seqLength) || isNaN(equiv)) {
      // do nothing
    } else if (colorShift !== equiv) {
      tip = tip + ` \n\nWith ${seqLength} stitches in your color sequence, this is the same as shifting by ${equiv}.`
    }
    return tip
  }

  const staggerLengthsTooltip = () => {
    let tip = "";
    if (staggerType === "colorStretched") {
      tip = "In the current mode, alternating row lengths uses the color stretching technique instead of changing lengths of rows."
    } else {
      tip = `This will make odd rows of your project one stitch longer than the even rows. \n\nWith your current settings, odd rows will be ${stitchesPerRow+1} stitches long.`
    }
    return tip
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset className='color-fields'>
        {colorSequence.map((obj, index) => (
          <div className='color-segment' key={index + 1}>
            <label>
              Color {(index + 1)}:
            </label>
            <TogglableColorPicker
              value = {colorSequence[index].color}
              setValue={(color) => setColorSequenceColorValue(color, index)}
              presetColors = { presetColors }
              />
            <IntegerInput
              label="Length:"
              title="The number of stitches in this color segment"
              name={`${index}`}
              value={colorSequence[index].length}
              setValue={(v: number) => setColorSequenceLengthValue(index, v)}
              validator={IntegerInput.validators.nonNegative}
            />
            <button type="button" onClick={() => removeColorFromSequence(index)}>Remove color</button>
          </div>
        ))}
        <div className="color-buttons">
          <button type="button" onClick={addColorToSequence}>Add a color</button>
          { showExperimentalFeatures ? <button type="button" onClick={duplicateColorSequence}>Double the colors</button> : ''}
        </div>
      </fieldset>

      <fieldset className='spec-fields'>
        <div>
          <em>
            Total stitches in color sequence: {totalColorSequenceLength(colorSequence)}
          </em>
        </div>

        <IntegerInput
          label="Stitches per row:"
          title="The number of stitches in one row"
          name="stitchesPerRow"
          value={stitchesPerRow}
          setValue={(v : number) => setFormValue('stitchesPerRow', v)}
          validator={IntegerInput.validators.nonNegative}
          />

        <IntegerInput
          label="Number of rows:"
          title="The number of rows displayed"
          name="numberOfRows"
          value={numberOfRows}
          setValue={(v: number) => setFormValue('numberOfRows', v)}
          validator={IntegerInput.validators.nonNegative}
          />

        <input
          type="hidden"
          name="stitchPattern"
          id="stitchPattern"
          value={stitchPattern}
        />

        <IntegerInput
          label="Color shift:"
          title={colorShiftTooltip()}
          name="colorShift"
          value={colorShift}
          setValue={(v : number) => setFormValue('colorShift', v)}
          withTooltip={true}
          />

        <CheckboxInput
          className="checkbox-container"
          title={staggerLengthsTooltip()}
          label="Alternate row lengths"
          name="staggerLengths"
          value={staggerLengths}
          setValue={(v: boolean) => setFormValue('staggerLengths', v)}
          withTooltip={true}
        />
      </fieldset>
    </form>
  )
}

export default Form
