import './style.scss'
import { paintStitches } from './color.js'

const colorConfig = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEEE", length: 13},
]

//crow means crocheted row
const stitchesPerCrow = 10;


let crowsOfStitches = ""
for (var i = 0; i < 40; i++) {
  crowsOfStitches += ('<div class="crow">');
  for (var j = 0; j < stitchesPerCrow; j++ ) {
    crowsOfStitches += (`<div class="stitch"></div>`);
  }
  crowsOfStitches += ('</div>');
}

document.querySelector('#app').innerHTML = `
<p>Adjust the variables in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div class="swatch v-stitch" id="vstitch-pooler">
${crowsOfStitches}
</div>
<div class="swatch shell" id="shell-pooler">
${crowsOfStitches}
</div>
<div class="swatch stacked" id="stacked-pooler">
${crowsOfStitches}
</div>
<div class="swatch moss" id="moss-pooler">
${crowsOfStitches}
</div>
<div class="swatch granny" id="granny-pooler">
${crowsOfStitches}
</div>
`

paintStitches(document.querySelector('#stacked-pooler'), colorConfig)
paintStitches(document.querySelector('#moss-pooler'), colorConfig)
paintStitches(document.querySelector('#granny-pooler'), colorConfig)
paintStitches(document.querySelector('#vstitch-pooler'), colorConfig)
paintStitches(document.querySelector('#shell-pooler'), colorConfig)
