import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
/*
 import IntegerInput from '../inputs/Integer'
 import { useState } from "react";
 */
import { totalColorSequenceLength } from '../color'

function DiffusionScarf() {
  // const [mainColorShift, setMainColorShift] = useState(0)
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
  const sharedConfig = {
    numberOfRows: 30,
    // colorShift: mainColorShift,
    colorShift: 0,
    staggerLengths: false,
  }

  const neonPurple = '#e100ff' as Color
  const neonPink = '#FF00A0' as Color
  const neonOrange = '#ff9904' as Color
  const neonYellow = '#EBFF04' as Color
  const neonGreen = '#79FF04' as Color
  const neonBlue = '#04FFFF' as Color

  const panelConfigs = [
    {
      stitchesPerRow: 10,
      colorShift: 17,
      colorSequence: colorSequenceWithAccent(neonOrange),
      flip: true,
    },
    {
      stitchesPerRow: 20,
      colorShift: 16,
      colorSequence: stretchedColorSequenceWithAccent(neonPink)

    },
    {
      stitchesPerRow: 19,
      colorShift: 14,
      colorSequence: colorSequenceWithAccent(neonPurple)
    },
    {
      stitchesPerRow: 18,
      colorShift: 17,
      colorSequence: colorSequenceWithAccent(neonBlue)
    },
    {
      stitchesPerRow: 16,
      colorShift: 17,
      colorSequence: colorSequenceWithAccent(neonGreen),
      flip: true,
    },
    {
      stitchesPerRow: 16,
      colorShift: 0,
      colorSequence: oddColorSequenceWithAccent(neonYellow)
    },
    {
      stitchesPerRow: 15,
      colorShift: 17,
      colorSequence: colorSequenceWithAccent(neonGreen)
    },
    {
      stitchesPerRow: 14,
      colorShift: 20,
      colorSequence: oddColorSequenceWithAccent(neonBlue),
      flip: true,
    },
    {
      stitchesPerRow: 12,
      colorShift: 17,
      colorSequence: colorSequenceWithAccent(neonPurple)
    },
    {
      stitchesPerRow: 12,
      colorShift: 18,
      colorSequence: oddColorSequenceWithAccent(neonPink)
    },
    {
      stitchesPerRow: 11,
      colorShift: 13,
      colorSequence: colorSequenceWithAccent(neonOrange)
    },
    {
      stitchesPerRow: 11,
      //colorShift: 2, // 12, 12', 2, 2'
      colorSequence: oddColorSequenceWithAccent(neonYellow),
      flip: true,
    },
  ]

  return (
    <div className="container">
      <div className="squashed-swatch-container">
        {
          panelConfigs.map((specificConfig, index) =>{
            const style = {transform: ""}
            if(specificConfig.flip) {
              style.transform = "rotateY(180deg)"
            }
            return (
              <div style={style} key={`compactChart${index}`}>
                <a href={`#chart${index}`}>
                  <Swatch {...sharedConfig} stitchPattern={StitchPattern.compactMoss} {...specificConfig} />
                </a>
              </div>
            )
          })
        }
      </div>
      {/*
      <IntegerInput
        label="Color shift:"
        title={"color shift"}
        name="colorShift"
        value={mainColorShift}
        setValue={setMainColorShift}
      />
        */}
      <div className="container">
        {panelConfigs.map((specificConfig, index) => (
          <div key={`chart${index}`}>
            <a id={`chart${index}`}>
              <pre>
                stitches per row: {specificConfig.stitchesPerRow}<br/>
                color sequence length: {totalColorSequenceLength(specificConfig.colorSequence)}
              </pre>
            </a>
            <Swatch className='numbered' {...sharedConfig} stitchPattern={StitchPattern.moss} {...specificConfig} />
          </div>
          ))}
      </div>
    </div>
  );
}

export default DiffusionScarf;

