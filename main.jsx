import './style.scss'
import Swatch, { buildSwatch } from './swatch.jsx';
import Preview from './preview.jsx';
import { createRoot } from 'react-dom/client';

const orange = "#fcd67c";
const cream = "#fcf7eb";
const blue = "#cff7fc";
const colorConfigHatHDC = [
  {color: orange, length: 4},
  {color: cream, length: 3},
  {color: orange, length: 4},
  {color: blue, length: 3},
  {color: cream, length: 3},
  {color: blue, length: 3},
]
const hdcHatProps = { colorConfig: colorConfigHatHDC, crowLength: 39, crows: 12, colorShift: 6, staggerLengths: true, stitchPattern: 'hdc'}

const root = createRoot(document.getElementById('app'));
root.render(
  <div className="container">
  <p>Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
  <Swatch id="hdc-hat" className="vertical" {...hdcHatProps}/>
  <Preview/>
</div>)

