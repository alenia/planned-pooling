import './style.scss'
import { buildSwatch } from './swatch.js'

const colorConfig = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEEE", length: 13},
]

//crow means crocheted row
const stitchesPerCrow = 10;


document.querySelector('#app').innerHTML = `
<p>Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div id="stacked-pooler"></div>
<div id="moss-pooler"></div>
<div id="vstitch-pooler"></div>
<div id="shell-pooler"></div>
<div id="granny-pooler"></div>
`

buildSwatch(document.querySelector('#stacked-pooler'), { colorConfig, stitchesPerCrow, stitchPattern: 'stacked'})
buildSwatch(document.querySelector('#moss-pooler'), { colorConfig, stitchesPerCrow, stitchPattern: 'moss'})
buildSwatch(document.querySelector('#granny-pooler'), { colorConfig, stitchesPerCrow, stitchPattern: 'granny'})
buildSwatch(document.querySelector('#vstitch-pooler'), { colorConfig, stitchesPerCrow, stitchPattern: 'v-stitch'})
buildSwatch(document.querySelector('#shell-pooler'), { colorConfig, stitchesPerCrow, stitchPattern: 'shell'})
