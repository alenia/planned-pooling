import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, ColorSequenceArray } from '../types'
import { Fragment, useState } from "react";
import DropdownInput from '../inputs/Dropdown';
import { dunaColorways } from '../colorways';
import { totalColorSequenceLength, duplicateColorSequenceArray } from '../color';

function DoloresParkTote() {
  const initialColorway = dunaColorways[0]
  const initialColorSequence = duplicateColorSequenceArray(initialColorway.colorSequence)
  const [selectedColorway, setSelectedColorway] = useState(initialColorway.id)
  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence: initialColorSequence,
    stitchesPerRow: totalColorSequenceLength(initialColorSequence),
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  })

  //const resetColorway = (selectedColorwayId : keyof dunaColorways.map((c) => c.id) => {
  const resetColorway = (selectedColorwayId : string) => {
    setSelectedColorway(selectedColorwayId)
    const newColorSequence = duplicateColorSequenceArray(dunaColorways.find((c) => c.id === selectedColorwayId).colorSequence)
    setSwatchConfig({
      ...swatchConfig,
      colorSequence: newColorSequence,
      stitchesPerRow: totalColorSequenceLength(newColorSequence),
      colorShift: 0
    })
  }

  return (
    <Fragment>
      <p>This is a page to help with the Dolores Park Tote. If you want to design more planned pooling patterns, I recommend the <a href='/'>main app.</a></p>
      <DropdownInput
        label="Pick a colorway"
        name="colorway"
        title="Pick from a Circulo DUNA colorway"
        value={selectedColorway}
        setValue={resetColorway}
        items={dunaColorways.map((colorway) => (
          { label: colorway.colorway, value: colorway.id }
        ))}
      />
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        showRowNumbersInitially={true}
        staggerType={'colorStretched'}
      />
    </Fragment>
  );
}

export default DoloresParkTote;

