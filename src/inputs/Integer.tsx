import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

enum Direction {
  DOWN,
  UP
}

const IntegerInput = (
  { value, name, label, title, setValue, validator = () => true, withTooltip}
  : { value: number,
      name: string,
      label: string,
      title: string,
      setValue: (value: number) => void,
      validator?: (value: number) => boolean,
      withTooltip?: boolean,
    }
) => {
  const [displayTooltip, setDisplayTooltip] = useState(false);
  const handleButtonChange = (direction : Direction) : void => {
    let v = value;
    if(direction === Direction.DOWN) {
      v -= 1
    }
    if(direction === Direction.UP) {
      v += 1
    }
    if(!validator(v)) { return }
    setValue(v)
  }
  const setValueFromForm = (formValue: string) : void => {
    let v = parseInt(formValue)
    if (isNaN(v) || !validator(v)) { v = 0 }
    setValue(v);
  }
  return (
      <div className="input-group integer-input">
        <div className='label-wrapper'>
          <label htmlFor={name} title={title}>
            {label}
          </label>
          {
            withTooltip ? <FontAwesomeIcon icon={faCircleInfo} title={title} onClick={() => setDisplayTooltip(!displayTooltip)} /> : ''
          }
          {
            withTooltip && displayTooltip ? (<div className="tooltip" onClick={() => setDisplayTooltip(!displayTooltip)}>{title}</div>) : ''
          }
        </div>
        <div className="number-spinner">
          <button
            type="button"
            onClick={() => handleButtonChange(Direction.DOWN)}
          >-</button>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => setValueFromForm(e.target.value)}
            name={name}
            id={name}
            value={value}
          />
          <button
            type="button"
            onClick={() => handleButtonChange(Direction.UP)}
          >+</button>
        </div>
      </div>
  )
};


IntegerInput.validators = {
  nonNegative: (v : number) => v >= 0
}

export default IntegerInput;

