import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

function Checkbox(
  { className, value, name, label, title, setValue, showTooltip}
  : { className: string,
      value: boolean,
      name: string,
      label: string,
      title: string,
      setValue: (value: boolean) => void,
      showTooltip?: boolean,
    }
  ){
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
          showTooltip ? <FontAwesomeIcon icon={faCircleInfo} title={title} /> : ''
        }
      </div>
  )
}

export default Checkbox;
