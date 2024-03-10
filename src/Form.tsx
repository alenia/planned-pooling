import './Form.scss'
import CheckboxInput from './inputs/Checkbox'
import TogglableColorPicker from './inputs/TogglableColorPicker'
import IntegerInput from './inputs/Integer'
import { Color, SwatchConfig } from './types'
import { getRandomNotWhiteColor, totalColorSequenceLength } from './color'

type DisplayData = {
  showRowNumbers: boolean
}

type FormValue = keyof(SwatchConfig) | keyof(DisplayData)

const Form = (
  { swatchData, setSwatchData, displayData, setDisplayData } :
  {
    swatchData: SwatchConfig,
    setSwatchData: (data: SwatchConfig) => void,
    displayData: DisplayData,
    setDisplayData: (data: DisplayData) => void
  }
) => {

  const { colorSequence, stitchesPerRow, numberOfRows, colorShift, staggerLengths, stitchPattern } = swatchData;
  const { showRowNumbers } = displayData;

  const setFormValue = (name: FormValue, value : string | number | boolean) => {
    if(Object.keys(swatchData).includes(name)) {
      setSwatchData({ ...swatchData, [name]: value});
    } else if(Object.keys(displayData).includes(name)) {
      setDisplayData({ ...displayData, [name]: value});
    }
  }

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

  const addColorToSequence = () => {
    const newSwatchData = { ...swatchData };
    newSwatchData['colorSequence'].push({color: getRandomNotWhiteColor(), length: 3});
    setSwatchData(newSwatchData);
  }

  const removeColorFromSequence = (index: number) => {
    const newSwatchData = { ...swatchData };
    newSwatchData['colorSequence'].splice(index, 1);
    setSwatchData(newSwatchData);
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
  const presetColors = [...new Set([...defaultPickerColors, ...colorSequence.map((c) => c.color)])];

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
        <div>
          <button type="button" onClick={addColorToSequence}>Add a color</button>
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
          title="Start the swatch this many stitches into your color sequence"
          name="colorShift"
          value={colorShift}
          setValue={(v : number) => setFormValue('colorShift', v)}
          />

        <CheckboxInput
          className="checkbox-container"
          title={`This will make odd rows of your project one stitch longer than the even rows. With your current settings, odd rows will be ${stitchesPerRow+1} stitches long`}
          label="Alternate row lengths"
          name="staggerLengths"
          value={staggerLengths}
          setValue={(v: boolean) => setFormValue('staggerLengths', v)}
        />
      </fieldset>

      <CheckboxInput
        className="checkbox-container"
        label="Show Row Numbers"
        title="Display row numbers at the beginning of each row."
        name="showRowNumbers"
        value={showRowNumbers}
        setValue={(v: boolean) => setFormValue('showRowNumbers', v)}
      />
    </form>
  );
}

export default Form;
