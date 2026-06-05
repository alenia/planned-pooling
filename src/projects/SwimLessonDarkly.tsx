import './SwimLessonDarkly.scss';
import SwatchWithForm from '../SwatchWithForm';
import Swatch from '../Swatch';
import { StitchPattern, StaggerType } from '../types'
import { Fragment, useState, useEffect } from "react";
import DropdownInput from '../inputs/Dropdown';
import { aSkeinerDarklyColorways, defaultASkeinerDarklyColorwayId } from '../colorways';
import { totalColorSequenceLength, duplicateColorSequenceArray, matchColorwayToColorSequence } from '../colorSequenceHelpers';
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';

function SwimLessonDarkly() {
  const initialColorway = aSkeinerDarklyColorways[defaultASkeinerDarklyColorwayId]
  const initialColorSequence = duplicateColorSequenceArray(initialColorway.colorSequence)
  const [selectedColorway, setSelectedColorway] = useState(defaultASkeinerDarklyColorwayId)
  const [staggerType, setStaggerType] = useState(StaggerType.staggerLongestColor)

  const setStaggerTypeFromDropdown = (newStaggerType: string) => {
    //TODO: write some tests for this dropdown. The typecasting might be cargo culted and fail silently one day
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

  useEffect(() => {
    const newColorway = matchColorwayToColorSequence(aSkeinerDarklyColorways, swatchConfig.colorSequence)
    setSelectedColorway(newColorway)
  },[swatchConfig, setSelectedColorway])

  const resetColorway = (selectedColorwayId : string) => {
    setSelectedColorway(selectedColorwayId)
    if(!aSkeinerDarklyColorways[selectedColorwayId]) { return false } //TODO test me
    const newColorSequence = duplicateColorSequenceArray(aSkeinerDarklyColorways[selectedColorwayId].colorSequence)
    setSwatchConfig({
      ...swatchConfig,
      colorSequence: newColorSequence,
      stitchesPerRow: totalColorSequenceLength(newColorSequence),
      colorShift: 0,
    })
  }
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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='wide-first-column'
      >
        <fieldset>
          <DropdownInput
            label="Pick a colorway:"
            name="colorway"
            title="Pick from an A Skeiner Darkly colorway"
            value={selectedColorway}
            setValue={resetColorway}
            items={[...Object.keys(aSkeinerDarklyColorways).map((id) => (
              { label: aSkeinerDarklyColorways[id].colorway, value: id }
            )), {label: 'Custom (choose your own colors)', value: 'custom'}]}
          />
          <DropdownInput
            label="Row alternating technique (for section 2):"
            name="staggerType"
            title="This changes how the piece behaves at the boundary between the end of an even row and beginning of an odd row"
            value={staggerType}
            setValue={setStaggerTypeFromDropdown}
            items={[
              {label: 'Alternate Lengths of Longest Color', value: StaggerType.staggerLongestColor},
              {label: 'Color stretching', value: StaggerType.colorStretched},
              {label: 'Color swallowing', value: StaggerType.colorSwallowed},
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

export default SwimLessonDarkly;

