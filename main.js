import './style.scss'
import { paintStitches } from './color.js'

const colorConfig = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEEE", length: 13},
]
const stitchesPerCrow = 11;


let manyDivs = ""
for (var i = 0; i < 440; i++) {
  manyDivs += (`<div class="stitch"></div>`);
}

let crowsOfStitches = ""
for (var i = 0; i < 40; i++) {
  crowsOfStitches += ('<div class="crow">');
  for (var j = 0; j < stitchesPerCrow; j++ ) {
    crowsOfStitches += (`<div class="stitch"></div>`);
  }
  crowsOfStitches += ('</div>');
}

document.querySelector('#app').innerHTML = `
<p>Adjust the variables in the SCSS in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div class="swatch flexed v-stitch" id="vstitch-pooler">
${crowsOfStitches}
</div>
<div class="swatch flexed shell" id="shell-pooler">
${crowsOfStitches}
</div>
<div class="swatch grid shell" id="shell-pooler2">
${manyDivs}
</div>
<div class="swatch grid stacked" id="stacked-pooler">
${manyDivs}
</div>
<div class="swatch grid moss" id="moss-pooler">
${manyDivs}
</div>
<div class="swatch grid granny" id="granny-pooler">
${manyDivs}
</div>
<div class="swatch grid shell" id="shell-pooler">
${manyDivs}
</div>
`

paintStitches(document.querySelector('#stacked-pooler'), colorConfig)
paintStitches(document.querySelector('#moss-pooler'), colorConfig)
paintStitches(document.querySelector('#granny-pooler'), colorConfig)
paintStitches(document.querySelector('#vstitch-pooler'), colorConfig)
paintStitches(document.querySelector('#shell-pooler'), colorConfig)
paintStitches(document.querySelector('#shell-pooler2'), colorConfig)
