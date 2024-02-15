import './styles/form.scss'
import './styles/swatch.scss'
import Swatch, { buildSwatch } from './swatch.jsx';
import Preview from './preview.jsx';
import Form from './form.jsx';
import React, { useState } from "react";

const orange = "#fcd67c";
const cream = "#fcf7eb";
const blue = "#cff7fc";

function App() {
  const [formData, setFormData] = useState({
    colorConfig: [
      {color: orange, length: 4},
      {color: cream, length: 3},
      {color: orange, length: 4},
      {color: blue, length: 3},
      {color: cream, length: 3},
      {color: blue, length: 3},
    ],
    crowLength: 39,
    crows: 12,
    colorShift: 6,
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