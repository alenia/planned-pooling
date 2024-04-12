import ClickableTooltip from '../ClickableTooltip';

const NumericInput = (
  { value, name, label, title, setValue, validator = () => true, withTooltip}
  : { value: number | undefined,
      name: string,
      label: string,
      title: string,
      setValue: (value: number | undefined) => void,
      validator?: (value: number) => boolean,
      withTooltip?: boolean,
    }
) => {
  const setValueFromForm = (formValue: string) : void => {
    if(formValue === undefined) {
      setValue(formValue)
      return
    }
    let v : number | undefined = parseFloat(formValue)
    if (isNaN(v) || !validator(v)) { v = undefined }
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


