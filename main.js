import './style.scss'
import { paintStitches } from './color.js'

let manyDivs = ""
for (var i = 0; i <= 500; i++) {
      manyDivs += ('<div></div>');
    }
document.querySelector('#app').innerHTML = `
<p>Adjust the variables in the SCSS in order to preview what your planned pooling pattern could look like with different row lengths</p>
<div class="containerA" id="pooler1">
${manyDivs}
</div>
<div class="containerB" id="pooler2">
${manyDivs}
</div>
`

paintStitches(document.querySelector('#pooler1'), [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#F7FFF7", length: 13},
])

paintStitches(document.querySelector('#pooler2'), [
  {color: "#C274B3", length: 2},
  {color: "#4ECDC4", length: 3},
  {color: "#FFE66D", length: 1},
  {color: "#FF6B6B", length: 2},
  {color: "#F7FFF7", length: 13},
])
