import { Fragment } from 'react'
import fontColorContrast from 'font-color-contrast';
import { ColorResult, SketchPicker } from 'react-color';
import { Color } from '../types'
import { useState, useEffect } from "react";


const forceColorType = (colorString : string) : Color => {
  if ((/#\w+/).test(colorString)) {
    return colorString as Color
  } else {
    console.warn(`${colorString} does not match color string regex. This is unexpected behavior`)
    return `#${colorString}`
  }
}

const TogglableColorPicker = (
  { value, setValue, presetColors }
  : { value: Color, setValue: (color: Color) => void, presetColors?: Array<string> }
) => {
  const [pickerColor, setPickerColor] = useState(value)
  const [displayPicker, setDisplayPicker] = useState(false)

  // If something else changes the value, this updates the color picker
  useEffect(() => {
    setPickerColor(value)
  }, [value]);

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
                onChange={(colorResult: ColorResult) => { setPickerColor(forceColorType(colorResult.hex)) }}
                onChangeComplete={(colorResult: ColorResult) => {setValue(forceColorType(colorResult.hex)) }}
                presetColors={presetColors}
              /> 
            </div>
          ) : null
      }
    </Fragment>
  )
};

export default TogglableColorPicker
