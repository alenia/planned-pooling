import './style.scss'
import { paintStitches } from './color.js'

let manyDivs = ""
for (var i = 0; i <= 500; i++) {
      manyDivs += ('<div></div>');
    }
document.querySelector('#app').innerHTML = `
<p>Adjust the variables in the SCSS in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div class="moss" id="pooler1">
${manyDivs}
</div>
<div class="stacked" id="pooler2">
${manyDivs}
</div>
<div class="granny" id="pooler3">
${manyDivs}
</div>
<div class="v-stitch" id="pooler4">
${manyDivs}
</div>
<div class="shell" id="pooler5">
${manyDivs}
</div>
`

const colorConfig = [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#EEEEEE", length: 13},
]

paintStitches(document.querySelector('#pooler1'), colorConfig)
paintStitches(document.querySelector('#pooler2'), colorConfig)
paintStitches(document.querySelector('#pooler3'), colorConfig)
paintStitches(document.querySelector('#pooler4'), colorConfig)
paintStitches(document.querySelector('#pooler5'), colorConfig)
