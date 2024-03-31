import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
import IntegerInput from '../inputs/Integer'
import { useState } from "react";

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
    stitchPattern: StitchPattern.moss,
  }

  const neonPurple = '#e100ff' as Color
  const neonPink = '#FF00A0' as Color
  const neonOrange = '#ff9904' as Color
  const neonYellow = '#EBFF04' as Color
  const neonGreen = '#79FF04' as Color
  const neonBlue = '#04FFFF' as Color

  return (
    <div className="container">
      <IntegerInput
        label="Color shift:"
        title={"color shift"}
        name="colorShift"
        value={mainColorShift}
        setValue={setMainColorShift}
      />
      {/*
      <p>combined, no really random ones</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={10} colorShift={7} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={20} colorShift={10} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorShift={4} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={1} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={1} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={1} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={6} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorShift={6} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={5} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={3} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorShift={0} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorShift={0} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
      </div>
      combined alternate
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={10} colorShift={7} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={20} colorShift={11} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorShift={13} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={3} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={4} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={3} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={10} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorShift={5} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={19} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={13} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorShift={3} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorShift={7} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
      </div>
        */}
      combined alternate 2
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={10} colorShift={7} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={20} colorShift={11} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorShift={4} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={13} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={1} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={3} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={17} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorShift={5} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={5} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={13} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorShift={3} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorShift={7} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
      </div>
      {/*
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={20} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={colorSequenceWithAccent(neonOrange)}/>
      </div>
      <p>odd</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={20} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
      </div>
      <p>combined</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={10} colorShift={7} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={20} colorShift={10} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorShift={3} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={1} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonGreen)}/> {//can be even or odd, very random }
        <Swatch {...sharedConfig} stitchesPerRow={16} colorShift={1} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={6} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorShift={6} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={oddColorSequenceWithAccent(neonPurple)}/> {//can be even or odd, very random}
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
      </div>
    */}
    </div>
  );
}

export default DiffusionScarf;

