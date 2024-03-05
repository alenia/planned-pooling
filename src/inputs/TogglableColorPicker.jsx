import { Fragment } from 'react'
import PropTypes from "prop-types";
import fontColorContrast from 'font-color-contrast';
import { SketchPicker } from 'react-color';
import { useState } from "react";

const TogglableColorPicker = ({ value, setValue, presetColors }) => {
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
                onChange={setPickerColor}
                onChangeComplete={setValue}
                presetColors={presetColors}
              /> 
            </div>
          ) : null
      }
    </Fragment>
  )
};

TogglableColorPicker.propTypes = {
  value: PropTypes.string, // color string
  presetColors: PropTypes.arrayOf(PropTypes.string),
  setValue: PropTypes.func,
}

export default TogglableColorPicker
