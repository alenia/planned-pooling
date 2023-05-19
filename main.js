import './style.scss'
import { buildSwatch } from './swatch.js'

let old = `
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
<div id="ripple-pooler"></div>
<div id="ripple-pooler2"></div>
<div id="ripple-pooler3" class="vertical"></div>
<div id="vstitch-cluster"></div>
<div id="angled-block-cluster"></div>
<div id="angled-block-cluster2" class="vertical"></div>
`
document.querySelector('#app').innerHTML = `
<p>Here's my chart</p>
<div id="angled-block-cluster" class="vertical"></div>
<div id="angled-block-cluster2" class="vertical"></div>
<p>Here's how it works overlapped</p>
<div id="angled-block-cluster3" class="vertical overlapping"></div>
<div id="angled-block-cluster4" class="vertical overlapping swap"></div>
<div id="angled-block-cluster5" class="vertical overlapping"></div>
<div id="angled-block-cluster6" class="vertical overlapping swap"></div>
`

const lightOrange = "#fcd67c";
const cream = "#fcf7eb";
const blue = "#cff7fc";
const colorConfigHatSC = [
  {color: lightOrange, length: 5},
  {color: cream, length: 4},
  {color: lightOrange, length: 5},
  {color: blue, length: 5},
  {color: cream, length: 4},
  {color: blue, length: 5},
]
const colorConfigHatShell = [
  {color: lightOrange, length: 1},
  {color: cream, length: 1},
  {color: lightOrange, length: 1},
  {color: blue, length: 1},
  {color: cream, length: 1},
  {color: blue, length: 1},
]

const purple = "#C274B3";
const teal = "#4ECDC4";
const brown = "#967527";
const orange = "#f0ab0a";
//const colorConfigHeatheredDC = [
  //{ color: purple, length: 5 },
  //{ color: teal, length: 2 },
  //{ color: orange, length: 2 }, 
  //{ color: purple, length: 2 },
  //{ color: brown, length: 3 }, 
  //{ color: orange, length: 1 }, 
  //{ color: teal, length: 2 },
//]
const colorConfigHeatheredDC = [
  { color: purple, length: 5 },
  { color: teal, length: 2 },
  { color: orange, length: 2 }, 
  { color: brown, length: 5 }, 
  { color: orange, length: 1 }, 
  { color: teal, length: 2 },
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

buildSwatch(document.querySelector('#sc-hat'), { colorConfig: colorConfigHatSC, crowLength: 29, stitchPattern: 'stacked'})
buildSwatch(document.querySelector('#shell-hat'), { colorConfig: colorConfigHatShell, crowLength: 11, stitchPattern: 'shell'})
buildSwatch(document.querySelector('#shell-hat2'), { colorConfig: colorConfigHatShell, crowLength: 11, stitchPattern: 'shell'})
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
//buildSwatch(document.querySelector('#angled-block-cluster'), { colorConfig: colorConfigHeatheredDC, crows: 9, crowLength: 8, stitchPattern: 'ablockCluster' })
buildSwatch(document.querySelector('#angled-block-cluster'), { colorConfig: colorConfigHeatheredDC, crows: 2, crowLength: 17, stitchPattern: 'ablockCluster', colorShift: 10 })
buildSwatch(document.querySelector('#angled-block-cluster2'), { colorConfig: colorConfigHeatheredDC, crows: 2, crowLength: 17, stitchPattern: 'ablockCluster', colorShift: 2 })
//buildSwatch(document.querySelector('#angled-block-cluster2'), { colorConfig: colorConfigHeatheredDC, crowLength: 8, stitchPattern: 'ablockCluster' })
buildSwatch(document.querySelector('#angled-block-cluster3'), { colorConfig: colorConfigHeatheredDC, crows: 5, crowLength: 17, stitchPattern: 'ablockCluster', colorShift: 2 })
buildSwatch(document.querySelector('#angled-block-cluster4'), { colorConfig: colorConfigHeatheredDC, crows: 5, crowLength: 17, stitchPattern: 'ablockCluster', colorShift: 10 })
buildSwatch(document.querySelector('#angled-block-cluster5'), { colorConfig: colorConfigHeatheredDC, crows: 5, crowLength: 17, stitchPattern: 'ablockCluster', colorShift: 2 })
buildSwatch(document.querySelector('#angled-block-cluster6'), { colorConfig: colorConfigHeatheredDC, crows: 5, crowLength: 17, stitchPattern: 'ablockCluster', colorShift: 10 })
//buildSwatch(document.querySelector('#angled-block-cluster2'), { colorConfig: colorConfigHeatheredDC, crowLength: 25, stitchPattern: 'ablockCluster' })
