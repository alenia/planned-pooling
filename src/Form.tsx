import './Form.scss'
import CheckboxInput from './inputs/Checkbox'
import TogglableColorPicker from './inputs/TogglableColorPicker'
import IntegerInput from './inputs/Integer'
import { Color, SwatchConfig } from './types'
import { getRandomNotWhiteColor, defaultPickerColors } from './colorHelpers'
import { totalColorSequenceLength } from './colorSequenceHelpers'
import { mod } from './numberHelpers'

type FormValue = keyof(SwatchConfig)

function Form(
  { swatchData, setSwatchData, staggerType, showExperimentalFeatures, className } :
  {
    swatchData: SwatchConfig,
    setSwatchData: (data: SwatchConfig) => void,
    staggerType?: 'normal' | 'colorStretched' | 'colorSwallowed',
    showExperimentalFeatures: boolean,
    className?: string,
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
    if (staggerType === "colorStretched") {
      return "This will stretch the length of the color that ends an even row/starts an odd row.\n\nThat is, if you normally have 5 stitches of a color, this will make it 6 at that transition point."
    } else if (staggerType === "colorSwallowed") {
      return "This will contract the length of the color that starts an odd row.\n\nThat is, if you normally have 5 stitches of a color, this will make it 4 at that transition point."
    } else {
      return `This will make odd rows of your project one stitch longer than the even rows. \n\nWith your current settings, odd rows will be ${stitchesPerRow+1} stitches long.`
    }
  }

  const staggerLengthsLabel = () => {
    if (staggerType === "colorStretched") {
      return "Stretch Colors at row boundary"
    } else if (staggerType === "colorSwallowed") {
      return "Swallow Colors at row boundary"
    } else {
      return "Alternate Row Lengths"
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
      className={className}
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
        <div className="buttons">
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
          title={staggerLengthsTooltip()}
          label={staggerLengthsLabel()}
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
