import './Form.scss'

const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern } = formData;

  const handleChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const handleChangeNumber = (name, value) => {
    const newFormData = { ...formData };
    newFormData[name] = parseInt(value);
    setFormData(newFormData);
  };

  const handleChangePositiveInteger = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(parseInt(value)) || value < 0) { value = 0 }
    handleChangeNumber(e.target.name, value);
  }

  const handleChangeInteger = (e) => {
    let value = parseInt(e.target.value)
    if (isNaN(parseInt(value))) { value = 0 }
    handleChangeNumber(e.target.name, value);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div>
        <label htmlFor="crowLength" title="The number of stitches in one row">
          Stitches per row:
        </label>
        <input
          onChange={handleChangePositiveInteger}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          name="crowLength"
          id="crowLength"
          value={crowLength}
        />
      </div>

      <input
        type="hidden"
        name="crows"
        id="crows"
        value={crows}
      />

      <div>
        <label htmlFor="colorShift" title="Start the swatch this many stitches into your color sequence">
          Color shift:
        </label>
        <input
          onChange={handleChangeInteger}
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          name="colorShift"
          id="colorShift"
          value={colorShift}
        />
      </div>

      <input
        type="hidden"
        name="staggerLengths"
        id="staggerLengths"
        value={staggerLengths}
      />

      <input
        type="hidden"
        name="stitchPattern"
        id="stitchPattern"
        value={stitchPattern}
      />
    </form>
  );
}

export default Form;
