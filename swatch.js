import { paintStitches } from './color.js'
const clusterMap = { jasmine: 3}
export function buildSwatch(swatch, { colorConfig, crowLength, stitchPattern, crows = 40 }) {
  let cont = ""
  const clusterLength = clusterMap[stitchPattern];
  if(clusterLength) {
    for (var i = 0; i < crows; i++) {
      cont += ('<div class="crow">');
      cont += '<div class="cluster"><div class="stitch"></div></div>'; //TODO: this is just for Jasmine
      cont += `<div class="cluster">${('<div class="stitch"></div>').repeat(clusterLength)}</div>`.repeat(crowLength);
      cont += ('</div>');
    }
  }
  else {
    cont = `<div class="crow">${(`<div class="stitch"></div>`).repeat(crowLength)}</div>`.repeat(crows)
  }

  swatch.classList.add('swatch');
  swatch.classList.add(stitchPattern);
  swatch.innerHTML = cont;
  paintStitches(swatch, colorConfig);
}
