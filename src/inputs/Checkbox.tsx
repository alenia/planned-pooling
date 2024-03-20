import ClickableTooltip from '../ClickableTooltip';


function Checkbox(
  { value, name, label, title, setValue, withTooltip}
  : { value: boolean,
      name: string,
      label: string,
      title: string,
      setValue: (value: boolean) => void,
      withTooltip?: boolean,
    }
  ){

  return (
      <div className="checkbox-input">
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
        { withTooltip ? <ClickableTooltip title={title} /> : '' }
      </div>
  )
}

export default Checkbox;
