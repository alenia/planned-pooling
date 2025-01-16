import './SwimLesson.scss';
import SwatchWithForm from '../SwatchWithForm';
import Swatch from '../Swatch';
import { StitchPattern, ColorSequenceArray } from '../types'
import { Fragment, useState } from "react";
import DropdownInput from '../inputs/Dropdown';
import { totalColorSequenceLength } from '../colorSequenceHelpers';
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';

type StaggerType = 'colorStretched' | 'colorSwallowed'

function SwimLesson() {
  const initialColorSequence = [
    { color: "#d6dfd7", length: 8 },
    { color: "#0e7a42", length: 6 }
  ] as ColorSequenceArray
  const [staggerType, setStaggerType] = useState('colorStretched' as StaggerType)

  const setStaggerTypeFromDropdown = (newStaggerType: string) => {
    setStaggerType(newStaggerType as StaggerType)
  }

  const defaultSwatchConfig = {
    colorSequence: initialColorSequence,
    stitchesPerRow: totalColorSequenceLength(initialColorSequence),
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  }

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)

  const setPanel1Configuration = () => {
    setSwatchConfig({
      ...swatchConfig,
      stitchesPerRow: totalColorSequenceLength(swatchConfig.colorSequence),
      staggerLengths: false,

    })
  }
  const setPanel2Configuration = () => {
    setSwatchConfig({
      ...swatchConfig,
      stitchesPerRow: totalColorSequenceLength(swatchConfig.colorSequence),
      staggerLengths: true,
    })
  }
  const setBandConfiguration = () => {
    setSwatchConfig({
      ...swatchConfig,
      stitchesPerRow: Math.floor(totalColorSequenceLength(swatchConfig.colorSequence)/2),
      staggerLengths: false,
    })
  }

  const miniStripeConfiguration = {
    stitchesPerRow: totalColorSequenceLength(swatchConfig.colorSequence),
    numberOfRows: 10,
    staggerLengths: false,
    stitchPattern: StitchPattern.compactMoss
  }
  const miniPlaidConfiguration = {
    stitchesPerRow: totalColorSequenceLength(swatchConfig.colorSequence),
    numberOfRows: totalColorSequenceLength(swatchConfig.colorSequence)*4,
    staggerLengths: true,
    staggerType: staggerType,
    stitchPattern: StitchPattern.compactMoss
  }

  return (
    <Fragment>
      <p>This is a page to help with the Swim Lesson Cowl and Headband patterns. You can also try the <a href='/'>main app.</a></p>
      <p> You can play with the color shift to change where you start your band or adjust your stripes</p>
      <p> For section 2, if you want to alternate lengths of one color, keep it on the stripes setting and add the same colors a second time.</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='wide-first-column'
      >
        <fieldset>
          <DropdownInput
            label="Row alternating technique (for section 2):"
            name="staggerType"
            title="This changes how the piece behaves at the boundary between the end of an even row and beginning of an odd row"
            value={staggerType}
            setValue={setStaggerTypeFromDropdown}
            items={[
              {label: 'Color stretching', value: 'colorStretched'},
              {label: 'Color swallowing', value: 'colorSwallowed'},
            ]}
          />
          <label>
            Set the stitches per row and pooling technique based on your panel:
          </label>
          <div className="buttons">
            <button type="button" onClick={setPanel1Configuration}>Sections 1 and 3 (stripes)</button>
            <button type="button" onClick={setPanel2Configuration}>Section 2 (plaid)</button>
            <button type="button" onClick={setBandConfiguration}>Headband (half width)</button>
          </div>
        </fieldset>
      </form>
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        showRowNumbersInitially={true}
        staggerType={staggerType}
        formClasses='wide-first-column'
      />
      <br/>
      <h4>Entire Cowl Preview (beta)</h4>
      <div className="mini-vertical-preview">
        <Swatch {...swatchConfig} {...miniStripeConfiguration} />
        <Swatch {...swatchConfig} {...miniPlaidConfiguration} />
        <Swatch {...swatchConfig} {...miniStripeConfiguration} />
      </div>
    </Fragment>
  );
}

export default SwimLesson;

