import { paintStitches } from './color.js'

export function buildSwatch(swatch, { colorConfig, stitchesPerCrow, stitchPattern }) {
  let crowsOfStitches = ""
  for (var i = 0; i < 40; i++) {
    crowsOfStitches += ('<div class="crow">');
    for (var j = 0; j < stitchesPerCrow; j++ ) {
      crowsOfStitches += (`<div class="stitch"></div>`);
    }
    crowsOfStitches += ('</div>');
  }

  swatch.classList.add('swatch');
  swatch.classList.add(stitchPattern);
  swatch.innerHTML = crowsOfStitches;
  paintStitches(swatch, colorConfig);
}
