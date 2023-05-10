export function paintStitches(pooler, colorConfig) {
  let colorSequence = colorConfig.reduce((ary, conf) => ary.concat(new Array(conf.length).fill(conf.color)), []);
  Array.from(pooler.querySelectorAll('.stitch')).forEach((stitch, i) => {
    stitch.style.backgroundColor = colorSequence[i % colorSequence.length];
  })
}
