import './FadingPool.scss';
import SwatchWithForm from '../SwatchWithForm';
import Swatch from '../Swatch';
import { StitchPattern, ColorSequenceArray } from '../types'
import { Fragment, useState } from "react";
import TogglableColorPicker from '../inputs/TogglableColorPicker'
import { totalColorSequenceLength, presetPickerColors } from '../colorSequenceHelpers';
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';
import { Color } from '../types'

function FadingPool() {
  const initialColorSequence = [
    { color: "#dfebea", length: 12 },
    { color: "#10dbcc", length: 4 }
  ] as ColorSequenceArray
  const [fade1Color, setFade1Color] = useState('#9E7DB9' as Color)
  const [fade2Color, setFade2Color] = useState('#CAB1E4' as Color)
  const [fade3Color, setFade3Color] = useState('#E4D4F5' as Color)
  const [fade4Color, setFade4Color] = useState('#F5E8FE' as Color)
  const [fade5Color, setFade5Color] = useState('#CBF7FA' as Color)
  const [fade6Color, setFade6Color] = useState('#7DF2E6' as Color)

  const fadeColors = [fade1Color, fade2Color, fade3Color, fade4Color, fade5Color, fade6Color]

  const fadeColorStyles = {
    "--fade-1-color": fade1Color,
    "--fade-2-color": fade2Color,
    "--fade-3-color": fade3Color,
    "--fade-4-color": fade4Color,
    "--fade-5-color": fade5Color,
    "--fade-6-color": fade6Color,
  } as React.CSSProperties

  const defaultSwatchConfig = {
    colorSequence: initialColorSequence,
    stitchesPerRow: totalColorSequenceLength(initialColorSequence),
    numberOfRows: 38,
    colorShift: 0,
    staggerLengths: true,
    stitchPattern: StitchPattern.moss,
  }

  const { swatchConfig, setSwatchConfig, setSearchParams } = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)

  const miniPlaidConfiguration = {
    numberOfRows: 40*6,
    staggerLengths: swatchConfig.staggerLengths,
    stitchPattern: StitchPattern.compactMoss
  }

  const presetColors = presetPickerColors({colorSequence: swatchConfig.colorSequence, extraColors: fadeColors})

  return (
    <Fragment>
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        showRowNumbersInitially={true}
        formClasses='wide-first-column'
        swatchClasses='multicolor-hacks'
      />
      <br/>
      <h4>Fade Preview</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <fieldset>
          <div>
            Fade Colors:
          </div>
          <TogglableColorPicker
            value = {fade1Color}
            setValue={setFade1Color}
            presetColors = { presetColors }
          />
          <TogglableColorPicker
            value = {fade2Color}
            setValue={setFade2Color}
            presetColors = { presetColors }
          />
          <TogglableColorPicker
            value = {fade3Color}
            setValue={setFade3Color}
            presetColors = { presetColors }
          />
          <TogglableColorPicker
            value = {fade4Color}
            setValue={setFade4Color}
            presetColors = { presetColors }
          />
          <TogglableColorPicker
            value = {fade5Color}
            setValue={setFade5Color}
            presetColors = { presetColors }
          />
          <TogglableColorPicker
            value = {fade6Color}
            setValue={setFade6Color}
            presetColors = { presetColors }
          />
        </fieldset>
      </form>
      <div className="flexy" style={fadeColorStyles}>
        <div className="marled-no-fade mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration} />
        </div>
        <div className="eight-row-color-fade mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration} />
        </div>
      </div>
    </Fragment>
  );
}

export default FadingPool;

