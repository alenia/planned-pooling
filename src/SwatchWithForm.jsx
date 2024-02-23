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
    <Swatch
      colorConfig={formData.colorConfig}
      crowLength={formData.crowLength}
      crows={formData.crows}
      colorShift={formData.colorShift}
      staggerLengths={formData.staggerLengths}
      stitchPattern={formData.stitchPattern}
    />
  </div>
  );
}

SwatchWithForm.propTypes = Swatch.propTypes;

export default SwatchWithForm;
