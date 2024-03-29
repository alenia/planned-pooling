import './Form.scss'
import CheckboxInput from './inputs/Checkbox'
import TogglableColorPicker from './inputs/TogglableColorPicker'
import IntegerInput from './inputs/Integer'
import { Color, SwatchConfig } from './types'
import { getRandomNotWhiteColor, totalColorSequenceLength } from './color'

type FormValue = keyof(SwatchConfig)

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
  { swatchData, setSwatchData, staggerType, showExperimentalFeatures } :
  {
    swatchData: SwatchConfig,
    setSwatchData: (data: SwatchConfig) => void,
    staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed',
    showExperimentalFeatures: boolean
  }
) {

  const { colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths, stitchPattern } = swatchData;

  const setFormValue = (name: FormValue, value : string | number | boolean) => {
    setSwatchData({ ...swatchData, [name]: value});
  }

  //color fields specific
  const setColorSequenceLengthValue = (index : number, value : number) => {
    const newSwatchData = { ...swatchData };
    newSwatchData['colorSequence'][index]['length'] = value;
    setSwatchData(newSwatchData);
  }

  const setColorSequenceColorValue = (color : Color, index : number) => {
    const newSwatchData = {...swatchData};
    newSwatchData['colorSequence'][index]['color'] = color;
    setSwatchData(newSwatchData);
  };

  const removeColorFromSequence = (index: number) => {
    const newSwatchData = { ...swatchData };
    newSwatchData['colorSequence'].splice(index, 1);
    setSwatchData(newSwatchData);
  }

  const addColorToSequence = () => {
    const newSwatchData = { ...swatchData };
    newSwatchData['colorSequence'].push({color: getRandomNotWhiteColor(), length: 3});
    setSwatchData(newSwatchData);
  }

  const duplicateColorSequence = () => {
    const newSwatchData = {
      ...swatchData,
      colorSequence: [...swatchData.colorSequence, ...structuredClone(swatchData.colorSequence)]
    };
    setSwatchData(newSwatchData);
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
