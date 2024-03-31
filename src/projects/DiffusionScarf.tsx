import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
import { totalColorSequenceLength } from '../color'
import IntegerInput from '../inputs/Integer'
import CheckboxInput from '../inputs/Checkbox'
import ColorSequenceInfo from '../ColorSequenceInfo'
import { useState } from "react";


function DiffusionScarf() {
  const colorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: accent, length: 3},
    {color: '#000', length: 17},
  ])
  const oddColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: accent, length: 3},
    {color: '#000', length: 18},
  ])
  const generateStaggeredSequence = (cc : Color, mc : Color, ccLength : number, seqLength : number) => ([
    { color: cc, length: ccLength },
    { color: mc, length: (Math.ceil(seqLength/2) - ccLength)},
    { color: cc, length: ccLength },
    { color: mc, length: (Math.floor(seqLength/2) - ccLength)},
  ])

  const stretchedColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => {
    const stretchedLength = 20 + 21
    return generateStaggeredSequence(accent, '#000', 3, stretchedLength)
  }

  const neonPurple = '#e100ff' as Color
  const neonPink = '#FF00A0' as Color
  const neonOrange = '#ff9904' as Color
  const neonYellow = '#EBFF04' as Color
  const neonGreen = '#79FF04' as Color
  const neonBlue = '#04FFFF' as Color


  const initialPanelConfigs = [
    {
      stitchesPerRow: 10,
      colorShift: 0,
      colorSequence: colorSequenceWithAccent(neonOrange),
      flip: true,
    },
    {
      stitchesPerRow: 20,
      colorShift: 0,
      colorSequence: stretchedColorSequenceWithAccent(neonPink)

    },
    {
      stitchesPerRow: 19,
      colorShift: 17,
      colorSequence: colorSequenceWithAccent(neonPurple)
    },
    {
      stitchesPerRow: 18,
      colorShift: 0,
      colorSequence: colorSequenceWithAccent(neonBlue)
    },
    {
      stitchesPerRow: 16,
      colorShift: 0,
      colorSequence: colorSequenceWithAccent(neonGreen),
      flip: true,
    },
    {
      stitchesPerRow: 16,
      colorShift: 3,
      colorSequence: oddColorSequenceWithAccent(neonYellow)
    },
    {
      stitchesPerRow: 15,
      colorShift: 0,
      colorSequence: colorSequenceWithAccent(neonGreen)
    },
    {
      stitchesPerRow: 14,
      colorShift: 2,
      colorSequence: oddColorSequenceWithAccent(neonBlue),
      flip: true,
    },
    {
      stitchesPerRow: 12,
      colorShift: 0,
      colorSequence: colorSequenceWithAccent(neonPurple)
    },
    {
      stitchesPerRow: 12,
      colorShift: 0,
      colorSequence: oddColorSequenceWithAccent(neonPink)
    },
    {
      stitchesPerRow: 11,
      colorShift: 16,
      colorSequence: colorSequenceWithAccent(neonOrange)
    },
    {
      stitchesPerRow: 11,
      colorShift: 15, // 15, 15', 5, 5'
      colorSequence: oddColorSequenceWithAccent(neonYellow),
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
  const selectedAccentColorLength = selectedSwatchConfig.colorSequence[0].length
  const setSelectedColorLengthsBasedOnAccent = (newAccentLength: number) => {
    const nextPanelConfigs = [...panelConfigs]
    const prevSequence = selectedSwatchConfig.colorSequence
    const seqLength = totalColorSequenceLength(prevSequence)
    if(prevSequence.length === 2) {
      nextPanelConfigs[selectedSwatchIndex].colorSequence = [
        { color: prevSequence[0].color, length: newAccentLength},
        { color: prevSequence[1].color, length: seqLength - newAccentLength},
      ]
    } else if(prevSequence.length === 4) {
      nextPanelConfigs[selectedSwatchIndex].colorSequence = generateStaggeredSequence(
        prevSequence[0].color,
        prevSequence[1].color,
        newAccentLength,
        seqLength
      )
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
          <ColorSequenceInfo colorSequence={selectedSwatchConfig.colorSequence} colorShift={selectedSwatchConfig.colorShift}/>
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

