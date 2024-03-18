import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, ColorSequenceArray } from '../types'
import { Fragment, useState } from "react";

function Parallax() {
  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence: [
      {color: "#E0962B", length: 3},
      {color: "#157255", length: 16},
    ] as ColorSequenceArray,
    stitchesPerRow: 29,
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.unstyled,
  })

  return (
    <Fragment>
      <p>This is a page to help with the parallax beanie chart. If you want to design more planned pooling patterns, I recommend the <a href='/'>main app.</a></p>
      <SwatchWithForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} showRowNumbersInitially={true} />
    </Fragment>
  );
}

export default Parallax;

