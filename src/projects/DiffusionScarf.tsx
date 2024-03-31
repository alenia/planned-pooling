import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
import { totalColorSequenceLength } from '../color'
import IntegerInput from '../inputs/Integer'
import CheckboxInput from '../inputs/Checkbox'
import { useState } from "react";


function DiffusionScarf() {
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

  const neonPurple = '#e100ff' as Color
  const neonPink = '#FF00A0' as Color
  const neonOrange = '#ff9904' as Color
  const neonYellow = '#EBFF04' as Color
  const neonGreen = '#79FF04' as Color
  const neonBlue = '#04FFFF' as Color


  const initialPanelConfigs = [
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


  const [selectedSwatchIndex, setSelectedSwatchIndex] = useState(0)
  const [panelConfigs, setPanelConfigs] = useState(initialPanelConfigs)
  const selectedSwatchConfig = panelConfigs[selectedSwatchIndex]

  const selectedColorShift = selectedSwatchConfig.colorShift
  const setSelectedColorShift = (newShift: number) => {
    const nextPanelConfigs = [...panelConfigs]
    nextPanelConfigs[selectedSwatchIndex].colorShift = newShift
    setPanelConfigs(nextPanelConfigs)
  }
  const selectedFlipPreview = !!(panelConfigs[selectedSwatchIndex].flip)
  const setSelectedFlipPreview = (newFlip: boolean) => {
    const nextPanelConfigs = [...panelConfigs]
    nextPanelConfigs[selectedSwatchIndex].flip = newFlip
    setPanelConfigs(nextPanelConfigs)
  }
  const selectedAccentColorLength = selectedSwatchConfig.colorSequence[1].length
  const selectedMainColorLength = selectedSwatchConfig.colorSequence[0].length
  const setSelectedColorLengthsBasedOnAccent = (newAccentLength: number) => {
    const nextPanelConfigs = [...panelConfigs]
    const prevSequence = selectedSwatchConfig.colorSequence
    const seqLength = totalColorSequenceLength(prevSequence)
    if(prevSequence.length === 2) {
      nextPanelConfigs[selectedSwatchIndex].colorSequence = [
        { color: prevSequence[0].color, length: seqLength - newAccentLength},
        { color: prevSequence[1].color, length: newAccentLength},
      ]
    } else if(prevSequence.length === 4) {
      nextPanelConfigs[selectedSwatchIndex].colorSequence = [
        { color: prevSequence[0].color, length: Math.floor(seqLength/2) - newAccentLength},
        { color: prevSequence[1].color, length: newAccentLength},
        { color: prevSequence[0].color, length: Math.ceil(seqLength/2) - newAccentLength},
        { color: prevSequence[1].color, length: newAccentLength},
      ]
    }
    setPanelConfigs(nextPanelConfigs)
  }

  const sharedConfig = {
    numberOfRows: 30,
    staggerLengths: false,
  }

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
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <fieldset>
          <pre>
            total color sequence length (varies per swatch): {totalColorSequenceLength(selectedSwatchConfig.colorSequence)}
          </pre>
          { selectedSwatchConfig.colorSequence.length === 2 ?  <pre>main color length: {selectedMainColorLength}</pre> : <pre>color sequence: {JSON.stringify(selectedSwatchConfig.colorSequence)}</pre>}
          <IntegerInput
            label="Accent Color Length:"
            title="The color sequence length will always be the same, but if you have more stitches of your accent color you can change this"
            name="accentColorLength"
            value={selectedAccentColorLength}
            setValue={setSelectedColorLengthsBasedOnAccent}
            withTooltip={true}
          />
          <IntegerInput
            label="Color shift:"
            title="Start the swatch this many stitches into your color sequence"
            name="colorShift"
            value={selectedColorShift}
            setValue={setSelectedColorShift}
            withTooltip={true}
          />
          <CheckboxInput
            label="Flip preview"
            title="flip the small version of the swatch"
            name="flipPreview"
            value={selectedFlipPreview}
            setValue={setSelectedFlipPreview}
          />
          <pre>
            stitches per row in this swatch: {panelConfigs[selectedSwatchIndex].stitchesPerRow}<br/>
          </pre>
        </fieldset>
      </form>
      <div className="container">
        <Swatch className='numbered' {...sharedConfig} stitchPattern={StitchPattern.moss} {...panelConfigs[selectedSwatchIndex]} />
      </div>
    </div>
  );
}

export default DiffusionScarf;

