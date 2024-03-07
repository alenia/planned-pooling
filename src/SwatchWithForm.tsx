import Swatch from './Swatch';
import Form from './Form';
import { useState } from "react";
import { StitchPattern, ColorConfigArray } from './types'

function SwatchWithForm(
  { colorConfig, crowLength, stitchPattern, crows, colorShift, staggerLengths, showRowNumbers = false}
  : {
    colorConfig: ColorConfigArray,
    crowLength: number,
    stitchPattern: StitchPattern,
    crows: number,
    colorShift: number,
    staggerLengths: boolean,
    showRowNumbers: boolean
  }

) {
  const [formData, setFormData] = useState({
    colorConfig,
    crowLength,
    crows,
    colorShift,
    staggerLengths,
    stitchPattern,
    showRowNumbers,
  })

  return (
  <div className='container'>
    <Form
      formData={formData}
      setFormData={setFormData} 
    />
    <Swatch 
    className={formData.showRowNumbers ? "numbered" : ""}
    {...formData} />
  </div>
  );
}

export default SwatchWithForm;
