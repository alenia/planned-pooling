import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, Color } from '../types'
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';
import { useState } from "react";
import ColorSequenceInfo from '../ColorSequenceInfo'
import DropdownInput from '../inputs/Dropdown';
import { totalColorSequenceLength } from '../colorSequenceHelpers'

const red = "#ff001d" as Color;
const cream = "#fcf7eb" as Color;
const ltblue = "#8dd0f2" as Color;
const navy = "#0e0e66" as Color;

type StaggerType = 'colorStretched' | 'colorSwallowed'

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

  const [staggerType, setStaggerType] = useState('normal' as StaggerType)

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
        <li>there is a button to double your colors that makes a copy of all the colors</li>
        <li>there's more info about the colors you see</li>
        <li>you can change stagger type (not saved on url)</li>
      </ul>
      <p>If you don&apos;t know what I&apos;m talking about use the <a href='/'>main app.</a></p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='wide-first-column'
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
            items={[
              {label: 'Display odd rows and even rows with different lengths', value: 'normal'},
              {label: 'Color stretching (increasing tension)', value: 'colorStretched'},
              {label: 'Color swallowing (loosening tension)', value: 'colorSwallowed'},
            ]}
          />
        </fieldset>
      </form>
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
