import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, Color, SwatchConfig } from '../types'
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';
import { useState, useEffect } from "react";
import ColorSequenceInfo from '../ColorSequenceInfo'
import DropdownInput from '../inputs/Dropdown';
import CheckboxInput from '../inputs/Checkbox';
import NumericInput from '../inputs/Numeric';
import { totalColorSequenceLength } from '../colorSequenceHelpers'

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

type StaggerType = 'colorStretched' | 'colorSwallowed'

function YardageForm(
  { swatchConfig, setSwatchConfig, active } : 
  {
    swatchConfig: SwatchConfig,
    setSwatchConfig: (data: SwatchConfig) => void,
    active: boolean,
  }
) {
  const [numberOfSkeins, setNumberOfSkeins] = useState(1 as number | undefined)
  const [yardage, setYardage] = useState(230 as number | undefined)
  const [colorSequenceInches, setColorSequenceInches] = useState(64 as number | undefined)

  useEffect(() => {
    if(active && numberOfSkeins && yardage && colorSequenceInches) {
      const totalInchesOfYarn = yardage * numberOfSkeins * 3 * 12;
      const possibleColorRepeatsFloat = totalInchesOfYarn/colorSequenceInches;
      const stitchesPerSequence = totalColorSequenceLength(swatchConfig.colorSequence);
      const maxStitchesToShow = Math.floor(stitchesPerSequence * possibleColorRepeatsFloat);
      const rowsToShow = Math.floor(maxStitchesToShow/swatchConfig.stitchesPerRow)
      if(rowsToShow !== swatchConfig.numberOfRows) {
        setSwatchConfig({...swatchConfig, numberOfRows: rowsToShow})
      }
    }
  }, [active, numberOfSkeins, yardage, colorSequenceInches, swatchConfig, setSwatchConfig])
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset>
        <CheckboxInput
          label="Imperial Units"
          title="Use yards and inches (sorry metric friends this box is always checked)"
          name="units"
          withTooltip={true}
          value={true}
          setValue={() => true}
        />
        <NumericInput
          label="Yarn yardage:"
          title="Yardage of one skien of yarn"
          name="yardage"
          value={yardage}
          setValue={setYardage}
          validator={NumericInput.validators.nonNegative}
        />
        <NumericInput
          label="Length of one color sequence (in):"
          title="This is twice the skein length for a hand dyed skein of yarn"
          withTooltip={true}
          name="colorSequenceInches"
          value={colorSequenceInches}
          setValue={setColorSequenceInches}
          validator={NumericInput.validators.nonNegative}
        />
        <NumericInput
          label="Number of skeins:"
          title="Number of balls of yarn with your yardage above"
          name="numberOfSkeins"
          value={numberOfSkeins}
          setValue={setNumberOfSkeins}
          validator={NumericInput.validators.positive}
        />
      </fieldset>
    </form>
  )
}

function Experimental() {
  const defaultSwatchConfig = {
    colorSequence: [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    stitchesPerRow: 18, //Note: explicitly ok not saving zero from search params here
    numberOfRows: 40, //Note: explicitly ok not pulling zero from search params here
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  }

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  const [staggerType, setStaggerType] = useState('colorStretched' as StaggerType)
  const [displayYardageForm, setDisplayYardageForm] = useState(false)

  const setStaggerTypeFromDropdown = (newStaggerType: string) => {
    setStaggerType(newStaggerType as StaggerType)
  }

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)

  const numStitches = swatchConfig.stitchesPerRow * swatchConfig.numberOfRows
  const numColorSequences = numStitches/totalColorSequenceLength(swatchConfig.colorSequence)

  return (
    <div>
      <p>This is an experimental page. It might change at anytime and URLs can break.</p>
      <p>Here are the current features:</p>
      <ul>
        <li>there is a button to double your colors that makes a copy of all the colors (does not work well with yardage form)</li>
        <li>there&apos;s more info about the colors you see</li>
        <li>you can change stagger type (not saved on url)</li>
        <li>you can change the number of rows from the yardage form based on the measured color sequence length and yarn yardage</li>
      </ul>
      <p>If you don&apos;t know what I&apos;m talking about use the <a href='/'>main app.</a></p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset>
          <ColorSequenceInfo colorSequence={swatchConfig.colorSequence} colorShift={swatchConfig.colorShift}/>
          <p>In this swatch:</p>
          <pre>Number of stitches/clusters displayed (might be wrong with a stagger type): {numStitches}</pre>
          <pre>Number of {swatchConfig.colorSequence.length}-color color sequences displayed: {numColorSequences.toFixed(1)}</pre>
          <DropdownInput
            label="Row alternating technique:"
            name="staggerType"
            title="This changes how the piece behaves at the boundary between the end of an even row and beginning of an odd row"
            value={staggerType}
            setValue={setStaggerTypeFromDropdown}
            items={[
              {label: 'Alternate Row Lengths (most basic)', value: 'normal'},
              {label: 'Color stretching (increasing tension)', value: 'colorStretched'},
              {label: 'Color swallowing (loosening tension)', value: 'colorSwallowed'},
            ]}
          />
          <CheckboxInput
            title="Show a form to change the length of the preview based on yarn yardage, number of skeins, and color sequence length in inches"
            label="Use yarn yardage form instead of number of rows"
            name="displayYardageForm"
            value={displayYardageForm}
            setValue={setDisplayYardageForm}
          />
        </fieldset>
      </form>
      <YardageForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} active={displayYardageForm}/>
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        staggerType={staggerType}
        showExperimentalFeatures={true}
      />
    </div>
  );
}

export default Experimental;
