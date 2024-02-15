const Form = ({ formData, setFormData }) => {
  const { colorConfig, crowLength, crows, colorShift, staggerLengths, stitchPattern } = formData;

  const onChange = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = e.target.value;
    setFormData(newFormData);
  };

  const onChangeNumber = (e) => {
    const newFormData = { ...formData };
    newFormData[e.target.name] = parseInt( e.target.value );
    setFormData(newFormData);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="crowLength" title="The number of stitches in one row">
        Stitches per row:
      </label>
      <input
        onChange={onChangeNumber}
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        name="crowLength"
        id="crowLength"
        value={crowLength}
      />

      <input
        type="hidden"
        name="crows"
        id="crows"
        value={crows}
      />

      <input
        type="hidden"
        name="colorShift"
        id="colorShift"
        value={colorShift}
      />

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
