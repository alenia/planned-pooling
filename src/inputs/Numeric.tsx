import ClickableTooltip from '../ClickableTooltip';

const NumericInput = (
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
  const setValueFromForm = (formValue: string) : void => {
    let v : number | undefined = parseFloat(formValue)
    if (isNaN(v) || !validator(v)) { v = 1 }
    setValue(v);
  }

  return (
      <div className="input-group integer-input">
        <div className='label-wrapper'>
          <label htmlFor={name} title={title}>
            {label}
          </label>
          { withTooltip ? <ClickableTooltip title={title} /> : '' }
        </div>
        <input
          type="number"
          inputMode="numeric"
          onChange={(e) => setValueFromForm(e.target.value)}
          name={name}
          id={name}
          value={value}
        />
      </div>
  )
};


NumericInput.validators = {
  nonNegative: (v : number) => v >= 0,
  positive: (v : number) => v > 0
}

export default NumericInput;


