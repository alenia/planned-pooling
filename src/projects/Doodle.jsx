//This file is a copy of App.jsx but with my specific color config for what I'm working on and advanced stitch patterns
//Eventually I just want to load the data from specific JSON for my personal projects
//But for now I'll do this
import Swatch from '../Swatch.jsx';
import Form from '../Form.jsx';
import { useState } from "react";

const grey = "#4f4d4d";
const dark = "#30221a";
const orange = "#d66127";
const yellow = "#f5b638";

function Doodle() {
  const [formData, setFormData] = useState({
    colorConfig: [
      {color: dark, length: 1},
      {color: grey, length: 2},
      {color: dark, length: 1},
      {color: orange, length: 1},
      {color: yellow, length: 2},
      {color: orange, length: 1},
    ],
    crowLength: 15,
    crows: 9,
    colorShift: 1,
    staggerLengths: false,
    stitchPattern: 'jasmine',
  })

  return (
  <div className="container">
    <p>This displays what the Zen Garden 500g ball looks like in Jasmine Stitch</p>
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

export default Doodle;
