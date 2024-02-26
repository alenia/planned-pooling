import Swatch from './Swatch.jsx';
import Form from './Form.jsx';
import { useState } from "react";

function SwatchWithForm({ colorConfig, crowLength, stitchPattern, crows, colorShift, staggerLengths}) {
  const [formData, setFormData] = useState({
    colorConfig,
    crowLength,
    crows,
    colorShift,
    staggerLengths,
    stitchPattern,
  })

  return (
  <div>
    <Form
      formData={formData}
      setFormData={setFormData} 
    />
    <Swatch {...formData} />
  </div>
  );
}

SwatchWithForm.propTypes = Swatch.propTypes;

export default SwatchWithForm;
