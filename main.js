import './style.scss'
import { buildSwatch } from './swatch.js'

// <div id="sc-hat"></div>
document.querySelector('#app').innerHTML = `
<p>Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div id="tmp"></div>
<div id="tmp2"></div>
<div id="tmp3"></div>
<div id="giants-shell" class="vertical"></div>
<div id="giants-shell2" class="vertical"></div>
<div id="hdc-hat" class="vertical"></div>
<div id="hdc-hat2" class="vertical"></div>
<div id="hdc-hat3" class="vertical"></div>
<div id="hdc-hat4" class="vertical"></div>
<div id="shell-hat2" class="vertical"></div>
<div id="rmr1"></div>
<div id="rmr2" class="vertical"></div>
<div id="vstitch-pooler"></div>
<div id="vstitch-pooler2" class="vertical"></div>
<div id="granny-pooler"></div>
<div id="granny-pooler2" class="vertical"></div>
<div id="jasmine-pooler"></div>
<div id="jasmine-pooler2" class="vertical"></div>
<div id="ripple-pooler"></div>
<div id="ripple-pooler2"></div>
<div id="ripple-pooler3" class="vertical"></div>
<div id="vstitch-cluster"></div>
<div id="angled-block-cluster"></div>
<div id="angled-block-cluster2" class="vertical"></div>
`

const orange = "#fcd67c";
const lightGreen = "#a0c458";
const green = "#345c19";
const cream = "#fcf7eb";
const blue = "#cff7fc";

const colorConfigDuna = [
  {color: cream, length: 4},
  {color: lightGreen, length: 3},
  {color: green, length: 5},
  {color: lightGreen, length: 4}
]
const colorConfigHatSC = [
  {color: orange, length: 5},
  {color: cream, length: 4},
  {color: orange, length: 5},
  {color: blue, length: 5},
  {color: cream, length: 4},
  {color: blue, length: 5},
]
const colorConfigHatHDC = [
  {color: orange, length: 4},
  {color: cream, length: 3},
  {color: orange, length: 4},
  {color: blue, length: 3},
  {color: cream, length: 3},
  {color: blue, length: 3},
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

const colorConfigGiants = [
	{color: "orange", length: 8},
	{color: "#ED7014", length: 1},
	{color: "orange", length: 8},
	{color: "cream", length: 4}
]

const colorConfigGiantsShell = [
	{color: "orange", length: 4},
	{color: "cream", length: 1}
]

const colorConfigAmherst = [
	{color: "#9d5ec4", length: 4}, // purple
	{color: "#11364f", length: 2}, // purple green
	{color: "#125724", length: 5}, // dark green
	{color: "#f788dd", length: 5}, // pink
	{color: "#f0c0ed", length: 2}, // pink/purple/white
]

const colorConfigWollmeise = [
	{color: "#e00995", length: 1}, // magenta
	{color: "#06bf44", length: 1}, // gradient
	{color: "#02e6c7", length: 1}, // turquoise
	{color: "#06bf44", length: 1}, // gradient
]

const darkBlueSJI = "#1e2752";
const lightBlueSJI = "#9ba4d1";
const peachSJI = "#de8a64";
const yellowSJI = "#f2cf6f";
const colorConfigSJI = [
	{color: darkBlueSJI, length: 9},
	{color: lightBlueSJI, length: 3},
	{color: yellowSJI, length: 1},
	{color: peachSJI, length: 1},
	{color: darkBlueSJI, length: 5},
	{color: peachSJI, length: 1},
	{color: yellowSJI, length: 1},
	{color: lightBlueSJI, length: 3},
]

//const colorConfigCurrent = colorConfigSJI;
//const currentLength = 36;
const colorConfigCurrent = colorConfigDuna;
const currentLength = 16;

buildSwatch(document.querySelector('#tmp'), { colorConfig: colorConfigCurrent, crowLength: currentLength, stitchPattern: 'moss', staggerLengths: true})
buildSwatch(document.querySelector('#tmp2'), { colorConfig: colorConfigCurrent, crowLength: currentLength, stitchPattern: 'moss', colorShift: 7})
buildSwatch(document.querySelector('#tmp3'), { colorConfig: colorConfigCurrent, crowLength: currentLength, stitchPattern: 'moss', colorShift: 4})
buildSwatch(document.querySelector('#giants-shell'), { colorConfig: colorConfigGiantsShell, crowLength: 10, stitchPattern: 'shell'})
buildSwatch(document.querySelector('#giants-shell2'), { colorConfig: colorConfigGiantsShell, crowLength: 12, stitchPattern: 'shell'})
buildSwatch(document.querySelector('#hdc-hat'), { colorConfig: colorConfigHatHDC, crowLength: 39, crows: 12, colorShift: 6, staggerLengths: true, stitchPattern: 'hdc'})
buildSwatch(document.querySelector('#rmr1'), { colorConfig: colorConfigScarf1, crowLength: 25, crows: 36, stitchPattern: 'moss'})
buildSwatch(document.querySelector('#rmr2'), { colorConfig: colorConfigScarf2, crowLength: 18, stitchPattern: 'moss'})
buildSwatch(document.querySelector('#granny-pooler'), { colorConfig, crowLength: 10, stitchPattern: 'granny'})
buildSwatch(document.querySelector('#granny-pooler2'), { colorConfig, crowLength: 10, stitchPattern: 'granny'})
buildSwatch(document.querySelector('#vstitch-pooler'), { colorConfig, crowLength: 10, stitchPattern: 'v-stitch'})
buildSwatch(document.querySelector('#vstitch-pooler2'), { colorConfig, crowLength: 10, stitchPattern: 'v-stitch'})
buildSwatch(document.querySelector('#jasmine-pooler'), { colorConfig, crowLength: 11, stitchPattern: 'jasmine' })
buildSwatch(document.querySelector('#jasmine-pooler2'), { colorConfig, crowLength: 11, stitchPattern: 'jasmine' })
buildSwatch(document.querySelector('#ripple-pooler'), { colorConfig, crowLength: 3, stitchPattern: 'ripple' })
buildSwatch(document.querySelector('#ripple-pooler2'), { colorConfig, crowLength: 4, stitchPattern: 'ripple' })
buildSwatch(document.querySelector('#ripple-pooler3'), { colorConfig, crowLength: 4, stitchPattern: 'ripple' })
buildSwatch(document.querySelector('#vstitch-cluster'), { colorConfig: colorConfigScarf2, crowLength: 12, stitchPattern: 'vstitchCluster' })
buildSwatch(document.querySelector('#angled-block-cluster'), { colorConfig, crowLength: 3, stitchPattern: 'ablockCluster' })
buildSwatch(document.querySelector('#angled-block-cluster2'), { colorConfig, crowLength: 3, stitchPattern: 'ablockCluster' })
