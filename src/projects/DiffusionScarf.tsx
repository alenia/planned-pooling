import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
import { totalColorSequenceLength } from '../color'
// import IntegerInput from '../inputs/Integer'
import { useState } from "react";


function DiffusionScarf() {
  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0)
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
      colorShift: 2, // 12, 12', 2, 2'
      colorSequence: oddColorSequenceWithAccent(neonYellow),
      flip: true,
    },
  ]

  return (
    <div className="container">
      <div className="squashed-swatch-container">
        {
          panelConfigs.map((specificConfig, index) =>{
            const style = { transform: "", cursor: 'pointer'}
            if(specificConfig.flip) {
              style.transform = "rotateY(180deg)"
            }
            return (
              <div style={style} key={`compactChart${index}`} onClick={() => setSelectedSwatchIndex(index)}>
                <Swatch {...sharedConfig} stitchPattern={StitchPattern.compactMoss} {...specificConfig} />
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
        <div>
          <pre>
            stitches per row: {panelConfigs[selectedSwatchIndex].stitchesPerRow}<br/>
            color sequence length: {totalColorSequenceLength(panelConfigs[selectedSwatchIndex].colorSequence)}
          </pre>
          <Swatch className='numbered' {...sharedConfig} stitchPattern={StitchPattern.moss} {...panelConfigs[selectedSwatchIndex]} />
        </div>
      </div>
    </div>
  );
}

export default DiffusionScarf;

