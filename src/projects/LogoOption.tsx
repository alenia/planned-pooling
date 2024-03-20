//This file is a copy of App.jsx but with my specific color config for what I'm working on and advanced stitch patterns
//Eventually I just want to load the data from specific JSON for my personal projects
//But for now I'll do this
import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, Color } from '../types'
import { useState } from "react";

const coral = "#e26654" as Color;
const teal = "#317781" as Color;
const cream = "#fefbec" as Color;
const lightTeal = "#70afb7" as Color;

function LogoOption() {
  const [swatchConfig, setSwatchConfig] = useState({
    colorSequence: [
      {color: coral, length: 2},
      {color: teal, length: 5},
      {color: coral, length: 2},
      {color: cream, length: 4},
      {color: lightTeal, length: 0},
    ],
    stitchesPerRow: 19,
    numberOfRows: 40,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: StitchPattern.moss,
  })

  return (
    <SwatchWithForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} />
  );
}

export default LogoOption;

