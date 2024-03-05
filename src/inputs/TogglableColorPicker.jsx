import { Fragment } from 'react'
import PropTypes from "prop-types";
import fontColorContrast from 'font-color-contrast';
import { SketchPicker } from 'react-color';
import { useState } from "react";

const TogglableColorPicker = ({ value, setValue, presetColors, togglePicker, showPicker }) => {
  const [pickerColor, setPickerColor] = useState(value)

  return (
    <Fragment>
      <span
        className='color-preview'
        style={ {
          background: value,
          color: fontColorContrast(value),
        }}
        onClick={togglePicker}
      >
        {value}
      </span>
      {
        showPicker ?
          (
            <div className='popover'>
              <div className='cover' onClick={togglePicker} />
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
  togglePicker: PropTypes.func,
  showPicker: PropTypes.bool
}

export default TogglableColorPicker
