//This file is a copy of App.jsx but with my specific color config for what I'm working on and advanced stitch patterns
//Eventually I just want to load the data from specific JSON for my personal projects
//But for now I'll do this
import SwatchWithForm from '../SwatchWithForm';
import { StitchPattern, Color } from '../types'
import { useState } from "react";

const grey = "#4f4d4d" as Color;
const dark = "#30221a" as Color;
const orange = "#d66127" as Color;
const yellow = "#f5b638" as Color;

function Doodle() {
  const [swatchConfig, setSwatchConfig] = useState({
    colorConfig: [
      {color: dark, length: 1},
      {color: grey, length: 2},
      {color: dark, length: 1},
      {color: orange, length: 1},
      {color: yellow, length: 2},
      {color: orange, length: 1},
    ],
    crowLength: 15,
    crows: 9,
    colorShift: 1,
    staggerLengths: false,
    stitchPattern: StitchPattern.jasmine
  })

  return (
  <div>
    <p>This displays what the Zen Garden 500g ball looks like in Jasmine Stitch</p>
    <SwatchWithForm swatchConfig={swatchConfig} setSwatchConfig={setSwatchConfig} />
  </div>
  );
}

export default Doodle;
