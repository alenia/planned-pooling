import './PoolFade.scss';
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

function PoolFade() {
  const initialColorSequence = [
    { color: "#dfebea", length: 12 },
    { color: "#10dbcc", length: 4 }
  ] as ColorSequenceArray
  const [staggerType, setStaggerType] = useState('colorSwallowed' as StaggerType)
  const [fade1Color, setFade1Color] = useState('#9E7DB9' as Color)

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

  const { swatchConfig, setSwatchConfig, setSearchParams} = useSwatchConfigStateFromURLParams(defaultSwatchConfig);

  useEffectToUpdateURLParamsFromSwatchConfig(swatchConfig, setSearchParams)

  const miniPlaidConfiguration = {
    numberOfRows: 40*6,
    staggerLengths: true,
    staggerType: staggerType,
    stitchPattern: StitchPattern.compactMoss
  }

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
      <div className="flexy" style={{"--fade-1-color": fade1Color} as React.CSSProperties}>
        <div className="multicolor-hacks-1 mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration} />
        </div>
        <div className="multicolor-hacks-2 mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration}/>
        </div>
        <div className="multicolor-hacks-3 mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration} />
        </div>
        <div className="multicolor-hacks-4 mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration} />
        </div>
        <div className="multicolor-hacks-5 mini-horizontal-preview">
          <Swatch {...swatchConfig} {...miniPlaidConfiguration}/>
        </div>
      </div>
    </Fragment>
  );
}

export default PoolFade;

