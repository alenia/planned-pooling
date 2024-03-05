function Checkbox(
  { className, value, name, label, title, setValue}
  : { className: string, value: boolean, name: string, label: string, title: string, setValue: (name: string, value: boolean) => void}
  ){
  return (
      <div className={className}>
        <input
          type="checkbox"
          onChange={
            (e) => {
              setValue(e.target.name, e.target.checked);
            }
          }
          name={name}
          id={name}
          value={value.toString()} // Typescript wants me to cast the boolean to a string myself
        />
        <label htmlFor={name} title={title}>
        {label}
        </label>
      </div>
  )
}

export default Checkbox;
