function Checkbox(
  { className, value, name, label, title, setValue}
  : { className: string, value: boolean, name: string, label: string, title: string, setValue: (value: boolean) => void}
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
      </div>
  )
}

export default Checkbox;
