import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern } from '../types'
import { Fragment, useState, useEffect } from "react";
import { parallaxColorways, defaultParallaxColorwayId } from '../colorways';
import { duplicateColorSequenceArray, matchColorwayToColorSequence } from '../colorSequenceHelpers';
import DropdownInput from '../inputs/Dropdown';

function Parallax() {
  const initialColorway = parallaxColorways[defaultParallaxColorwayId]
  const initialColorSequence = duplicateColorSequenceArray(initialColorway.colorSequence)
  const [selectedColorway, setSelectedColorway] = useState(defaultParallaxColorwayId)

  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence: initialColorSequence,
    stitchesPerRow: 29,
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.unstyled,
  })

  useEffect(() => {
    const newColorway = matchColorwayToColorSequence(parallaxColorways, swatchConfig.colorSequence)
    setSelectedColorway(newColorway)
  },[swatchConfig, setSelectedColorway])

  const resetColorway = (selectedColorwayId : string) => {
    setSelectedColorway(selectedColorwayId)
    if(!parallaxColorways[selectedColorwayId]) { return false } //TODO test me
    const newColorSequence = duplicateColorSequenceArray(parallaxColorways[selectedColorwayId].colorSequence)
    setSwatchConfig({
      ...swatchConfig,
      colorSequence: newColorSequence,
      stitchesPerRow: 29,
      colorShift: 0,
    })
  }

  return (
    <Fragment>
      <p>This page is part of the Parallax Beanie pattern. You can find the pattern <a href="https://www.ravelry.com/patterns/library/parallax-beanie" target="blank">here</a>.</p>
      <p>Please only use this page if you have purchased the pattern.</p>
      <p>If you want to create your own planned pooling patterns, I recommend the free <a href='/'>main app.</a></p>
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
            title="Pick from a Dream in Color (Riley) or Wonderland Yarns colorway"
            value={selectedColorway}
            setValue={resetColorway}
            items={[...Object.keys(parallaxColorways).map((id) => (
              { label: `${parallaxColorways[id].yarnName} ${parallaxColorways[id].colorway}`, value: id }
            )), {label: 'Custom (choose your own colors)', value: 'custom'}]}
          />
        </fieldset>
      </form>
      <SwatchWithForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} showRowNumbersInitially={true} />
    </Fragment>
  );
}

export default Parallax;

