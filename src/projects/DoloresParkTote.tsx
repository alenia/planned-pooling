import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern } from '../types'
import { Fragment, useState, useEffect } from "react";
import DropdownInput from '../inputs/Dropdown';
import { dunaColorways, defaultDunaColorwayId } from '../colorways';
import { totalColorSequenceLength, duplicateColorSequenceArray, matchColorwayToColorSequence } from '../colorHelpers';
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';

type StaggerType = 'colorStretched' | 'colorSwallowed'

function DoloresParkTote() {
  const initialColorway = dunaColorways[defaultDunaColorwayId]
  const initialColorSequence = duplicateColorSequenceArray(initialColorway.colorSequence)
  const [selectedColorway, setSelectedColorway] = useState(defaultDunaColorwayId)
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

  useEffect(() => {
    const newColorway = matchColorwayToColorSequence(dunaColorways, swatchConfig.colorSequence)
    setSelectedColorway(newColorway)
  },[swatchConfig, setSelectedColorway])

  const resetColorway = (selectedColorwayId : string) => {
    setSelectedColorway(selectedColorwayId)
    if(!dunaColorways[selectedColorwayId]) { return false } //TODO test me
    const newColorSequence = duplicateColorSequenceArray(dunaColorways[selectedColorwayId].colorSequence)
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

  return (
    <Fragment>
      <p>This is a page to help with the Dolores Park Tote pattern. You can also try the <a href='/'>main app.</a></p>
      <p> When you change colorways, it resets the width of your panel</p>
      <p> For Panel 2: Select <em>Stretch Colors</em> to preview the color stretching technique</p>
      <p> For the band: Turn off Stretch Colors and set <em>Stitches Per Row</em> to half of your color sequence</p>
      <p> You can play with the color shift to change where you start your band or Panel 1</p>
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
            title="Pick from a Circulo DUNA colorway"
            value={selectedColorway}
            setValue={resetColorway}
            items={[...Object.keys(dunaColorways).map((id) => (
              { label: dunaColorways[id].colorway, value: id }
            )), {label: 'Custom (choose your own colors)', value: 'custom'}]}
          />
          <DropdownInput
            label="Row alternating technique (for panel 2):"
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
            <button type="button" onClick={setPanel1Configuration}>Panel 1 (stripes)</button>
            <button type="button" onClick={setPanel2Configuration}>Panel 2 (color stretching)</button>
            <button type="button" onClick={setBandConfiguration}>Band (half width)</button>
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
    </Fragment>
  );
}

export default DoloresParkTote;

