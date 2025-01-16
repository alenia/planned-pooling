import ClickableTooltip from '../ClickableTooltip';

function Dropdown(
  { value, name, label, title, setValue, items, withTooltip }
  : {
      value: string,
      name: string,
      label: string,
      title: string,
      setValue: (value: string) => void,
      items: Array<{value: string, label: string}>,
      withTooltip?: boolean,
    }
  ){

  return (
    <div className="input-group dropdown-input">
      <div className="label-wrapper">
        <label htmlFor={name} title={title}>
          {label}
        </label>
        { withTooltip ? <ClickableTooltip title={title} /> : '' }
      </div>
      <select
        onChange={
          (e) => {
            setValue(e.target.value);
          }
        }
        name={name}
        id={name}
        value={value}
      >
        {
          items.map((itemData) => (
            <option value={itemData.value} key={itemData.value}>
              {itemData.label}
            </option>
          ))
        }
      </select>
    </div>
  )
}

export default Dropdown;
