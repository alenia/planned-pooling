import Swatch from '../Swatch';
import { StitchPattern, Color, ColorSequenceArray } from '../types'
import IntegerInput from '../inputs/Integer'
import { useState } from "react";

function DiffusionScarf() {
  const [mainColorShift, setMainColorShift] = useState(0)
  const colorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 14},
    {color: accent, length: 4}
  ])
  const oddColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 15},
    {color: accent, length: 4}
  ])
  const stretchedColorSequenceWithAccent = (accent : Color) : ColorSequenceArray => ([
    {color: '#000', length: 14},
    {color: accent, length: 4},
    {color: '#000', length: 15},
    {color: accent, length: 4}
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
      <p>1</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={20} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={stretchedColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={swallowedColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonBlue)}/>
      </div>
      <p>2</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={2} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={stretchedColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonPurple)}/>
      </div>
        */}
      <p>3</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={20} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={19} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={stretchedColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={2} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={swallowedColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        {/*<Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonBlue)}/>*/}
      </div>
      <p>4</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={9} colorShift={5} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={10} colorSequence={stretchedColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={8} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={4} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={swallowedColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonPink)}/>
      </div>
      <p>yellow middle</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={9} colorShift={5} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={10} colorSequence={stretchedColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={8} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={4} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={swallowedColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonOrange)}/>
      </div>
      <p>yellow first</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={9} colorShift={5} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorShift={10} colorSequence={stretchedColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorShift={8} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={4} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={swallowedColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonYellow)}/>
      </div>
      <p>5</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={4} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorShift={3} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={8} colorSequence={colorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={7} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={6} colorShift={1} colorSequence={colorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={5} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={4} colorSequence={colorSequenceWithAccent(neonGreen)}/>
      </div>
      <p>6</p>
      <div className="squashed-swatch-container">
        {/*
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={colorSequenceWithAccent(neonBlue)}/>
          */}
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={8} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={8} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={7} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={7} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={6} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={6} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={5} colorSequence={colorSequenceWithAccent(neonBlue)}/>
      </div>
      <p>7</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={9} colorShift={5} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={18} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={17} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={16} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={15} colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9}  colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={8} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={7} colorSequence={oddColorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={6} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={5} colorSequence={oddColorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={4} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={3}  colorSequence={oddColorSequenceWithAccent(neonBlue)}/>
      </div>
      <p>8</p>
      <div className="squashed-swatch-container">
        <Swatch {...sharedConfig} stitchesPerRow={14} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={13} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorShift={4} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={12} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={11} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={10} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorShift={3} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={9} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={8} colorSequence={colorSequenceWithAccent(neonPink)}/>
        <Swatch {...sharedConfig} stitchesPerRow={8} colorSequence={oddColorSequenceWithAccent(neonPurple)}/>
        <Swatch {...sharedConfig} stitchesPerRow={7} colorSequence={colorSequenceWithAccent(neonBlue)}/>
        <Swatch {...sharedConfig} stitchesPerRow={7} colorSequence={oddColorSequenceWithAccent(neonGreen)}/>
        <Swatch {...sharedConfig} stitchesPerRow={6} colorShift={1} colorSequence={colorSequenceWithAccent(neonYellow)}/>
        <Swatch {...sharedConfig} stitchesPerRow={6} colorSequence={oddColorSequenceWithAccent(neonOrange)}/>
        <Swatch {...sharedConfig} stitchesPerRow={5} colorSequence={colorSequenceWithAccent(neonPink)}/>
      </div>
    </div>
  );
}

export default DiffusionScarf;

