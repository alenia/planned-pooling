import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";

function Checkbox(
  { className, value, name, label, title, setValue, withTooltip}
  : { className: string,
      value: boolean,
      name: string,
      label: string,
      title: string,
      setValue: (value: boolean) => void,
      withTooltip?: boolean,
    }
  ){
  const [displayTooltip, setDisplayTooltip] = useState(false);

  return (
      <div className={className}>
        <input
          type="checkbox"
          onChange={
            (e) => {
              setValue(e.target.checked);
            }
          }
          name={name}
          id={name}
          checked={value}
        />
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
  )
}

export default Checkbox;
