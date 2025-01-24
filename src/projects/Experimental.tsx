import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, SwatchConfig, StaggerType } from '../types'
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';
import { useState, useEffect } from "react";
import ColorSequenceInfo from '../ColorSequenceInfo'
import DropdownInput from '../inputs/Dropdown';
import CheckboxInput from '../inputs/Checkbox';
import NumericInput from '../inputs/Numeric';
import { totalColorSequenceLength } from '../colorSequenceHelpers'

function DoubleCheckerSubform({swatchConfig, yardage} : 
  {
    swatchConfig: SwatchConfig,
    yardage: number
  }
) {
  const [totalWeight, setTotalWeight] = useState(100)
  const [swatchWeight, setSwatchWeight] = useState(100)
  const [actualRows, setActualRows] = useState(swatchConfig.numberOfRows)

  const rowsPossible = Math.floor(actualRows * totalWeight/swatchWeight)
  const inchesPerSkein = yardage * 12 * 3;
  const stitchesPossible = swatchConfig.stitchesPerRow * rowsPossible
  const numColorSequencesPossible = stitchesPossible/totalColorSequenceLength(swatchConfig.colorSequence)
  const possibleColorSequenceInches = inchesPerSkein/numColorSequencesPossible
  return (
    <fieldset>
      <em>Double check values based on the weight of your actual project.<br/>This does not affect your displayed swatch or the values of the form below.</em><br/>
      <p>Using the yardage in your yardage form, this tells you how many rows you should have in your project based on its weight.<br/>
        This is intended to tell you if your color sequence length in inches might be wrong, given that this is a hard thing to measure.</p>
      <p>Note: this shows up even if you haven't entered anything and should probably display nothing instead.</p>
      <NumericInput
        label="Total weight of yarn:"
        title="Weight of your yarn for the project"
        name="TotalWeight"
        value={totalWeight}
        setValue={setTotalWeight}
        validator={NumericInput.validators.nonNegative}
      />
      <NumericInput
        label="Weight of swatch:"
        title="Measured weight of your swatch"
        withTooltip={true}
        name="swatchWeight"
        value={swatchWeight}
        setValue={setSwatchWeight}
        validator={NumericInput.validators.nonNegative}
      />
      <NumericInput
        label="Rows in your actual swatch:"
        title="Rows in your swatch"
        name="actualRows"
        value={actualRows}
        setValue={setActualRows}
        validator={NumericInput.validators.positive}
      />
      <p>
        If the values in the form to the left are correct, you should have {rowsPossible} rows in a swatch that weighs {swatchWeight}g.<br/>
        {/*This is DIFFERENCE rows MORE OR LESS than the calculated number based on yardage (PERCENTAGE%).<br/>*/}
        Based on the weight of this swatch, your color sequence length in inches might be {possibleColorSequenceInches.toFixed(1)} instead of the number you input.
      </p>
    </fieldset>
  )
}
function YardageForm(
  { swatchConfig, setSwatchConfig, active } : 
  {
    swatchConfig: SwatchConfig,
    setSwatchConfig: (data: SwatchConfig) => void,
    active: boolean,
  }
) {
  const [numberOfSkeins, setNumberOfSkeins] = useState(1)
  const [yardage, setYardage] = useState(245)
  const [colorSequenceInches, setColorSequenceInches] = useState(64)

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
      <DoubleCheckerSubform swatchConfig={swatchConfig} yardage={yardage}/>
    </form>
  )
}

function Experimental() {
  const defaultSwatchConfig = {
    colorSequence: [
      {color: '#fafc38', length: 13},
      {color: '#ef42c6', length: 1},
      {color: '#7b0f9a', length: 3},
      {color: '#ef42c6', length: 1},
      {color: '#c3fc38', length: 1},
    ],
    stitchesPerRow: 29, //Note: explicitly ok not saving zero from search params here
    numberOfRows: 58, //Note: explicitly ok not pulling zero from search params here
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  } as SwatchConfig

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  const [staggerType, setStaggerType] = useState('normal' as StaggerType)
  const [lockRowsToYardageForm, setLockRowsToYardageForm] = useState(false)

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
            title="This changes how the piece behaves at the boundary between the end of an even row and beginning of an odd row when the checkbox is checked"
            value={staggerType}
            setValue={setStaggerTypeFromDropdown}
            withTooltip={true}
            items={[
              {label: 'Display odd rows and even rows with different lengths', value: 'normal'},
              {label: 'Color stretching (increasing tension)', value: 'colorStretched'},
              {label: 'Color swallowing (loosening tension)', value: 'colorSwallowed'},
            ]}
          />
          <CheckboxInput
            title="Change the length of the preview based on yarn yardage, number of skeins, and color sequence length in inches rather than using the number of rows input."
            label="Use yarn yardage form to change number of rows"
            name="lockRowsToYardageForm"
            value={lockRowsToYardageForm}
            setValue={setLockRowsToYardageForm}
            withTooltip={true}
          />
        </fieldset>
      </form>
      <YardageForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} active={lockRowsToYardageForm}/>
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
