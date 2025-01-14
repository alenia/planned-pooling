import './FadingPool.scss';
import SwatchWithForm from '../SwatchWithForm';
import Swatch from '../Swatch';
import { StitchPattern, ColorSequenceArray } from '../types'
import { Fragment, useState } from "react";
import DropdownInput from '../inputs/Dropdown';
import TogglableColorPicker from '../inputs/TogglableColorPicker'
import { totalColorSequenceLength } from '../color';
import { useSwatchConfigStateFromURLParams, useEffectToUpdateURLParamsFromSwatchConfig } from '../URLSwatchParams';
import { Color } from '../types'

type StaggerType = 'colorStretched' | 'colorSwallowed'

//NOTE: this is copypasta, refactor later. From Form.tsx
const defaultPickerColors = [
  "#d9073a",
  "#f57605",
  "#fcdc4d",
  "#a1c349",
  "#1c40b8",
  "#7b0f9a",
  "#542e0f",
  "#fdf0d5"
]


function FadingPool() {
  const initialColorSequence = [
    { color: "#dfebea", length: 12 },
    { color: "#10dbcc", length: 4 }
  ] as ColorSequenceArray
  const [staggerType, setStaggerType] = useState('colorSwallowed' as StaggerType)
  const [fade1Color, setFade1Color] = useState('#9E7DB9' as Color)
  const [fade2Color, setFade2Color] = useState('#CAB1E4' as Color)
  const [fade3Color, setFade3Color] = useState('#E4D4F5' as Color)
  const [fade4Color, setFade4Color] = useState('#F5E8FE' as Color)
  const [fade5Color, setFade5Color] = useState('#CBF7FA' as Color)
  const [fade6Color, setFade6Color] = useState('#7DF2E6' as Color)
  const fadeColors = [fade1Color, fade2Color, fade3Color, fade4Color, fade5Color, fade6Color]

  const setStaggerTypeFromDropdown = (newStaggerType: string) => {
    setStaggerType(newStaggerType as StaggerType)
  }

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
    staggerType: staggerType,
    stitchPattern: StitchPattern.compactMoss
  }

  const fadeColorStyles = {
    "--fade-1-color": fade1Color,
    "--fade-2-color": fade2Color,
    "--fade-3-color": fade3Color,
    "--fade-4-color": fade4Color,
    "--fade-5-color": fade5Color,
    "--fade-6-color": fade6Color,
  } as React.CSSProperties

  const presetColors = [...new Set([...defaultPickerColors, ...fadeColors])]; //add in color sequence colors?

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className='wide-first-column'
      >
        <fieldset>
          <DropdownInput
            label="Row alternating technique (for section 2):"
            name="staggerType"
            title="This changes how the piece behaves at the boundary between the end of an even row and beginning of an odd row"
            value={staggerType}
            setValue={setStaggerTypeFromDropdown}
            items={[
              {label: 'Color stretching', value: 'colorStretched'},
              {label: 'Color swallowing', value: 'colorSwallowed'},
            ]}
          />
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
      <SwatchWithForm
        swatchConfig={swatchConfig}
        setSwatchConfig={setSwatchConfig}
        showRowNumbersInitially={true}
        staggerType={staggerType}
        formClasses='wide-first-column'
        swatchClasses='multicolor-hacks'
      />
      <br/>
      <h4>Preview</h4>
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

