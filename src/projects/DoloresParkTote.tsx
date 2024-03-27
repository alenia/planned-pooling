import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern } from '../types'
import { Fragment, useState } from "react";
import DropdownInput from '../inputs/Dropdown';
import { dunaColorways, defaultDunaColorwayId } from '../colorways';
import { totalColorSequenceLength, duplicateColorSequenceArray } from '../color';

function DoloresParkTote() {
  const initialColorway = dunaColorways[defaultDunaColorwayId]
  const initialColorSequence = duplicateColorSequenceArray(initialColorway.colorSequence)
  const [selectedColorway, setSelectedColorway] = useState(defaultDunaColorwayId)
  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence: initialColorSequence,
    stitchesPerRow: totalColorSequenceLength(initialColorSequence),
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  })

  const resetColorway = (selectedColorwayId : string) => {
    setSelectedColorway(selectedColorwayId)
    const newColorSequence = duplicateColorSequenceArray(dunaColorways[selectedColorwayId].colorSequence)
    setSwatchConfig({
      ...swatchConfig,
      colorSequence: newColorSequence,
      stitchesPerRow: totalColorSequenceLength(newColorSequence),
      colorShift: 0
    })
  }

  return (
    <Fragment>
      <p>This is a page to help with the Dolores Park Tote pattern. You can also try the <a href='/'>main app.</a></p>
      <p> When you change colorways, it resets the width of your panel</p>
      <p> For Panel 2: Select <em>Stretch Colors</em> to preview the color stretching technique</p>
      <p> For the band: Turn off Stretch Colors and set <em>Stitches Per Row</em> to half of your color sequence</p>
      <DropdownInput
        label="Pick a colorway"
        name="colorway"
        title="Pick from a Circulo DUNA colorway"
        value={selectedColorway}
        setValue={resetColorway}
        items={Object.keys(dunaColorways).map((id) => (
          { label: dunaColorways[id].colorway, value: id }
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

