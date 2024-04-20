import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, SwatchConfig } from '../types'
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';
import { useState, useEffect } from "react";
import CheckboxInput from '../inputs/Checkbox';
import NumericInput from '../inputs/Numeric';
import IntegerInput from '../inputs/Integer';
import { totalColorSequenceLength } from '../color'
import { decoratedClosestEntrelacStitchCounts } from '../entrelacHelpers'

function EqualLengthYardageSubform(
  { swatchConfig, setSwatchConfig, active } : 
  {
    swatchConfig: SwatchConfig,
    setSwatchConfig: (data: SwatchConfig) => void,
    active: boolean,
  }
) {
  const [numberOfSkeins, setNumberOfSkeins] = useState(1)
  const [yardage, setYardage] = useState(245)
  const [singleColorLengthInches, setSingleColorLengthInches] = useState(64)

  useEffect(() => {
    if(active && numberOfSkeins && yardage && singleColorLengthInches) {
      const totalInchesOfYarn = yardage * numberOfSkeins * 3 * 12;
      const colorSequenceInches = singleColorLengthInches * swatchConfig.colorSequence.length
      const possibleColorRepeatsFloat = totalInchesOfYarn/colorSequenceInches;
      const stitchesPerSequence = totalColorSequenceLength(swatchConfig.colorSequence);
      const maxStitchesToShow = Math.floor(stitchesPerSequence * possibleColorRepeatsFloat);
      const rowsToShow = Math.floor(maxStitchesToShow/swatchConfig.stitchesPerRow)
      if(rowsToShow !== swatchConfig.numberOfRows) {
        setSwatchConfig({...swatchConfig, numberOfRows: rowsToShow})
      }
    }
  }, [active, numberOfSkeins, yardage, singleColorLengthInches, swatchConfig, setSwatchConfig])
  return (
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
        label="Length of one color (in):"
        title="Length of one color. All your colors should be equal lengths for this."
        withTooltip={true}
        name="singleColorLengthInches"
        value={singleColorLengthInches}
        setValue={setSingleColorLengthInches}
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
  )
}

function EntrelacCalculatorSubform() {
  const [stitchesPerColor, setStitchesPerColor] = useState(100)
  return (
    <fieldset>
      <NumericInput
        label="Gauge stitches per color"
        title="Number of garter or stockinette stitches you knit per color when striping"
        name="stitchesPerColor"
        value={stitchesPerColor}
        setValue={setStitchesPerColor}
        withTooltip={true}
        validator={NumericInput.validators.nonNegative}
      />
      <ul>
        {decoratedClosestEntrelacStitchCounts(stitchesPerColor).map((c, i) => <li key={`decoratedCount${i}`}>{c}</li>)}
      </ul>
    </fieldset>
  )
}

function Entrelac() {
  const defaultSwatchConfig = {
    colorSequence: [
      {color: '#191a1b', length: 5},
      {color: '#e8ebf3', length: 5},
      {color: '#f57605', length: 5},
      {color: '#fcdc4d', length: 5},
      {color: '#e8ebf3', length: 5},
      {color: '#1c40b8', length: 5},
    ],
    stitchesPerRow: 30, //Note: explicitly ok not saving zero from search params here
    numberOfRows: 58, //Note: explicitly ok not pulling zero from search params here
    colorShift: 0,
    staggerLengths: true,
    stitchPattern: StitchPattern.entrelac,
  } as SwatchConfig

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  const [useYardageForm, setUseYardageForm] = useState(false)

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)

  const setAllColorLengths = (newLength : number) => {
    const newColorSequence = swatchConfig.colorSequence.map((c) => ({color: c.color, length: newLength}))
    setSwatchConfig({...swatchConfig, colorSequence: newColorSequence})
  }

  return (
    <div>
      <p>This is under development. It&apos;s some entrelac experiments that will eventually become a paid pattern. If you found this by accident and do not know me personally, please use the <a href='/'>main app</a> instead.</p>
      <p>This assumes that you have equal length colors</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <EntrelacCalculatorSubform/>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset>
          <CheckboxInput
            title="Use the yardage form to change the length of the preview based on yarn yardage, number of skeins, and how many inches in one color of yarn"
            label="Use yarn yardage form instead of number of rows"
            name="useYardageForm"
            value={useYardageForm}
            setValue={setUseYardageForm}
          />
          <IntegerInput
            label="Equal Color Lengths"
            title="Set all color lengths to this value"
            name='setAllColorLengths'
            value={swatchConfig.colorSequence[0].length}
            setValue={setAllColorLengths}
            validator={IntegerInput.validators.nonNegative}
          />
        </fieldset>
        <EqualLengthYardageSubform swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} active={useYardageForm}/>
      </form>
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        staggerType='normal'
        showExperimentalFeatures={true}
      />
    </div>
  );
}

export default Entrelac;
