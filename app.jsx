import './styles/form.scss'
import './styles/swatch.scss'
import Swatch, { buildSwatch } from './swatch.jsx';
import Preview from './preview.jsx';
import Form from './form.jsx';
import React, { useState } from "react";

const red = "#ff001d";
const cream = "#fcf7eb";
const ltblue = "#8dd0f2";
const navy = "#0e0e66";

function App() {
  const [formData, setFormData] = useState({
    colorConfig: [
      {color: navy, length: 3},
      {color: red, length: 3},
      {color: navy, length: 3},
      {color: ltblue, length: 2},
      {color: cream, length: 5},
      {color: ltblue, length: 2},
    ],
    crowLength: 18,
    crows: 12,
    colorShift: 0,
    staggerLengths: false,
    stitchPattern: 'moss',
  })

  return (
  <div className="container">
    <p>Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
    <Form
      formData={formData}
      setFormData={setFormData} 
    />
    <Swatch
      id="hdc-hat"
      className="vertical"
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

export default App;
