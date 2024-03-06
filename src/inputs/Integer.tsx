enum Direction {
  DOWN,
  UP
}

const IntegerInput = (
  { value, name, label, title, setValue, validator = () => true}
  : { value: number, name: string, label: string, title: string, setValue: (value: number) => void, validator?: (value: number) => boolean}
) => {
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
        <label htmlFor={name} title={title}>
          {label}
        </label>
        <div className="number-spinner">
          <button onClick={() => handleButtonChange(Direction.DOWN)}>-</button>
          <input
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => setValueFromForm(e.target.value)}
            name={name}
            id={name}
            value={value}
          />
          <button onClick={() => handleButtonChange(Direction.UP)}>+</button>
        </div>
      </div>
  )
};


IntegerInput.validators = {
  nonNegative: (v : number) => v >= 0
}

export default IntegerInput;
