import './style.scss'
import { buildSwatch } from './swatch.js'

document.querySelector('#app').innerHTML = `
<p>Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div id="sc-hat"></div>
<div id="shell-hat"></div>
<div id="shell-hat2" class="vertical"></div>
<div id="rmr1"></div>
<div id="rmr2" class="vertical"></div>
<div id="vstitch-pooler"></div>
<div id="vstitch-pooler2" class="vertical"></div>
<div id="granny-pooler"></div>
<div id="granny-pooler2" class="vertical"></div>
<div id="jasmine-pooler"></div>
<div id="jasmine-pooler2" class="vertical"></div>
`

const orange = "#fcd67c";
const cream = "#fcf7eb";
const blue = "#cff7fc";
const colorConfigHatSC = [
  {color: orange, length: 5},
  {color: cream, length: 4},
  {color: orange, length: 5},
  {color: blue, length: 5},
  {color: cream, length: 4},
  {color: blue, length: 5},
]
const colorConfigHatShell = [
  {color: orange, length: 1},
  {color: cream, length: 1},
  {color: orange, length: 1},
  {color: blue, length: 1},
  {color: cream, length: 1},
  {color: blue, length: 1},
]


const yellow = "#faf619";
const red = "#fa1933";
const confetti = "#c6f5f2";
const colorConfigScarf1 = [
  {color: yellow, length: 2},
  {color: red, length: 6},
  {color: yellow, length: 2},
  {color: confetti, length: 7},
]
const colorConfigScarf2 = [
  {color: red, length: 6},
  {color: yellow, length: 2},
  {color: confetti, length: 8},
  {color: yellow, length: 2},
]

const colorConfig = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEEE", length: 13},
]

buildSwatch(document.querySelector('#sc-hat'), { colorConfig: colorConfigHatSC, stitchesPerCrow: 29, stitchPattern: 'stacked'})
buildSwatch(document.querySelector('#shell-hat'), { colorConfig: colorConfigHatShell, stitchesPerCrow: 11, stitchPattern: 'shell'})
buildSwatch(document.querySelector('#shell-hat2'), { colorConfig: colorConfigHatShell, stitchesPerCrow: 11, stitchPattern: 'shell'})
buildSwatch(document.querySelector('#rmr1'), { colorConfig: colorConfigScarf1, stitchesPerCrow: 25, crows: 36, stitchPattern: 'moss'})
buildSwatch(document.querySelector('#rmr2'), { colorConfig: colorConfigScarf2, stitchesPerCrow: 18, stitchPattern: 'moss'})
buildSwatch(document.querySelector('#granny-pooler'), { colorConfig, stitchesPerCrow: 10, stitchPattern: 'granny'})
buildSwatch(document.querySelector('#granny-pooler2'), { colorConfig, stitchesPerCrow: 10, stitchPattern: 'granny'})
buildSwatch(document.querySelector('#vstitch-pooler'), { colorConfig, stitchesPerCrow: 10, stitchPattern: 'v-stitch'})
buildSwatch(document.querySelector('#vstitch-pooler2'), { colorConfig, stitchesPerCrow: 10, stitchPattern: 'v-stitch'})
buildSwatch(document.querySelector('#jasmine-pooler'), { colorConfig, stitchesPerCrow: 11, stitchPattern: 'jasmine' })
buildSwatch(document.querySelector('#jasmine-pooler2'), { colorConfig, stitchesPerCrow: 11, stitchPattern: 'jasmine' })
