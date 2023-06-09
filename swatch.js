import { paintStitches } from './color.js'
const clusterMap = { jasmine: 3, ripple: 5, vstitchCluster: 2, ablockCluster: 4}
export function buildSwatch(swatch, { colorConfig, crowLength, stitchPattern, crows = 40, colorShift = 0 }) {
  if(!swatch) {
    console.warn(`no swatch for ${stitchPattern}`);
    return;
  }
  let cont = ""
  const clusterLength = clusterMap[stitchPattern];
  if(clusterLength) {
    for (var i = 0; i < crows; i++) {
      cont += ('<div class="crow">');
      if(stitchPattern === "jasmine" || stitchPattern === "vstitchCluster") { //TODO: move this to config
        cont += '<div class="cluster"><div class="stitch"></div></div>';
      }
      cont += `<div class="cluster">${('<div class="stitch"></div>').repeat(clusterLength)}</div>`.repeat(crowLength);
      if(stitchPattern === "vstitchCluster") { //TODO: move this to config
        cont += '<div class="cluster"><div class="stitch"></div></div>';
      }
      cont += ('</div>');
    }
  }
  else {
    cont = `<div class="crow">${(`<div class="stitch"></div>`).repeat(crowLength)}</div>`.repeat(crows)
  }

  swatch.classList.add('swatch');
  swatch.classList.add(stitchPattern);
  if(clusterLength) {
    swatch.classList.add('clustered');
  }
  swatch.innerHTML = cont;
  paintStitches(swatch, colorConfig, { colorShift } );
}
