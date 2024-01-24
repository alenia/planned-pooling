export function nextStitchColorByIndex(i, colorConfig, { colorShift } = { colorShift: 0 } ) {
  let colorSequence = colorConfig.reduce((ary, conf) => ary.concat(new Array(conf.length).fill(conf.color)), []);
  return colorSequence[(i + colorShift) % colorSequence.length];
}
