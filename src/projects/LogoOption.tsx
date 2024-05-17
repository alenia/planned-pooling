//This file is a copy of App.jsx but with my specific color config for what I'm working on and advanced stitch patterns
//Eventually I just want to load the data from specific JSON for my personal projects
//But for now I'll do this
import Swatch from '../Swatch';
import { StitchPattern, Color } from '../types'
import { useState } from "react";

const coral = "#e26654" as Color;
const teal = "#317781" as Color;
const cream = "#fefbec" as Color;
const lightTeal = "#70afb7" as Color;

function LogoOption() {
  const sharedConfig = {
    stitchesPerRow: 16,
    stitchPattern: StitchPattern.moss,
    className: 'no-margin'
  }
  const singleSequence = [
    {color: lightTeal, length: 8},
    {color: teal, length: 8},
  ]
  const alternatingSequence = [
    {color: teal, length: 6},
    {color: lightTeal, length: 10},
    {color: teal, length: 6},
    {color: lightTeal, length: 11},
  ]
  const stripedConfig = {
    colorSequence: singleSequence,
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: false,
    ...sharedConfig
  }

      //<Swatch staggerType='colorSwallowed' {...stripedConfig} staggerLengths={true} numberOfRows={16} colorShift={9}/>
  return (
    <div>
      <div style={{transformOrigin: '300px 300px', transform: 'rotate(270deg)', height: 'fit-content', width: 'fit-content'}}>
        <Swatch staggerType='normal' {...stripedConfig}/>
        <Swatch staggerType='colorStretched' {...stripedConfig} staggerLengths={true} numberOfRows={20} colorShift={9}/>
        <Swatch staggerType='colorStretched' {...stripedConfig} staggerLengths={true} numberOfRows={48}/>
      </div>
      <div style={{transformOrigin: '300px 300px', transform: 'rotate(270deg)', height: 'fit-content', width: 'fit-content'}}>
        <Swatch staggerType='normal' {...stripedConfig}/>
        <Swatch staggerType='colorStretched' {...stripedConfig} staggerLengths={true} numberOfRows={64}/>
        <Swatch staggerType='normal' {...stripedConfig}/>
      </div>
    </div>
  );
}

export default LogoOption;

