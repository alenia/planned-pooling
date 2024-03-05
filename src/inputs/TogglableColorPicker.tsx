import { Fragment } from 'react'
import fontColorContrast from 'font-color-contrast';
import { ColorResult, SketchPicker } from 'react-color';
import { useState } from "react";

const TogglableColorPicker = (
  { value, setValue, presetColors }
  : { value: string, setValue: (color: string) => void, presetColors: Array<string> }
) => {
  const [pickerColor, setPickerColor] = useState(value)
  const [displayPicker, setDisplayPicker] = useState(false)

  return (
    <Fragment>
      <span
        className='color-preview'
        style={ {
          background: value,
          color: fontColorContrast(value),
        }}
        onClick={() => setDisplayPicker(true)}
      >
        {value}
      </span>
      {
        displayPicker ?
          (
            <div className='popover'>
              <div className='cover' onClick={() => setDisplayPicker(false)} />
              <SketchPicker
                color={pickerColor || value}
                disableAlpha={true}
                onChange={(colorResult: ColorResult) => { setPickerColor(colorResult.hex) }}
                onChangeComplete={(colorResult: ColorResult) => {setValue(colorResult.hex) }}
                presetColors={presetColors}
              /> 
            </div>
          ) : null
      }
    </Fragment>
  )
};

export default TogglableColorPicker
