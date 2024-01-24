export function paintStitches(pooler, colorConfig, { colorShift } = { colorShift: 0 } ) {
  let colorSequence = colorConfig.reduce((ary, conf) => ary.concat(new Array(conf.length).fill(conf.color)), []);
  Array.from(pooler.querySelectorAll('.stitch')).forEach((stitch, i) => {
    stitch.style.backgroundColor = colorSequence[(i + colorShift) % colorSequence.length];
  })
}

export function nextStitchColorByIndex(i, colorConfig, { colorShift } = { colorShift: 0 } ) {
  let colorSequence = colorConfig.reduce((ary, conf) => ary.concat(new Array(conf.length).fill(conf.color)), []);
  return colorSequence[(i + colorShift) % colorSequence.length];
}
