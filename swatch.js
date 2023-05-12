import { paintStitches } from './color.js'
const clusterMap = { jasmine: 3}
export function buildSwatch(swatch, { colorConfig, crowLength, stitchPattern, crows = 40 }) {
  let cont = ""
  for (var i = 0; i < crows; i++) {
    cont += ('<div class="crow">');
    const cluster = clusterMap[stitchPattern];
    if(cluster) {
      cont += '<div class="cluster"><div class="stitch"></div></div>'; //TODO: this is just for Jasmine
      for (var j = 0; j < crowLength; j++ ) {
        cont += '<div class="cluster">';
        for (var k = 0; k < cluster; k++ ) {
          cont += (`<div class="stitch"></div>`);
        }
        cont += '</div>';
      }
    } else {
      for (var j = 0; j < crowLength; j++ ) {
        cont += (`<div class="stitch"></div>`);
      }
    }
    cont += ('</div>');
  }

  swatch.classList.add('swatch');
  swatch.classList.add(stitchPattern);
  swatch.innerHTML = cont;
  paintStitches(swatch, colorConfig);
}
