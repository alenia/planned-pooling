import { paintStitches } from './color.js'
const clusterMap = { jasmine: 3}
export function buildSwatch(swatch, { colorConfig, stitchesPerCrow, stitchPattern, crows = 40 }) {
  let crowsOfStitches = ""
  for (var i = 0; i < crows; i++) {
    crowsOfStitches += ('<div class="crow">');
    const cluster = clusterMap[stitchPattern];
    if(cluster) {
      crowsOfStitches += '<div class="cluster"><div class="stitch"></div></div>'; //TODO: this is just for Jasmine
      for (var j = 0; j < stitchesPerCrow; j++ ) {
        crowsOfStitches += '<div class="cluster">';
        for (var k = 0; k < cluster; k++ ) {
          crowsOfStitches += (`<div class="stitch"></div>`);
        }
        crowsOfStitches += '</div>';
      }
    } else {
      for (var j = 0; j < stitchesPerCrow; j++ ) {
        crowsOfStitches += (`<div class="stitch"></div>`);
      }
    }
    crowsOfStitches += ('</div>');
  }

  swatch.classList.add('swatch');
  swatch.classList.add(stitchPattern);
  swatch.innerHTML = crowsOfStitches;
  paintStitches(swatch, colorConfig);
}
