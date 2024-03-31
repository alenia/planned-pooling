import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
import IntegerInput from '../inputs/Integer'
import { useState } from "react";
import { totalColorSequenceLength } from '../color'

function DiffusionScarf() {
  const [mainColorShift, setMainColorShift] = useState(0)
  const colorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 17},
    {color: accent, length: 3}
  ])
  const oddColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 18},
    {color: accent, length: 3}
  ])
  const stretchedColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 17},
    {color: accent, length: 3},
    {color: '#000', length: 18},
    {color: accent, length: 3}
  ])
  const swallowedColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 14},
    {color: accent, length: 4},
    {color: '#000', length: 13},
    {color: accent, length: 4}
  ])
  const sharedConfig = {
    numberOfRows: 30,
    colorShift: mainColorShift,
    staggerLengths: false,
  }

  const neonPurple = '#e100ff' as Color
  const neonPink = '#FF00A0' as Color
  const neonOrange = '#ff9904' as Color
  const neonYellow = '#EBFF04' as Color
  const neonGreen = '#79FF04' as Color
  const neonBlue = '#04FFFF' as Color

  const panelConfigs = [
    { stitchesPerRow: 10, colorShift: 7, colorSequence: colorSequenceWithAccent(neonOrange) },
    { stitchesPerRow: 20, colorShift: 11, colorSequence: stretchedColorSequenceWithAccent(neonPink) },
    { stitchesPerRow: 19, colorShift: 4, colorSequence: colorSequenceWithAccent(neonPurple) },
    { stitchesPerRow: 18, colorShift: 13, colorSequence: colorSequenceWithAccent(neonBlue) },
    { stitchesPerRow: 16, colorShift: 1, colorSequence: colorSequenceWithAccent(neonGreen) },
    { stitchesPerRow: 16, colorShift: 3, colorSequence: oddColorSequenceWithAccent(neonYellow) },
    { stitchesPerRow: 15, colorShift: 17, colorSequence: colorSequenceWithAccent(neonGreen) },
    { stitchesPerRow: 14, colorShift: 5,  colorSequence: oddColorSequenceWithAccent(neonBlue) },
    { stitchesPerRow: 12, colorShift: 5,  colorSequence: colorSequenceWithAccent(neonPurple) },
    { stitchesPerRow: 12, colorShift: 13, colorSequence: oddColorSequenceWithAccent(neonPink) },
    { stitchesPerRow: 11, colorShift: 3,  colorSequence: colorSequenceWithAccent(neonOrange) },
    { stitchesPerRow: 11, colorShift: 7,  colorSequence: oddColorSequenceWithAccent(neonYellow) },
  ]

  return (
    <div className="container">
      <div className="squashed-swatch-container">
        {panelConfigs.map((specificConfig) => <Swatch {...sharedConfig} stitchPattern={StitchPattern.compactMoss} {...specificConfig} />)}
      </div>
      <div className="container">
        {panelConfigs.map((specificConfig) => (
          <div>
            <pre>
              stitches per row: {specificConfig.stitchesPerRow}<br/>
              color sequence length: {totalColorSequenceLength(specificConfig.colorSequence)}
            </pre>
            <Swatch className='numbered' {...sharedConfig} stitchPattern={StitchPattern.moss} {...specificConfig} />
          </div>
          ))}
      </div>
    </div>
  );
}

export default DiffusionScarf;

